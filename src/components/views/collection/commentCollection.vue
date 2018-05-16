<!--
	Created by yangfei on 2018/4/18.
    客服催收提醒
-->
<template>
     <el-dialog title="客服催收提醒" :visible.sync="dialogDetail" width="70%" center :close-on-click-modal='false' @close="cancelFun">
					<fieldset class="fieldset-box">
						<legend>客户信息:</legend>
						<el-form class="small-space" label-position="right" label-width="130px" size="mini">
							<el-row>
								<el-col :span="8">
									<el-form-item label="客户姓名:">{{castInfo.castName}}</el-form-item>
								</el-col>
								<el-col :span="7">
									<el-form-item label="性别:">{{castInfo.sex}}</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="身份证号:">{{castInfo.cardNo}}</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</fieldset>
					<fieldset class="fieldset-box">
						<legend>案件详情:</legend>
						<el-form class="small-space" label-position="right" label-width="130px" size="mini">
							<el-row>
								<el-col :span="8">
									<el-form-item label="银行名称:">{{castInfo.bankName}}</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="银行卡号:">{{castInfo.bankAcount}}</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="产品名称:">{{castInfo.productName}}</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="贷款期次:">{{castInfo.loanPeriod}}</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="剩余期数:">{{castInfo.remainderPeriod}}</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="放款日期:">{{castInfo.loanDate}}</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="放款金额:">{{castInfo.loanMoney}}元</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="账单日:">{{castInfo.statementDate}}</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="应还金额:">{{castInfo.shouldAmt}}元</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="还款日:">{{castInfo.replaymentDate}}</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="贷后客服名称:">{{castInfo.loanManagerCast}}</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</fieldset>
          <fieldset class="fieldset-box">
            <legend>客户逾期详细:</legend>
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  <div class="overdue-title">客户逾期详细</div>
                </template>
                <legend>逾期合计:</legend>
                <el-row>
                  <el-col :span="10" class="form-left-margin">
                      <span>逾期总金额:</span>
                      <span style="color: red;">{{castInfo.overdueTotalAmt}}</span>
                      <span>元</span>
                  </el-col>
                  <el-col :span="10" class="form-left-margin">
                      <span>逾期总期数:</span>
                      <span style="color: red;">{{castInfo.overduePeriod}} </span>
                      <span>期</span>
                  </el-col>
                </el-row>
                <el-table :data="overdueDetailsList" :stripe="true" border cell-class-name="cell-class" height="250" size="small" style="width:100%">
                  <el-table-column prop="overdueNum" label="逾期期数" align="center" ></el-table-column>
                  <el-table-column prop="overdueDays" label="逾期天数" align="center" ></el-table-column>
                  <el-table-column prop="receivePenaltyInterest" label="应收违约金" align="center" ></el-table-column>
                  <el-table-column prop="receiveInterest" label="应收罚息" align="center" ></el-table-column>
                  <el-table-column prop="receivePenaltyInt" label="应收违罚金" align="center" ></el-table-column>
                  <el-table-column prop="receiveMoney" label="应收总额" align="center" ></el-table-column>
                  <el-table-column prop="receivedMoney" label="已收金额" align="center" ></el-table-column>
                  <el-table-column prop="balanceMoney" label="结欠金额" align="center" ></el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </fieldset>
          <fieldset class="fieldset-box">
            <legend>催收历史记录:</legend>
            <el-table :data="collectingHistoryList" :stripe="true" border cell-class-name="cell-class" height="250" size="small" style="width:100%">
              <el-table-column prop="collectingDate" label="催收时间" min-width="120" align="center"></el-table-column>
              <el-table-column prop="collectingName" label="姓名" min-width="100" align="center"></el-table-column>
              <el-table-column prop="relationship" label="关系" min-width="70" align="center"></el-table-column>
              <el-table-column prop="receivingState" label="接听状态" min-width="70" align="center"></el-table-column>
              <el-table-column prop="remindingState" label="提醒状态" min-width="70" align="center"></el-table-column>
              <el-table-column prop="noMndingNum" label="未提醒天数" min-width="70" align="center"></el-table-column>
              <el-table-column prop="noteTaker" label="记录人" min-width="100" align="center"></el-table-column>
              <el-table-column prop="nextRemindingTime" label="下次提醒时间" min-width="120" align="center"></el-table-column>
              <el-table-column prop="remarks" label="备注" min-width="100" align="center" show-overflow-tooltip></el-table-column>
            </el-table>

          </fieldset>
					<fieldset class="fieldset-box">
            <legend>点评:</legend>
            <el-form class="small-space" label-position="right" :model="commentModel" ref="commentModel" label-width="150px" size="mini" style="width: 100%">
              <el-row>
                <el-col :span='20'>
                  <el-form-item label="催收点评:" prop="desc">
                    <el-input v-model="commentModel.desc" type='textarea' :maxlength='120' placeholder="输入不大于120字"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" class="add-btn-box">
                  <el-button type="primary" @click="commentModelSubmit('commentModel')" size="mini">提交</el-button>
                </el-col>
              </el-row>
						</el-form>
					</fieldset>
    </el-dialog>
</template>

<script>
import { fetchData } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";

export default {
  data() {
    return {
      dialogDetail: false,
      formLabelWidth: "150px",
      castInfo: {
        castName: "", //客户姓名
        sex: "", //性别
        cardNo: "", //身份证号
        tel: "", //联系电话
        bankName: "", //银行名称
        bankAcount: "", //银行卡号
        homeAddress: "", //家庭住址
        unitName: "", //单位名称
        unitAddress: "", //单位地址
        unitTel: "", //单位电话
        productName: "", //产品名称
        loanPeriod: "", //贷款期次
        remainderPeriod: "", //剩余期数
        loanMoney: "", //放款金额
        loanDate: "", //放款日期
        statementDate: "", //账单日
        shouldAmt: "", //应还金额
        replaymentDate: "", //还款日
        overdueTotalAmt: "", //逾期总金额
        overduePeriod: "", //逾期总期数
      },
      overdueDetailsList: [], //客户逾期详情
      collectingHistoryList: [], //催收记录
      callDetailsList:[],//通话详单

      commentModel: { //点评
        loanId:"",
        conNo:"",//合同编号
        stream:"",//期次
        desc:"",//点评
      },
    }
  },
  props: {
    commentCollection: {
      loanId: String, //进件编号
      conNo: String, //合同编号
      currentPeriod: String, //当前期次
      overdueNum: String, //逾期期次
    }
  },
  methods: {
    show(queryType) {
      this.dialogDetail = true;
      this.getList();
    },
    // 获取列表
    getList() {
      let data = {
        loanId: this.commentCollection.loanId, //进件编号
      };
      fetchData("/after/collection/collectionRecordRemindingService.do",data).then(response => {
        this.castInfo = response.data.data;
        this.overdueDetailsList = response.data.data.overdueDetailsList;
        this.collectingHistoryList = response.data.data.collectingHistoryList;
        this.callDetailsList = response.data.data.callDetailsList;
        this.loading = false;
      });
    },

    //点评 提交
    commentModelSubmit(formName) {
      let data = {
        loanId:this.commentCollection.loanId,
        conNo:this.commentCollection.conNo,
        stream:this.commentCollection.currentPeriod,
        commentDesc:this.commentModel.desc,
        overdueNum:this.commentCollection.overdueNum
      }
      this.$confirm("确定点评吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          fetchData("/after/collection/addCommentCollectionRecordService.do",data).then(response => {
            var result = response.data;
            if (result.success) {
              this.$message({
                message: result.msg,
                type: "success"
              });
              this.$refs[formName].resetFields();
              this.dialogDetail = false;
              this.$emit("init");
            } else {
              this.$message({
                message: result.msg,
                type: "warning"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消新增！"
          });
        });
    },
    //催收提醒 关闭
    cancelFun() {
      this.$refs["commentModel"].resetFields();
      this.dialogDetail = false;
      this.$emit("init");
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
.form-left-margin {
  margin-left: 30px;
  padding: 10px;
}
.form-left-margin span {
  color: #606266
}
.fieldset-box {
  margin: 10px 0;
  padding: 10px 0;
  border-color: #fff;
}
.fieldset-box legend {
  font-size: 16px;
  color: #409eff;
}
.overdue-title {
  font-size: 18px;
  color: #409eff;
  padding-left: 44%;
}
.add-btn-box {
  float: right;
  margin-right: 100px;
}
</style>
