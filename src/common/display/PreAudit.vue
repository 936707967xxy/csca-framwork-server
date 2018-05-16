<template>
<div class="preAudit-box">
  <el-row class="search-box">
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
          <el-form-item label="申请编号">
            <el-input v-model="listQuery.loanId" placeholder="申请编号" size="small"></el-input>
          </el-form-item>

          <el-form-item label="客户姓名">
            <el-input v-model="listQuery.custName" placeholder="客户姓名" size="small"></el-input>
          </el-form-item>

          <el-form-item label="证件号">
            <el-input v-model="listQuery.idNumber" placeholder="证件号" size="small"></el-input>
          </el-form-item>

          <el-form-item label="审核状态">
            <el-select v-model="listQuery.nodeStatus" placeholder="请选择" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>

  <el-row class="toolbar">
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <el-button type="primary" size="small" @click="claimTask" v-if="checkPermiss('role_create')">签收</el-button>
        <el-button type="success" size="small" @click="completeTask" v-if="checkPermiss('role_update')">审核</el-button>
        <el-button type="warning" size="small" @click="transferTask" v-if="checkPermiss('role_grant')">转办</el-button>
        <el-button type="danger" size="small" @click="withdrawTask" v-if="checkPermiss('role_remove')">撤回</el-button>
      </div>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <el-table ref="tableData" :data="tableData" border style="width: 100%" cell-class-name="cell-class" @current-change="handleCurrentRow" highlight-current-row>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="loanId" label="申请编号" width="240"></el-table-column>
          <el-table-column prop="custName" label="客户姓名" width="80"></el-table-column>
          <el-table-column prop="custMobile" label="联系电话" width="120"></el-table-column>
          <el-table-column prop="idNumber" label="证件号" width="180"></el-table-column>
          <el-table-column prop="productName" label="申请产品" width="120"></el-table-column>
          <el-table-column prop="applyAmount" label="申请金额" width="100"></el-table-column>
          <el-table-column prop="precessStatusVal" label="状态" width="100"></el-table-column>
          <el-table-column prop="sources" label="来源" width="100" :formatter="sourceFormatter"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
                    <el-button @click="claimTask(scope.row)" size="mini" v-if="checkPermiss('role_update')">签收</el-button>
                    <el-button @click="completeTask(scope.row)" size="mini" type="danger" v-if="checkPermiss('role_remove')">审核</el-button>
                    <el-button @click="transferTask(scope.row)" size="mini" type="warning" v-if="checkPermiss('role_grant')">转办</el-button>
                    <el-button @click="withdrawTask(scope.row)" size="mini" type="danger" v-if="checkPermiss('role_grant')">撤回</el-button>
                  </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>

  <el-row style="margin-top:20px;">
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[30, 60, 90, 120]" :page-size="30" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-col>
  </el-row>

  <el-dialog title="提示"   :visible.sync="dialogVisible"   width="30%">
    <el-form :model="empModel" size="mini" :rules="rules" ref="empModel">
      <el-form-item label="办理人：" prop="userId">
          <el-select v-model="empModel.userId">
             <el-option  v-for="item in groups" :key="item.userId"  :label="item.userName" :value="item.userId">
             </el-option>
         </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="submitTransfer" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import {
  fetchData,
  findById,
  updateData,
  removeData,
  createDataJson,
  createData
} from '@/apis/httpapis'
//import { fetchData, fetchPv } from '@/apis/httpapis'
export default {
  name: 'Role',
  data() {
    return {
      options: [{
        value: '-1',
        label: '全部'
      }, {
        value: '0',
        label: '待审核'
      }, {
        value: '1',
        label: '已审核'
      }],
      grantTitle: "角色授权",
      tableData: null,
      total: null,
      listQuery: {
        page: 1,
        rows: 30,
        custName: '',
        loanId: '',
        nodeStatus: '-1',
        idNumber: ''
      },
      currentRow: null,
      dialogVisible:false,
      groups: [],
      empModel:{
        userId:null
      },
      rules:{
        userId: [
              { required: true, message: '请选择办理人', trigger: 'change' }
        ]
      }
    }

  },
  created() {
    this.getPager()
  },
  methods: {
    sourceFormatter(row, column,cellValue){
      if(cellValue == 1){
        return "APP";
      }else if (cellValue == 2) {
          return "门店";
      }else if (cellValue == 3) {
          return "主动拜访";
      }else if (cellValue == 4) {
          return "客户推荐";
      }else if (cellValue == 5) {
          return "派单";
      }else if (cellValue == 6) {
          return "推广活动";
      }else if (cellValue == 7) {
          return "其他";
      }else{
          return "未知";
      }
    },
    setCurrent(row) {
        this.$refs.tableData.setCurrentRow(row);
    },
    handleCurrentRow(val) {
      this.$refs.tableData.clearSelection();
      this.$refs.tableData.toggleRowSelection(val);
      this.currentRow = val;
    },
    getPager() {
      fetchData('/sys/preaudit/pager.do', this.listQuery).then(response => {
        this.tableData = response.data.pageData
        this.total = response.data.recordCount
      })
    },
    handleSizeChange(val) { //每页N条
      this.listQuery.rows = val
      this.getPager();
    },
    handleCurrentChange(val) { //当前页
      this.listQuery.page = val;
      this.getPager();
    },
    search() {
      this.getPager();
    },
    selchage(selection) {
      this.multipleSelection = selection;
    },
    claimTask(row){//签收
      let applyId = row.applyId;
      if(null === applyId || applyId === "" || applyId === undefined){
        if(null === this.currentRow || this.currentRow === "" || this.currentRow === undefined){
          this.$message({
            message: '警告，请选择审核数据!',
            type: 'warning'
          });
          return;
        }else{
          applyId = this.currentRow.applyId;
        }
      }

      findById('/sys/preaudit/claim.do?applyId='+applyId)
      .then(res => {
        const result = res.data;
        if(result.success){
          this.$message({
            message: '签收成功!',
            type: 'success'
          });
        }else{
          this.$message({
            message: '签收失败!',
            type: 'warning'
          });
        }
      }).catch(error => {
        this.$message({
          message: '签收异常!',
          type: 'error'
        });
      })
    },
    completeTask(row){//审核
      let applyId = row.applyId;
      if(null === applyId || applyId === "" || applyId === undefined){
        if(null === this.currentRow || this.currentRow === "" || this.currentRow === undefined){
          this.$message({
            message: '警告，请选择审核数据!',
            type: 'warning'
          });
          return;
        }else{
          applyId = this.currentRow.applyId;
        }
      }

      //验证签收
      let url ="/sys/preaudit/checkclaim.do?applyId="+applyId;
      findById(url)
      .then(res => {
        const result = res.data;
        if(result.success){
          this.$router.push({path: '/audit/'+applyId});
        }else{
          this.$message({
            message: result.msg,
            type: 'warning'
          });
        }
      }).catch(error => {
        this.$message({
          message: result.msg,
          type: 'error'
        });
      })
    },
    transferTask(row){//转办
      let applyId = row.applyId;
      if(null === applyId || applyId === "" || applyId === undefined){
        if(null === this.currentRow || this.currentRow === "" || this.currentRow === undefined){
          this.$message({
            message: '警告，请选择审核数据!',
            type: 'warning'
          });
          return;
        }else{
          applyId = this.currentRow.applyId;
        }
      }

      this.empModel.userId='';
      const url = "/sys/emp/oa/deptemp.do";
      createDataJson(url).then(response => {
        this.groups = response.data;
        this.dialogVisible = true;
      }).catch(error => {
        this.$message({
          message: '数据获取异常!',
          type: 'warning'
        });
      })
    },
    withdrawTask(row){//撤回
      this.currentRow = row;
      if(null === this.currentRow || this.currentRow === "" || this.currentRow === undefined){
        this.$message({
          message: '警告，请选择要撤回的数据!',
          type: 'warning'
        });
        return;
      }

      const applyId = this.currentRow.applyId;
      findById('/sys/preaudit/claim.do?applyId='+applyId)
      .then(res => {
        const result = res.data;
        if(result.success){
          this.$message({
            message: '撤回成功!',
            type: 'success'
          });
        }else{
          this.$message({
            message: '撤回失败!',
            type: 'warning'
          });
        }
      }).catch(error => {
        this.$message({
          message: '撤回异常!',
          type: 'error'
        });
      })
    },
    submitTransfer(){
      this.$refs['empModel'].validate((valid) => {
        if (!valid) {
          this.$message({
            message: '请选择办理人!',
            type: 'error'
          });
          return false;
        }
      });

        const applyId = this.currentRow.applyId;
        var url = "/sys/preaudit/complaint.do";
        createData(url,{applyId:applyId,userId:this.empModel.userId})
          .then(response => {
            var result = response.data
            if(result.success) {
              this.$message({
                message: result.msg,
                type: 'success' //success/warning/info/error
              });
              this.dialogVisible = false;
            } else {
              this.$message({
                message: result.msg,
                type: 'warning'
              });
            }
          })

    },
    checkPermiss(cpt) {
      return this.checkAction(cpt);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-table td,
.el-table th {
  padding: 6px 0px;
}

.search-box {
  padding: 20px 30px 20px 30px;
}

.toolbar {
  padding: 0px 20px 30px 20px;
}

.cell-class {
  height: 20px;
  padding: 6px 0px;
}

.splitter-paneR {
  overflow: auto;
}
</style>
