<!--
	Created by yangfei on 2018/3/22.
    正常客户列表
-->
<template>
  <div id="normal-type-box" class="wrap-box money-daihou-style">
		<div class="crumbs hander-class">
			<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
				<el-breadcrumb-item>正常客户列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box hander-class">
			<el-form :inline="true" :model="listQuery" ref="listQuery" label-width="100px">
				<el-form-item label="进件编号:" prop="loanId" >
					<el-input v-model="listQuery.loanId"  placeholder="进件编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="合同编号:" prop="conNo" >
					<el-input v-model="listQuery.conNo"  placeholder="合同编号" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="客户姓名:" prop="castName" >
					<el-input v-model="listQuery.castName" placeholder="客户姓名" size="small"></el-input>
				</el-form-item>
				<el-form-item label="身份证号码:" prop="cardNo">
					<el-input v-model="listQuery.cardNo" placeholder="身份证号" size="small"></el-input>
				</el-form-item>
				<el-form-item label="手机号码:" prop="tel" >
					<el-input v-model="listQuery.tel" placeholder="手机号码" size="small"></el-input>
				</el-form-item>
        <el-form-item label="POS类型:" prop="posType" >
          <el-select v-model="listQuery.posType" placeholder="请选择" size="small">
            <el-option label="旧POS转新POS模式" value="0"></el-option>
            <el-option label="旧POS划扣模式" value="1" ></el-option>
            <el-option label="线上POS模式" value="2" ></el-option>
            <el-option label="新放款客户" value="3" ></el-option>
            <el-option label="新POS模式" value="4" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-r-btn">
          <el-button type="primary" @click="searchProductType" size="small">查询</el-button>
          <el-button type="primary" @click="resetSearch('listQuery')" size="small">重置 </el-button>
        </el-form-item>

			</el-form>
      <el-row>
        <el-col class="form-r-btn">
          <el-dropdown @command="opHandle" trigger="click">
            <el-button type="primary" size="small">
              还款详情<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="0">正常月还</el-dropdown-item>
              <el-dropdown-item :command="2">提前还款</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" @click="monthDeduct('0')" size="small">信息变更申请</el-button>
          <el-button type="primary" @click="monthDeduct('1')" size="small">客户还款记录</el-button>
          <el-button type="primary" @click="downloadExcel" size="small">导出</el-button>
        </el-col>
      </el-row>
		</div>
    <div>

    </div>
    <!-- 列表 -->
    <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
              :stripe="true" border style="width:100%" cell-class-name="cell-class" @select="selchage" height="570">
				<el-table-column type="selection" width="46" align="center"></el-table-column>
				<el-table-column prop="loanId" label="进件编号" min-width="180" align="center" fixed></el-table-column>
				<el-table-column prop="conNo" label="合同编号" min-width="200" align="center" fixed></el-table-column>
				<el-table-column prop="castName" label="客户姓名" min-width="120" align="center" fixed></el-table-column>
				<el-table-column prop="cardNo" label="身份证号" min-width="140" align="center" :formatter="idCardFor"></el-table-column>
				<el-table-column prop="tel" label="联系电话" min-width="120" align="center" :formatter="phoneFor" ></el-table-column>
				<el-table-column prop="posType" label="客户类型" min-width="170" align="center"></el-table-column>
				<el-table-column prop="bankAcount" label="银行卡号" min-width="170" align="center"></el-table-column>
				<el-table-column prop="bankName" label="银行名称" min-width="180" align="center"></el-table-column>
				<el-table-column prop="productName" label="产品名称" min-width="170" align="center"></el-table-column>
				<el-table-column prop="loanPeriod" label="贷款期数" min-width="80" align="center"></el-table-column>
				<el-table-column prop="currentPeriod" label="当前期数" min-width="80" align="center"></el-table-column>
				<el-table-column prop="loanMoney" label="放款金额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="loanDate" label="放款日期" min-width="170" align="center"></el-table-column>
				<el-table-column prop="dalayFlag" label="是否逾期" min-width="100" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.dalayFlag=='0'">逾期</span>
              <span v-show="props.row.dalayFlag=='1'">未逾期</span>
          </template>
        </el-table-column>
				<el-table-column prop="settleFlag" label="是否结清" min-width="100" align="center">
          <template  slot-scope="props">
              <span v-show="props.row.settleFlag=='0'">已结清</span>
              <span v-show="props.row.settleFlag=='2'">未结清</span>
          </template>
        </el-table-column>
				<el-table-column prop="statementDate" label="账单日" min-width="170" align="center"></el-table-column>
				<el-table-column prop="conMoney" label="合同金额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="balAmt" label="账户余额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="repayDate" label="应还日期" min-width="170" align="center"></el-table-column>
				<el-table-column prop="shouldInte" label="应还利息" min-width="120" align="center"></el-table-column>
				<el-table-column prop="shouldCapi" label="应还本金" min-width="120" align="center"></el-table-column>
				<el-table-column prop="shouldAmt" label="月还款额" min-width="120" align="center"></el-table-column>
				<el-table-column prop="advanceMoney" label="实际提前还款" min-width="120" align="center"></el-table-column>
				<el-table-column v-if="frontOrbackup=='0'" prop="managerCast" label="前线客服" min-width="100" align="center"></el-table-column>
        <el-table-column v-if="frontOrbackup=='1'" prop="loanManagerCastName" label="贷后客服" min-width="100" align="center"></el-table-column>
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

    <repay-details ref="repayDetailsDialog" @init="getPager" :detailForm="detailForm"></repay-details>
    <message-update ref="messageUpdateDialog" @init="getPager" :messageUpdateForm="messageUpdateForm"></message-update>
    <paymen-record ref="paymentRecordDialog" @init="getPager" :paymentRecordList="paymentRecordList"></paymen-record>
  </div>
</template>

<script>
import { fetchData } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";
import { formatIdCard, formatPhone } from "@/utils/InfoFormat.js";
import repayDetails from  "./repaymentDetails.vue";
import messageUpdate from  "./messageUpdate.vue";
import paymentRecord from "./customerPaymentRecordList.vue";//客户还款记录

export default {
  data() {
    return {
      changeFlag:false,
      show:false,
      loading:true,
      tableData: [],//列表数据
      frontOrbackup:"",
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 30,
        loanId: "",
        conNo: "",
        castName: "",
        cardNo: "",
        tel: "",
        posType: "",
      },
      detailForm: {
        castName: "", //客户姓名
        loanId: "", //进件编号
        cardNo: "", //身份证号
        tel: "", //手机号码
        bankAcount: "", //银行卡号
        bankName: "", //银行名称
        loanPeriod: "", //贷款期数
        currentPeriod: "", //当前期数
        loanMoney: "", //放款金额
        conMoney: "", //合同金额
        balAmt: "", //账户余额
        repayDate: "", //应还日期
        shouldInte: "", //应还利息
        shouldCapi: "", //应还本金
        shouldAmt: "", //月还款额
        shouldTerm:"",//应还期数
        normalSubMoney:"",//正常月还减免金额
        normalSubDate:"",//正常月还减免失效日期
        normalSubStream:"",//正常月还减免期次
        advancedSubMoney:"",//提前还款减免金额
        advancedSubDate:"",//提前还款减免失效日期
        advancedSubStream:"",//提前还款减免期次
        advanceMoney: "", //实际提前还款
        deductMoney: "", //减免金额
      },
      formLabelWidth: "150px",
      selectList:[],
      queryType:"",
      messageUpdateForm:{
        loanId:"",//进件编号
        castName: "", //客户姓名
        castId:"",//客户id
      },
      paymentRecordList:{//客户还款记录
        loanId:''
      }
    };
  },

  components: {
      'repay-details': repayDetails,
      'message-update': messageUpdate,
      'paymen-record':paymentRecord
  },
  created() {
    this.getPager();
  },
  methods: {
    getPager() {
      this.selectList = [];
      fetchData("/after/customer/nomalCustomerService.do", this.listQuery).then(
        response => {
          this.frontOrbackup = response.data.pageData[0].frontOrbackup;
          this.tableData = response.data.pageData;
          this.total = response.data.recordCount;
          this.loading = false;
        }
      );
    },
    //导出
    downloadExcel() {
      axios.post("/after/customer/downloadNomalCustomerService.do", this.listQuery, {
          responseType: "arraybuffer"
        })
        .then(res => {
          var fileDownload = require("js-file-download");
          fileDownload(
            res.data,
            "正常客户列表" + formatDate(new Date(), "yyyyMMddhhmmss") + ".xlsx"
          );
        });
    },
    //列表选择变化
    selchage(selection) {
      if (selection.length > 0) {
        this.selectList = selection;
      }
    },

    opHandle (state) {
      //必须选择数据
      if (this.selectList.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning",
          duration:3000
        });
        return;
      } else if (this.selectList.length > 1) {
        this.$message({
          message: "警告,只允许单笔划扣!",
          type: "warning",
          duration:3000
        });
        return;
      } else {
        this.recordDetail(state);
      }
    },
    //还款详情
    recordDetail(queryType) {
      let opData = {
        loanId: this.selectList[0].loanId||"",
        currentPeriod: this.selectList[0].currentPeriod||"",
        queryType: queryType
      };
      fetchData("/after/deduct/ovedueAdvNomalDetail.do", opData).then(
        response => {
          if(response.data.success) {
            this.detailForm = response.data.data;
            this.$refs.repayDetailsDialog.show(queryType);
          }
      });
    },
    monthDeduct(state) {
      //必须选择数据
      if (this.selectList.length < 1) {
        this.$message({
          message: "警告,请选择数据!",
          type: "warning",
          duration:5000
        });
        return;
      } else if (this.selectList.length > 1) {
        this.$message({
          message: "警告,只允许单笔划扣!",
          type: "warning",
          duration:5000
        });
        return;
      }else {
        if(state == '0') {
          this.messageUpdateForm.loanId = this.selectList[0].loanId;
          this.messageUpdateForm.castName = this.selectList[0].castName;
          this.messageUpdateForm.castId = this.selectList[0].castId;
          this.$refs.messageUpdateDialog.show();
        }else if(state == '1') {
          this.paymentRecordList.loanId = this.selectList[0].loanId;
          this.$refs.paymentRecordDialog.show();
        }
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getPager();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getPager();
    },
    //查询
    searchProductType() {
      this.getPager();
    },

    /**************** 工具栏调用 **********************/
    resetSearch(formName) {
      this.$refs[formName].resetFields();
    },

    //手机号中间*
    phoneFor(row, column, cellValue) {
      if (typeof cellValue != "undefined") {
        return formatPhone(cellValue);
      }
    },
    //身份证中间*
    idCardFor(row, column, cellValue) {
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

.hander-class {
  margin: 15px 0px 15px 10px;
}
/* .money-daihou-style .el-table th {
  background-color: #409eff;
  color: #ffffff;
}
.money-daihou-style .el-table--border th {
  border-right: 1px solid #c0c4cc;
}
.money-daihou-style .el-input__inner {
  border: 1px solid #409eff;
} */
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
