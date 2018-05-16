<!--
	Created by yangfei on 2018/3/29.
    客户结清
-->
<template>
  <div id="normal-type-box" class="wrap-box money-daihou-style">
		<div class="crumbs hander-class">
			<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
				<el-breadcrumb-item>客户结清列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box hander-class">
			<el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQuery" label-width="100px">
				<el-form-item label="进件编号:" prop="loanId" >
					<el-input v-model="listQuery.loanId"  placeholder="进件编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="合同编号:" prop="conNo" >
					<el-input v-model="listQuery.conNo"  placeholder="合同编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="客户姓名:" prop="castName" >
					<el-input v-model="listQuery.castName" placeholder="客户姓名" size="small"></el-input>
				</el-form-item>
				<el-form-item label="身份证号码:" prop="cardNo" >
					<el-input v-model="listQuery.cardNo" placeholder="身份证号" size="small"></el-input>
				</el-form-item>
				<el-form-item label="手机号码:" prop="tel" >
					<el-input v-model="listQuery.tel" placeholder="手机号码" size="small"></el-input>
				</el-form-item>

        <el-form-item class="form-r-btn">
          <el-button type="primary" @click="searchProductType" size="small">查询</el-button>
          <el-button type="primary" @click="resetSearch('listQuery')" size="small">重置 </el-button>
        </el-form-item>
        <div>
          <el-form-item class="form-r-btn">
            <el-button type="primary" @click="monthDeduct('0')" size="small">客户还款记录</el-button>
            <el-button type="primary" @click="downloadExcel" size="small">导出</el-button>
          </el-form-item>
        </div>
			</el-form>
		</div>
    <!-- 列表 -->
    <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
              :stripe="true" border style="width:100%" cell-class-name="cell-class" @selection-change="selchage" height="570" size="medium">
				<el-table-column type="selection" width="46" align="center"></el-table-column>
				<el-table-column prop="loanId" label="进件编号" min-width="180" align="center" fixed></el-table-column>
				<el-table-column prop="conNo" label="合同编号" min-width="200" align="center" fixed></el-table-column>
				<el-table-column prop="castName" label="客户姓名" min-width="100" align="center" fixed></el-table-column>
				<el-table-column prop="castId" label="客户ID" min-width="220" align="center"></el-table-column>
				<el-table-column prop="cardNo" label="身份证号" min-width="140" align="center" :formatter="idCardFor"></el-table-column>
				<el-table-column prop="tel" label="手机号码" min-width="120" align="center" :formatter="phoneFor" ></el-table-column>
				<el-table-column prop="currentPeriod" label="当前期次" min-width="80" align="center"></el-table-column>
				<el-table-column prop="repayDate" label="应还日期" min-width="170" align="center"></el-table-column>
				<el-table-column prop="loanPeriod" label="贷款期次" min-width="80" align="center"></el-table-column>
				<el-table-column prop="loanMoney" label="放款金额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="loanDate" label="放款日期" min-width="170" align="center"></el-table-column>
				<el-table-column prop="conMoney" label="合同金额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="bank" label="银行名称" min-width="170" align="center"></el-table-column>
				<el-table-column prop="bankAccount" label="银行账户" min-width="180" align="center"></el-table-column>
				<el-table-column prop="bal" label="账户余额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="shouldTerm" label="应还期次" min-width="80" align="center"></el-table-column>
				<el-table-column prop="shouldAmt" label="应还金额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="shouldCapi" label="应还本金" min-width="120" align="center"></el-table-column>
				<el-table-column prop="shouldInte" label="应还利息" min-width="120" align="center"></el-table-column>
				<el-table-column prop="billsDate" label="账单日" min-width="170" align="center"></el-table-column>
				<el-table-column prop="repayStatus" label="还款状态" min-width="100" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.repayStatus=='0'">未结清</span>
              <span v-show="props.row.repayStatus=='1'">已结清</span>
          </template>
        </el-table-column>
				<el-table-column prop="advanceShould" label="提前还款应还" min-width="150" align="center"></el-table-column>
				<el-table-column prop="advanceMoney" label="实际提前还款" min-width="150" align="center"></el-table-column>
				<el-table-column prop="advanceReduce" label="提前还款减免" min-width="150" align="center"></el-table-column>
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

    <settle-record ref="settleRecordDialog" @init="getPager" :settleRecord="settleRecord"></settle-record>
  </div>
</template>

<script>
import { fetchData } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";
import { formatIdCard, formatPhone } from "@/utils/InfoFormat.js";
import settleRecord from "./settleRecordList.vue";

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
      },
      selectList:[],//列表选择
      settleRecord:{//客户还款记录
        loanId:''
      }
    };
  },
  components: {
    'settle-record':settleRecord
  },
  created() {
    this.getPager();
  },
  methods: {
    getPager() {
      fetchData( "/after/settle/settleCustomerService.do",this.listQuery).then(response => {
        this.tableData = response.data.pageData;
        this.total = response.data.recordCount;
        this.loading = false;
      });
    },
    //导出
    downloadExcel() {
      axios.post("/after/settle/downloadSettleCustomerService.do", this.listQuery, {responseType: "arraybuffer"})
        .then(res => {
          var fileDownload = require("js-file-download");
          fileDownload(
            res.data,
            "结清客户列表" + formatDate(new Date(), "yyyyMMddhhmmss") + ".xlsx"
          );
        });
    },
    // 列表选择
    selchage(selection) {
      if (selection.length > 0) {
        this.selectList = selection;
      }
    },
    monthDeduct(state) {
      //必须选择数据
      if (this.selectList.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning",
          duration:5000
        });
        this.dialogDetailTable = false;
        return;
      } else if (this.selectList.length > 1) {
        this.dialogDetailTable = false;
        this.$message({
          message: "警告,只允许单笔划扣!",
          type: "warning",
          duration:5000
        });
        return;
      } else {
        //显示客户信息
        this.dialogDetailTable = true;
        this.repayRecords(state);
      }
    },
    // 客户还款记录 请求
    repayRecords(state) {
      this.settleRecord.loanId = this.selectList[0].loanId;
      this.$refs.settleRecordDialog.show();
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
