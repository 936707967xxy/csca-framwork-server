<template>
  <div class="resources-box">
    <el-row class="search-box">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form :inline="true" :model="listQuery" class="demo-form-inline">
            <el-form-item label="编号类型" prop="typeval">
              <el-input v-model="listQuery.typeval" placeholder="类型" size="small"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="searchIntention" size="small">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-row class="toolbar">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" size="small" @click="handleCreate">添加</el-button>
          <el-button type="success" size="small" @click="handleUpdate">修改</el-button>
          <el-button type="danger" size="small" @click="removeOne">删除</el-button>
        </div>
      </el-col>
    </el-row>

    <!--数据展示-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="tableData" border style="width: 100%" @selection-change="selchange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="model" label="模板" width="180"></el-table-column>
            <el-table-column prop="code" label="序列号" width="180"></el-table-column>
            <el-table-column prop="createtime" label="生成时间" width="180"></el-table-column>
            <el-table-column prop="codlength" label="序列号长度" width="180"></el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="typeval" label="类型" ></el-table-column>

            <el-table-column label="操作" fixed="right" width="200">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!--分页-->
    <el-row style="margin-top:20px;">
      <el-col :span="12">
        <div class="grid-content bg-purple-dark">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[3, 60, 90, 120]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>

    </el-row>
    <!-- 弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="serialnumberModel" label-position="left" label-width="100px" style='padding:8px 8px;'>

        <el-row :gutter="50">
          <el-col :span="10">
            <!--<el-form-item label="规则模板：">
                <el-input v-model="serialnumberModel.model" readonly="readonly"></el-input>
              </el-form-item>-->

            <el-form-item label="规则模板：">
              <el-select v-model="serialnumberModel.model" placeholder="请选择">
                <el-option label="yyyyMMdd" value="yyyyMMdd"></el-option>
                <el-option label="yyyyMMddHHmmss" value="yyyyMMddHHmmss"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="序列号长度：">
              <el-input v-model="serialnumberModel.codlength"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        

        <el-row :gutter="50">
         <el-col :span="10">
           <el-form-item label="类型：" >
                    <el-select v-model="serialnumberModel.typeval" placeholder="请选择" @change="numChange">
                      <el-option v-for="item in numOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
           </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchData, findById, updateDataJson, removeData, createDataJson, getRequest } from '@/apis/httpapis'

export default {
  data() {
    return {
      tableData: null,
      total: null,
      listQuery: {
        page: 1,
        rows: 3,
        typeval: ''
      },
      serialnumberModel: {
        model: '',
        code: '',
        codlength: '',
        type: '',
        typeval: ''
      },
      dialogStatus: '',
      textMap: {
        update: '修改规则',
        create: '添加新的规则'
      },

      multipleSelection: [],
      dialogFormVisible: false,
       numOptions: [{
          value: 1,
          label: '合同'
        },
        {
          value: 2,
          label: '申请'
        },
        {
          value: 3,
          label: '预约'
        }
      
      ],
    }
  },
  created() {
    this.getPager()
  },
  methods: {
    getPager() {
      fetchData('sys/serialnumber/serialnumberPager.do', this.listQuery).then(response => {
        console.info("^^^^^ :  " + JSON.stringify(response));
        this.tableData = response.data.pageData
        this.total = response.data.recordCount
      })


    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.listQuery.rows = val
      this.getPager();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listQuery.page = val;
      this.getPager();
    },
    searchIntention() {
      console.log('submit!');
      this.getPager();
    },
    selchange(selection) {
      console.log('选择时触发^^^');
      this.multipleSelection = selection;



    },
    findById(id) {
      findById('sys/serialnumber/findbyid.do?id=' + id)
        .then(response => {
          console.log('双向绑定到' + JSON.stringify(response.data));
          this.serialnumberModel = response.data
        })
    },
    handleUpdate() {
      //修改弹框
      var nodes = this.multipleSelection;
      console.log("^^^^^aaa :  " + nodes);
      if (null === nodes || '' === nodes || nodes.length < 1) {
        this.$message({
          message: '警告,请选择要修改的规则编号!',
          type: 'warning'
        });
        return;
      }

      if (nodes.length > 1) {
        this.$message({
          message: '警告,只支持单数据修改!',
          type: 'warning'
        });
        return;
      }
      var id = nodes[0].id;
      console.log('修改的==id:' + id);
      this.findById(id);
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    update() {
      var url = "sys/serialnumber/update.do";
      updateData(url, this.serialnumberModel)
        .then(response => {
          var result = response.data
          if (result.success) {
            this.$message({
              message: result.msg,
              type: 'success'//success/warning/info/error
            });
            this.dialogFormVisible = false
            this.getPager();
          } else {
            this.$message({
              message: result.msg,
              type: 'warning'
            });
          }
        })
    },
    handleCreate() {
      this.serialnumberModel = {
        model: '',
        codlength: '',
        type: '',
        typeval: ''

      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true

    },
    
    create() {//添加
      var url = "sys/serialnumber/create.do";
      createDataJson(url, this.serialnumberModel)
        .then(response => {
          var result = response.data
          if (result.success) {
            this.$message({
              message: result.msg,
              type: 'success'//success/warning/info/error
            });
            this.dialogFormVisible = false
            this.getPager();
          } else {
            this.$message({
              message: result.msg,
              type: 'warning'
            });
          }
        })
    },
    removeOne() {     //批量删除
      var nodes = this.multipleSelection;
      //console.log("^^^^^aaa :  " +nodes);
      if (null === nodes || '' === nodes || nodes.length < 1) {
        this.$message({
          message: '警告,请选择要删除的编号!',
          type: 'warning'
        });
        return;
      }
       var id = nodes[0].id;
      console.log("^^^^^删除的id:  " + id);
      removeData('sys/serialnumber/delete.do?id=' +id)
      //删除多条
      // for (var i = 0; i < nodes.length; i++) {
      //   //判断返回的值是否是字符串   执行删除方法 
      //   console.log("^^^^^删除的ordplyId:  " + nodes[i].ordplyId);
      //   removeData('sys/intention/deleteintention.do?ordplyId=' + nodes[i].ordplyId)
      // }
      this.getPager();//更新页面
    },
    handleDelete(index, row) {//单条删除
      console.log('单条删除执行方法');
      console.log('index:' + index);
      console.log('row:' + row);
      console.log(row.id);
      removeData('sys/serialnumber/delete.do?id=' + row.id)
        .then(response => {
          var result = response.data
          if (result.success) {
            this.$message({
              message: result.msg,
              type: 'success'//success/warning/info/error
            });
            this.dialogFormVisible = false
            this.getPager();
          } else {
            this.$message({
              message: result.msg,
              type: 'warning'
            });
          }
        })
    }, handleEdit(row) {
      console.log("编辑");
      console.log(row);
      var id = row.id;
      this.findById(id);
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },

    //类型选择
    numChange(value) {
      var opt = this.numOptions;
      var lab = null;
      var type=null;
      for (var i = 0; i < opt.length; i++) {
        if (opt[i].value == value) {
          lab = opt[i].label;
          type=opt[i].value;
           
        }
      }
      this.serialnumberModel.type = type;
      this.serialnumberModel.typeval = lab;
      
    },



  }


}
</script>

 
 
<style scoped>
.search-box,
	.toolbar {
		margin: 10px 5px 10px 30px;
	}

.el-input__inner {
  width: 250px;
}
.el-pagination span:not([class*=suffix]) {
  min-width: 200px;
}
label.el-radio{
  margin-left: 8px;
}
</style>
<style>
  .resources-box .el-form-item__label{
  text-align:right !important;
  }
</style>
