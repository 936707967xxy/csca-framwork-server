<!--
	Created by yangfei on 2018/3/22.
    催收任务
-->
<template>
  <div id="normal-type-box" class="wrap-box money-daihou-style">
		<div class="crumbs hander-class">
			<el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>贷后管理</el-breadcrumb-item>
				<el-breadcrumb-item>催收任务列表</el-breadcrumb-item>
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
        <div>
          <el-form-item class="form-r-btn">
            <el-button type="primary" @click="monthDeduct('1')" size="small">逾期月还</el-button>
            <el-button type="success" @click="monthDeduct('2')" size="small">入账时间确定</el-button>
            <el-button type="primary" @click="monthDeduct('3')" size="small">催收提醒</el-button>
            <el-button type="primary" @click="monthDeduct('4')" size="small">催收点评</el-button>
            <el-button type="primary" @click="monthDeduct('5')" size="small">信息变更申请</el-button>
            <el-button type="primary" @click="monthDeduct('6')" size="small">外访申请</el-button>
            <el-button type="primary" @click="monthDeduct('7')" size="small">客户还款记录</el-button>
            <el-button type="primary" @click="monthDeduct('8')" size="small">留案申请</el-button>
            <el-dropdown @command="opHandle" trigger="click" style="margin:10px">
              <el-button type="primary" size="small">
                减免申请<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="1">单月减免申请</el-dropdown-item>
                <el-dropdown-item :command="2">多月减免申请</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-button type="primary" @click="downloadExcel" size="small">导出</el-button>
          </el-form-item>
        </div>
			</el-form>
		</div>
    <!-- 列表 -->
    <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :row-style="rowFlag"
              border style="width:100%" cell-class-name="cell-class" @selection-change="selchage" height="570" size="medium">
      <el-table-column type="selection" width="46" align="center"></el-table-column>
      <el-table-column prop="loanId" label="进件编号" min-width="185" align="center" fixed></el-table-column>
      <el-table-column prop="conNo" label="合同编号" min-width="200" align="center" fixed></el-table-column>
      <el-table-column prop="castName" label="客户姓名" min-width="100" align="center" fixed></el-table-column>
      <el-table-column prop="castId" label="客户ID" min-width="220" align="center"></el-table-column>
      <el-table-column prop="posType" label="POS类型" min-width="170" align="center"></el-table-column>
      <el-table-column prop="mSection" label="M段" min-width="80" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" min-width="50" align="center"></el-table-column>
      <el-table-column prop="cardNo" label="身份证号" min-width="140" align="center" :formatter="idCardFor"></el-table-column>
      <el-table-column prop="tel" label="手机号码" min-width="120" align="center" :formatter="phoneFor" ></el-table-column>
      <el-table-column prop="overdueDays" label="逾期天数" min-width="100" align="center"></el-table-column>
      <el-table-column prop="overdueNum" label="逾期期数" min-width="100" align="center"></el-table-column>
      <el-table-column prop="loanPeriod" label="贷款期数" min-width="100" align="center"></el-table-column>
      <el-table-column prop="reductMoney" label="减免金额" min-width="120" align="center"></el-table-column>
      <el-table-column prop="bankAcount" label="开户行账号" min-width="180" align="center"></el-table-column>
      <el-table-column prop="castSource" label="客户来源" min-width="170" align="center"></el-table-column>
      <el-table-column prop="productName" label="产品名称" min-width="170" align="center"></el-table-column>
      <el-table-column prop="conMoney" label="合同金额" min-width="120" align="center"></el-table-column>
      <el-table-column prop="loanMoney" label="放款金额" min-width="120" align="center"></el-table-column>
      <el-table-column prop="loanDate" label="放款日期" min-width="170" align="center"></el-table-column>
      <el-table-column prop="amt" label="月还金额" min-width="120" align="center"></el-table-column>
      <el-table-column prop="receivePenalTy" label="应收违约金" min-width="120" align="center"></el-table-column>
      <el-table-column prop="receiveInterst" label="应收罚息" min-width="120" align="center"></el-table-column>
      <el-table-column prop="receivePenaltyInt" label="应收违罚金" min-width="120" align="center"></el-table-column>
      <el-table-column prop="receiveCorpus" label="应还本金" min-width="120" align="center"></el-table-column>
      <el-table-column prop="receiveShouldinte" label="应还利息" min-width="120" align="center"></el-table-column>
      <el-table-column prop="receiveMoney" label="应收总额" min-width="120" align="center"></el-table-column>
      <el-table-column prop="settleFlag" label="结清标识" min-width="100" align="center">
        <template  slot-scope="props">
            <span v-show="props.row.settleFlag=='0'">已结清</span>
            <span v-show="props.row.settleFlag=='1'">未结清</span>
        </template>
      </el-table-column>
      <el-table-column prop="overdueSubMoney" label="减免金额" min-width="120" align="center"></el-table-column>
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
    <overdueday-list  ref="overdueDayListDialog" @init="getPager" :overdueDay="overdueDay"></overdueday-list>
    <collection-remind  ref="collectionRemindDialog" @init="getPager" :collectionRemind="collectionRemind"></collection-remind>
    <message-update ref="messageUpdateDialog" @init="getPager" :messageUpdateForm="messageUpdateForm"></message-update>
    <comment-collection ref="commentCollectionDialog" @init="getPager" :commentCollection="commentCollection"></comment-collection>
    <reductionapply-one ref="reductionApplyOneDialog" @init="getPager" :reductionApplyOne="reductionApplyOne"></reductionapply-one>
    <reductionapply-more ref="reductionApplyMoreDialog" @init="getPager" :reductionApplyMore="reductionApplyMore"></reductionapply-more>
    <outbound-apply ref="outboundApplyDialog" @init="getPager" :outboundApplyForm="outboundApplyForm"></outbound-apply>
    <paymen-record ref="paymentRecordDialog" @init="getPager" :paymentRecordList="paymentRecordList"></paymen-record>
    <leaveapply-one ref="leaveApplyDialog" @init="getPager" :leaveApply="leaveApply"></leaveapply-one>

  </div>
</template>

<script>
import { fetchData } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";
import { formatIdCard, formatPhone } from "@/utils/InfoFormat.js";
import repayDetails from  "./repaymentDetails.vue";//逾期月还
import overdueDayList from  "./overdueDayList.vue";//入账时间
import collectionRemind from  "./collectionRemind.vue";//催收提醒
import messageUpdate from  "./messageUpdate.vue";//信息变更申请
import commentCollection from  "./commentCollection.vue";//点评
import reductionApplyOne from  "./reductionApplyOne.vue";//单月减免申请
import reductionApplyMore from  "./reductionApplyMore.vue";//多月减免申请
import outboundApply from  "./outboundApply.vue";//外访申请
import paymentRecord from "./customerPaymentRecordList.vue";//客户还款记录
import leaveApply from  "./leaveApply.vue";//留案申请

export default {
  data() {
    return {
      loading:true,
      tableData: [],
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
        posType: ""
      },
      formLabelWidth: "120px",
      queryTypeTitle:"",//详情title
      selectList:[],
      queryType:"",

      detailForm: {
        castName: "", //客户姓名
        loanId: "", //进件编号
        cardNo: "", //身份证号
        tel: "", //手机号码
        bankAcount: "", //银行卡号
        bankName: "", //银行名称
        loanPeriod: "", //贷款期数
        overdueNum: "", //逾期期数
        overdueDays: "", //逾期天数
        loanMoney: "", //放款金额
        conMoney: "", //合同金额
        shouldInte: "", //应还利息
        shouldCapi: "", //应还本金
        shouldAmt: "", //月还款额
        receivePenaltyInterest: "", //应收违约金
        receiveInterest: "", //应收罚息
        receiveMoney: "", //应收总额
        overdueSubMoney:"",//逾期月还减免金额
        overdueSubDate:"",//逾期月还减免失效时间
        overdueSubStrean:"",// 逾期月还减免期次
        balAmt: "", //账户余额
        deductMoney:"",//划扣金额

      },
      overdueDay :{//入账时间确定
        loanId : '',
      },
      collectionRemind:{//催收提醒
        loanId:'',
        conNo:''
      },
      messageUpdateForm:{//信息变更
        loanId:"",
        castName:"",
        castId:"",
        cardNo:""
      },
      commentCollection:{//点评
        loanId:'',
        conNo:'',
        currentPeriod:'',
        overdueNum:'',
      },
      reductionApplyOne:{//单月减免
        loanId:''
      },
      reductionApplyMore:{//多月减免
        loanId:'',
        castName:'',
        conNo:'',
      },
      outboundApplyForm:{//外访记录
        loanId:"",
        castName:"",
        conNo:"",
        cardNo:""
      },
      paymentRecordList:{//客户还款记录
        loanId:''
      },
      leaveApply:{//留案申请
        loanId:''
      },
    };
  },
  created() {
    this.getPager();
  },
  components: {
      'repay-details': repayDetails,
      'overdueday-list': overdueDayList,
      'collection-remind': collectionRemind,
      'message-update': messageUpdate,
      'comment-collection':commentCollection,
      'reductionapply-one':reductionApplyOne,
      'reductionapply-more':reductionApplyMore,
      'outbound-apply':outboundApply,
      'paymen-record':paymentRecord,
      'leaveapply-one':leaveApply,
  },
  methods: {
    getPager() {
      fetchData( "/after/collection/collectionRecordService.do",this.listQuery).then(response => {
        this.loading = false;
        this.frontOrbackup = response.data.pageData[0].frontOrbackup;
        this.tableData = response.data.pageData;
        this.total = response.data.recordCount;
        this.selectList = [];
      });
    },

    //导出
    downloadExcel() {
      axios.post("/after/collection/downloadCollectionRecordService.do", this.listQuery, {responseType: "arraybuffer"})
        .then(res => {
          var fileDownload = require("js-file-download");
          fileDownload(
            res.data,
            "催收任务列表" + formatDate(new Date(), "yyyyMMddhhmmss") + ".xlsx"
          );
        });
    },
    //列表选择变化
    selchage(selection) {
      if (selection.length > 0) {
        this.selectList = selection;
      }
    },

  /**************** 减免申请 **********************/
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
        if(state == '1') {
          this.reductionApplyOne.loanId = this.selectList[0].loanId;
          this.$refs.reductionApplyOneDialog.show();
        }else if(state == '2') {
          this.reductionApplyMore.loanId = this.selectList[0].loanId;
          this.reductionApplyMore.castName = this.selectList[0].castName;
          this.reductionApplyMore.conNo = this.selectList[0].conNo;
          this.reductionApplyMore.mSection = this.selectList[0].mSection;
          this.reductionApplyMore.posType = this.selectList[0].posType;
          this.reductionApplyMore.cardNo = this.selectList[0].cardNo;
          this.$refs.reductionApplyMoreDialog.show();
        }
      }
    },
 /**************** 按钮 **********************/
    monthDeduct (state) {
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
      } else {
        if(state == '1') {
          this.recordDetail(state);
        }else if(state == '2') {// 逾期天数
          this.overdueDay.loanId = this.selectList[0].loanId;
          this.$refs.overdueDayListDialog.show();
        }else if(state == '3') {//入账时间确定
          this.collectionRemind.loanId = this.selectList[0].loanId;
          this.collectionRemind.conNo = this.selectList[0].conNo;
          this.$refs.collectionRemindDialog.show();
        }else if(state == '4') {//催收点评
          this.commentCollection.loanId = this.selectList[0].loanId;
          this.commentCollection.conNo = this.selectList[0].conNo;
          this.commentCollection.currentPeriod = this.selectList[0].currentPeriod;
          this.commentCollection.overdueNum = this.selectList[0].overdueNum;
          this.$refs.commentCollectionDialog.show();
        }else if(state == '5') {//信息变更
          this.messageUpdateForm.loanId = this.selectList[0].loanId;
          this.messageUpdateForm.castName = this.selectList[0].castName;
          this.messageUpdateForm.castId = this.selectList[0].castId;
          this.messageUpdateForm.cardNo = this.selectList[0].cardNo;
          this.$refs.messageUpdateDialog.show();
        }else if(state == '6') {//外访申请
          this.outboundApplyForm.loanId = this.selectList[0].loanId;
          this.outboundApplyForm.castName = this.selectList[0].castName;
          this.outboundApplyForm.conNo = this.selectList[0].conNo;
          this.outboundApplyForm.cardNo = this.selectList[0].cardNo;
          this.$refs.outboundApplyDialog.show();
        }else if(state == '7') {//外访申请
          this.paymentRecordList.loanId = this.selectList[0].loanId;
          this.$refs.paymentRecordDialog.show();
        }else if(state == '8') {//留案申请
          this.leaveApply.loanId = this.selectList[0].loanId;
          this.leaveApply.applyId = this.selectList[0].applyId;
          this.$refs.leaveApplyDialog.show();
        }

      }
    },

    //逾期月还
    recordDetail(queryType) {
      let opData = {
        loanId: this.selectList[0].loanId||"",
        currentPeriod: this.selectList[0].currentPeriod||"",
        queryType: queryType
      };

      this.queryType = queryType;
      fetchData("/after/deduct/ovedueAdvNomalDetail.do", opData).then(
        response => {
          if(response.data.success) {
            this.detailForm = response.data.data;
           this.$refs.repayDetailsDialog.show(queryType);
          }
      });
    },
    // 信息变更
    // messageUpdateBtn() {
    //   //必须选择数据
    //   if (this.selectList.length < 1) {
    //     this.$message({
    //       message: "警告,请选择数据!",
    //       type: "warning",
    //       duration:5000
    //     });
    //     return;
    //   } else if (this.selectList.length > 1) {
    //     this.$message({
    //       message: "警告,只允许单笔划扣!",
    //       type: "warning",
    //       duration:5000
    //     });
    //     return;
    //   }else {
    //     this.messageUpdateForm.loanId = this.selectList[0].loanId;
    //     this.messageUpdateForm.castName = this.selectList[0].castName;
    //     this.messageUpdateForm.castId = this.selectList[0].castId;
    //     this.messageUpdateForm.cardNo = this.selectList[0].cardNo;
    //     this.$refs.messageUpdateDialog.show();
    //   }
    // },
    /**************** 分页**********************/
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
    },
    rowFlag({row,rowIndex}) {
      if(row.toRed == '1') {
        return {
          backgroundColor:'#f56c6c'
        }
      }
    },
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
