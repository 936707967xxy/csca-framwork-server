<!--
	Created by yangfei on 2018/04/09.
    客户任务分配
-->
<template>
  <div id="normal-type-box" class="wrap-box money-daihou-style">
		<div class="crumbs hander-class">
			<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
				<el-breadcrumb-item>客户任务分配</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box hander-class">
			<el-form :inline="true" :model="listQuery" ref="listQuery" label-width="100px">
				<el-form-item label="进件编号:" prop="loanId">
					<el-input v-model="listQuery.loanId"  placeholder="进件编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="合同编号:" prop="conNo">
					<el-input v-model="listQuery.conNo"  placeholder="合同编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="客户姓名:" prop="castName">
					<el-input v-model="listQuery.castName" placeholder="客户姓名" size="small"></el-input>
				</el-form-item>
				<el-form-item label="身份证号码:" prop="cardNo">
					<el-input v-model="listQuery.cardNo" placeholder="身份证号" size="small"></el-input>
				</el-form-item>
				<el-form-item label="手机号码:" prop="tel">
					<el-input v-model="listQuery.tel" placeholder="手机号码" size="small"></el-input>
				</el-form-item>
				<el-form-item label="管理客服工号:" prop="managerCastId">
					<el-input v-model="listQuery.managerCastId" placeholder="管理客服工号" size="small"></el-input>
				</el-form-item>
        <el-form-item label="是否分配:" prop="istask">
          <el-select v-model="listQuery.istask" placeholder="请选择" size="small">
            <el-option label="已分配" value="0"></el-option>
            <el-option label="未分配" value="1"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item class="form-r-btn">
          <el-button type="primary" @click="searchProductType" size="small">查询</el-button>
          <el-button type="primary" @click="resetSearch('listQuery')" size="small">重置 </el-button>
        </el-form-item>
        <div>
          <el-form-item class="form-r-btn">
            <el-button type="primary" @click="monthDeduct('0')" size="small">任务分配</el-button>
            <el-button type="primary" @click="downloadExcel" size="small">导出</el-button>
          </el-form-item>
        </div>
			</el-form>
		</div>
    <!-- 列表 -->
    <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
              :stripe="true" border style="width:100%" cell-class-name="cell-class" @select="selchage" height="570" size="medium">
				<el-table-column type="selection" width="46" align="center"></el-table-column>
				<el-table-column prop="loanId" label="进件编号" min-width="200" align="center" fixed></el-table-column>
				<el-table-column prop="conNo" label="合同编号" min-width="230" align="center" fixed></el-table-column>
				<el-table-column prop="castName" label="客户姓名" min-width="120" align="center" fixed></el-table-column>
				<el-table-column prop="mSection" label="M段" min-width="100" align="center"></el-table-column>
				<el-table-column prop="cardNo" label="身份证号" min-width="170" align="center" :formatter="idCardFor"></el-table-column>
				<el-table-column prop="tel" label="手机号码" min-width="170" align="center" :formatter="phoneFor" ></el-table-column>
				<el-table-column prop="castId" label="客户号" min-width="120" align="center"></el-table-column>
				<el-table-column prop="castSource" label="客户来源" min-width="100" align="center"></el-table-column>
				<el-table-column prop="productName" label="产品名称" min-width="100" align="center"></el-table-column>
				<el-table-column prop="conMoney" label="合同金额" min-width="170" align="center"></el-table-column>
				<el-table-column prop="loanMoney" label="放款金额" min-width="170" align="center"></el-table-column>
				<el-table-column prop="loanDate" label="放款日期" min-width="170" align="center"></el-table-column>
				<el-table-column prop="loanPeriod" label="贷款期数" min-width="170" align="center"></el-table-column>
				<el-table-column prop="currentPeriod" label="当前期数" min-width="170" align="center"></el-table-column>
				<el-table-column prop="surplusPeriod" label="剩余期数" min-width="170" align="center"></el-table-column>
				<el-table-column prop="loanManagerCastName" label="贷后客服" min-width="170" align="center"></el-table-column>
				<el-table-column prop="billDays" label="账单日" min-width="170" align="center"></el-table-column>
				<el-table-column prop="settleFlag" label="是否结清" min-width="100" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.settleFlag=='0'">结清</span>
              <span v-show="props.row.settleFlag=='1'">未结清</span>
          </template>
        </el-table-column>
        <el-table-column prop="hangUp" label="是否挂起" min-width="100" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.hangUp=='0'">否</span>
              <span v-show="props.row.hangUp=='1'">是</span>
          </template>
        </el-table-column>
        <el-table-column prop="dalayFlag" label="是否逾期" min-width="100" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.dalayFlag=='0'">逾期</span>
              <span v-show="props.row.dalayFlag=='1'">未逾期</span>
          </template>
        </el-table-column>
		</el-table>
    <!-- 分页 -->
    <el-row style="margin-top:20px;">
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="1"
					:page-sizes="[30, 60, 90]"
					:page-size="2" layout="total, sizes, prev,pager, next, jumper"
					:total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
    <!-- 任务分配列表 -->
    <el-dialog title="职员信息列表" :visible.sync="dialogDetailTable" width="60%" center :close-on-click-modal='false'>
      <el-table :data="empList" :stripe="true" border style="width:100%" cell-class-name="cell-class" @selection-change="selchage1" height="450" >
        <el-table-column type="selection" width="46" center></el-table-column>
				<el-table-column prop="empId" label="部门编号" min-width="230" align="center" fixed></el-table-column>
				<el-table-column prop="empWorkNum" label="工号" min-width="120" align="center" fixed></el-table-column>
				<el-table-column prop="empName" label="姓名" min-width="100" align="center"></el-table-column>
				<el-table-column prop="loanBalNum" label="总件数" min-width="80" align="center"></el-table-column>
		  </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelFun">取消分派</el-button>
        <el-button type="primary" @click="empTaskFun">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData,createDataJson } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";
import { formatIdCard, formatPhone } from "@/utils/InfoFormat.js";

export default {
  data() {
    return {
      loading:true,
      dialogDetailTable:false,
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 30,
        loanId: "",
        conNo: "",
        castName: "",
        cardNo: "",
        tel: "",
        repayStatus:"",//结清状态
        managerCastId:"",//管理客服工号
        istask:"",//是否分配
      },
      selectList:[],//列表选择
      selectList1:[],//职员列表选择
      empList:[],//客户还款记录
      loanIdList:[],
      appointPeopleId:[],
    };
  },
  created() {
    this.getPager();
  },
  methods: {
    getPager() {
      fetchData( "/after/task/customerTaskAllService.do",this.listQuery).then(response => {
        this.tableData = response.data.pageData;
        this.total = response.data.recordCount;
        this.loading = false;
      });
    },
    //导出
    downloadExcel() {
      axios.post("/after/task/downloadCustomerTaskAllService.do", this.listQuery, {responseType: "arraybuffer"})
        .then(res => {
          var fileDownload = require("js-file-download");
          fileDownload(
            res.data,
            "任务分配列表" + formatDate(new Date(), "yyyyMMddhhmmss") + ".xlsx"
          );
        });
    },
    // 列表选择
    selchage(selection) {

      if (selection.length > 0) {
        this.selectList = selection;
        let len = this.selectList.length;
        let loanId = "";
        let currentPeriod = "";
        let list = {};
        for(let i=0;i<len;i++) {
          loanId = this.selectList[i].loanId;
          currentPeriod = this.selectList[i].currentPeriod
        }
        list = {
          loanId:loanId,
          currentPeriod:currentPeriod
        }
        this.loanIdList.push(list);
      }
    },
    monthDeduct (state) {
      //必须选择数据
      if (this.selectList.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning",
          duration:5000
        });
        return;
      }else{
        this.dialogDetailTable = true;
        this.empListFun(state);
      }
    },
    // 职员信息列表 请求
    empListFun(state) {
      let data = {
        loanIdList:this.loanIdList
      };
      createDataJson( "/after/task/customerTaskDetailsService.do",data).then(response => {
        this.empList = response.data.pageData;
      });
    },
    // 职员列表选择
    selchage1(selection) {
      if (selection.length > 0) {
        this.selectList1 = selection;
      }
    },
    newArr() {
      let len = this.selectList1.length;
      let list = {};
      let empWorkNum = "";
      let empName = "";
      for(let i=0;i<len;i++) {
        empWorkNum = this.selectList1[i].empWorkNum;
        empName = this.selectList1[i].empName;
        list = {
          empWorkNum:empWorkNum,
          empName:empName
        }
        this.appointPeopleId.push(list);
      }
    },
    // 任务分派 确定
    empTaskFun() {
      this.newArr();
      let data = {
        loanIdList:this.loanIdList,
        appointPeopleId:this.appointPeopleId
      };
      // console.log(data);
      // console.log(this.selectList1);
      //必须选择数据
      if (this.selectList1.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning",
          duration:5000
        });
        return;
      }
      createDataJson( "/after/task/customerTaskOprationService.do",data).then(response => {
        if(response.data.success) {
          this.$message({
            message: response.data.msg ,
            type: "success",
            duration:5000
          });
          this.dialogDetailTable = false;
          this.selectList = [];
          this.selectList1 = [];
          this.empList = [];
          this.loanIdList = [];
          this.appointPeopleId = [];
          this.getPager();
        }else if(!response.data.success){
          this.$message({
            message: response.data.msg ,
            type: "warning",
            duration:5000
          });
          this.selectList1 = [];
          this.appointPeopleId = [];
          return;
        }
      });
    },
    //取消分派
    cancelFun() {
      this.dialogDetailTable = false;
      this.selectList = [];
      this.selectList1 = [];
      this.empList = [];
      this.loanIdList = [];
      this.appointPeopleId = [];
      this.getPager();
    },

    /**************** 分页 **********************/
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getPager();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getPager();
    },
    searchProductType() {
      this.getPager();
    },
    /**************** 工具栏调用 **********************/
    resetSearch(formName) {
      this.$refs[formName].resetFields();
    },

    phoneFor(row, column, cellValue) {//手机号中间*
      if (typeof cellValue != "undefined") {
        return formatPhone(cellValue);
      }
    },
    idCardFor(row, column, cellValue) {//身份证中间*
      if (typeof cellValue != "undefined") {
        return formatIdCard(cellValue);
      }
    }
  }
};
</script>

<style scoped>
.el-input--suffix .el-input__inner {
  padding-right: 18px;
}
.el-table td,
.el-table th {
  padding: 6px 0px;
  text-align: center;
}

.cell-class {
  height: 20px;
  padding: 6px 0px;
}

.hander-class {
  margin: 15px 0px 15px 10px;
}
.money-daihou-style .el-table th {
  background-color: #409eff;
  color: #ffffff;
}
.money-daihou-style .el-table--border th {
  border-right: 1px solid #c0c4cc;
}
.money-daihou-style .el-input__inner {
  border: 1px solid #409eff;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.form-r-btn {
  margin-left: 30px;
}
</style>
