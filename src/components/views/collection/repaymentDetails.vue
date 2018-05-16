<!--
	Created by yangfei on 2018/3/22.
    还款详情
-->
<template>
     <el-dialog title="逾期月还" :visible.sync="dialogDetailForm" width="75%" center :show-close='false'>
      <el-form :model="detailForm" ref="detailForm" :inline="true" size="small">
        <fieldset class="fieldset-box">
          <legend>客户信息:</legend>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名:" :label-width="formLabelWidth" prop="castName">
                <el-input v-model="detailForm.castName" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="进件编号:" :label-width="formLabelWidth" prop="loanId">
                <el-input v-model="detailForm.loanId" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号:" :label-width="formLabelWidth" prop="cardNo">
                <el-input v-model="detailForm.cardNo" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="手机号码:" :label-width="formLabelWidth" prop="tel">
                <el-input v-model="detailForm.tel" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号:" :label-width="formLabelWidth" prop="bankAcount">
                <el-input v-model="detailForm.bankAcount" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行名称:" :label-width="formLabelWidth" prop="bankName">
                <el-input v-model="detailForm.bankName" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款期数:" :label-width="formLabelWidth" prop="loanPeriod">
                <el-input v-model="detailForm.loanPeriod" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逾期期数:" :label-width="formLabelWidth" prop="overdueNum">
                <el-input v-model="detailForm.overdueNum" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逾期天数:" :label-width="formLabelWidth" prop="overdueDays">
                <el-input v-model="detailForm.overdueDays" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="放款金额:" :label-width="formLabelWidth" prop="loanMoney">
                <el-input v-model="detailForm.loanMoney" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同金额:" :label-width="formLabelWidth" prop="conMoney">
                <el-input v-model="detailForm.conMoney" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应还利息:" :label-width="formLabelWidth" prop="shouldInte">
                <el-input v-model="detailForm.shouldInte" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应还本金:" :label-width="formLabelWidth" prop="shouldCapi">
                <el-input v-model="detailForm.shouldCapi" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="月还款额:" :label-width="formLabelWidth" prop="shouldAmt">
                <el-input v-model="detailForm.shouldAmt" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收违约金:" :label-width="formLabelWidth" prop="receivePenaltyInterest">
                <el-input v-model="detailForm.receivePenaltyInterest" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收罚息:" :label-width="formLabelWidth" prop="receiveInterest">
                <el-input v-model="detailForm.receiveInterest" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收总额:" :label-width="formLabelWidth" prop="receiveMoney">
                <el-input v-model="detailForm.receiveMoney" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逾期减免金额:" :label-width="formLabelWidth" prop="overdueSubMoney">
                <el-input v-model="detailForm.overdueSubMoney" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逾期减免失效时间:" :label-width="formLabelWidth" prop="overdueSubDate">
                <el-input v-model="detailForm.overdueSubDate" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逾期减免期次:" :label-width="formLabelWidth" prop="overdueSubStrean">
                <el-input v-model="detailForm.overdueSubStrean" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账户余额:" :label-width="formLabelWidth" prop="balAmt">
                <el-input v-model="detailForm.balAmt" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
      </el-form>
      <el-form :model="repayForm" ref="repayForm" :rules="rule" :inline="true" size="small">
        <div class="cg-div" >
          <legend>还款方式:</legend>
          <el-row>
            <el-col :span="10">
              <el-form-item label="还款方式:" prop="repayType" label-width="120px">
                <el-select v-model="repayForm.repayType" placeholder="请选择" size="small">
                  <el-option label="宝付" value="BF" ></el-option>
                  <el-option label="富友" value="FY"></el-option>
                  <el-option label="存公" value="CG" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="repayForm.repayType == 'FY'||repayForm.repayType=='BF'">
            <el-col :span="10">
              <el-form-item label="划扣金额:" label-width="120px" prop="deductMoney">
                <el-input v-model.number="repayForm.deductMoney" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="cg-div" v-if="repayForm.repayType == 'CG'">
          <legend>存公信息查询:</legend>
          <el-row>
            <el-col :span="12" >
              <el-form-item label="卡号:" prop="rpyacc" label-width="120px">
                <el-input v-model="repayForm.rpyacc"  placeholder="卡号" size="small" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="存公日期:" prop="transactionDate" label-width="120px">
                  <el-date-picker
                    v-model="repayForm.transactionDate"
                    align="right"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="width:200px;"
                  >
                  </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="存公备注:" prop="naryur" label-width="120px">
                <el-input v-model="repayForm.naryur"  placeholder="" size="small" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对应公户后4位:" prop="corporateBankAccount" label-width="120px">
                <el-select v-model="repayForm.corporateBankAccount" placeholder="请选择" size="small">
                  <el-option label="0707" value="0707"></el-option>
                  <el-option label="7180" value="7180" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="16">
              <el-form-item>
                <el-button type="primary" @click="searchSP('repayForm')" size="mini" >查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-table :data="spTableData" v-loading="sploading" element-loading-text="请输入查询条件，点击查询！" element-loading-spinner="el-icon-loading"
                    :stripe="true" border style="width: 100%" cell-class-name="cell-class" @selection-change="SpSelchage"  size="mini" max-height="400">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="transactionDate" label="交易日期" align="center" min-width="150"></el-table-column>
            <el-table-column prop="rpynam" label="姓名" align="center" min-width="80"></el-table-column>
            <el-table-column prop="rpyacc" label="卡号" align="center" min-width="150"></el-table-column>
            <el-table-column prop="naryur" label="摘要" align="center" min-width="110"></el-table-column>
            <el-table-column prop="trsamtc" label="存公存入金额" align="center" min-width="100"></el-table-column>
            <el-table-column prop="rpybnk" label="银行名称" align="center" min-width="140"></el-table-column>
            <el-table-column prop="corporateBankAccount" label="对应公户" align="center" min-width="80"></el-table-column>
          </el-table>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFun" size="small">取 消</el-button>
        <el-button type="primary" @click="queryTypeFun('repayForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import { fetchData } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";

export default {
  data() {
    return {
      dialogDetailForm: false,
      formLabelWidth: "130px",
      queryType:"",
      //存公核查条件查询
      spQuery : {
        rpyacc : '',
        naryur : '',
        corporateBankAccount : '',
        transactionDate : '',
      },
      repayForm:{
        repayType:'',
        deductMoney:'',
        rpyacc:'',//存公 卡号
        transactionDate:'',//存公日期
        naryur:'',//存公备注
        corporateBankAccount:'',//对应公户后4位

      },
      spTableData:[],
      spSelection:[],//存公列表 选择
      sploading:true,//存公
      rule:{
        repayType: [{required: true, message: '请选择还款方式', trigger: 'change'}],
        deductMoney:[
          {required: true, message: '金额不能为空', trigger: 'blur'},
          {type: 'number', message: '必须为数字值'}
        ],
				rpyacc : [
					{ validator: this.checkRpyacc, trigger: 'blur' }
				],
				naryur : [
					{ validator: this.checkNaryur, trigger: 'blur' }
				],
				corporateBankAccount : [
					{ required: true, message: '请选择对应公户', trigger: 'change' }
				],
      }
    };
  },
  props:{
    detailForm: {
      castName: String, //客户姓名
      loanId: String, //进件编号
      cardNo: String, //身份证号
      tel: String, //手机号码
      bankAcount: String, //银行卡号
      bankName: String, //银行名称
      loanPeriod:String, //贷款期数
      overdueNum:String, //逾期期数
      overdueDays:String, //逾期天数
      loanMoney:String, //放款金额
      conMoney:String, //合同金额
      shouldInte:String, //应还利息
      shouldCapi:String, //应还本金
      shouldAmt:String, //月还款额
      receivePenaltyInterest:String, //应收违约金
      receiveInterest:String, //应收罚息
      receiveMoney:String, //应收总额
      overdueSubMoney:String, //逾期月还减免金额
      overdueSubDate:String, //逾期月还减免失效时间
      overdueSubStrean:String, //逾期月还减免期次
      balAmt:String, //账户余额
      deductMoney:String,//划扣金额
      // repayType:String,//还款方式
    },
  },
  methods: {
    show(queryType){
      this.dialogDetailForm = true;
      this.queryType = queryType;
    },

    //还款详情 确定
    queryTypeFun(formName) {
      let url = '';
      let data1 = {};
      let data = {
        loanId: this.detailForm.loanId,
        stream: this.detailForm.overdueNum,
        deductMoney: this.repayForm.deductMoney,
      };
      if (this.sploading && this.repayForm.repayType == 'CG') {
        this.$message({
          message: "警告,请查询存公数据!",
          type: "warning",
          duration:5000
        });
        return;
      }
      if(!this.sploading) {
        let idArray = new Array();
        this.spSelection.forEach(function(element) {
          idArray.push(element.id);
        });
        data1 = {
          loanId: this.detailForm.loanId,
          stream: this.detailForm.overdueNum,
          corporateBankAccount: this.repayForm.corporateBankAccount,
          id:idArray
        }
        if (this.spSelection.length < 1) {
          this.$message({
            message: "警告,请选择数据!",
            type: "warning",
            duration:5000
          });
          return;
        }
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否确定划扣?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            if(this.repayForm.repayType == 'FY') {
              url = '/after/deductfu/overdue.do';
              this.submitFun(url,data);
            }else if(this.repayForm.repayType == 'BF') {
              url = '/after/deductbf/overdue.do';
              this.submitFun(url,data);
            }else if(this.repayForm.repayType == 'CG') {
              url = '/after/deductcg/overdue.do';
              this.submitFun(url,data1);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消划扣",
              duration:5000
            });
          });
        } else {
          this.$message({
            message: "请填写表单数据！",
            type: "warning",
            duration:5000
          });
          return false;
        }
      });
    },
  submitFun(url,data) {
    fetchData(url, data).then(
      response => {
        var msmResult = response.data;
          if (!msmResult.success) {
            this.$message({
              message: msmResult.msg,
              type: "warning",
              duration:5000
            });
          }else {
            this.$message({
              message: msmResult.msg,
              type: "success",
              duration:5000
            });
            this.$refs["detailForm"].resetFields();
            this.$refs["repayForm"].resetFields();
            this.spTableData = [];
            this.sploading = true;
            this.dialogDetailForm = false;
            this.$emit('init');
          }
      });
    },
    //还款详情 取消
    cancelFun() {
      this.$refs["detailForm"].resetFields();
      this.$refs["repayForm"].resetFields();
      this.spTableData = [];
      this.sploading = true;
      this.dialogDetailForm = false;
      this.$emit('init');
    },

    /**
     * 银企直连存公核查
     */
  //选择存公数据
    SpSelchage(selection){
      if (selection.length > 0) {
        this.spSelection = selection;
      }
    },
    //重置存公查询框
    resetSearchSP(formName){
      this.$refs[formName].resetFields();
      this.spTableData = [];
      this.sploading = true;
    },
    //存公查询
    searchSP(formName){
      let data = {
        rpyacc:this.repayForm.rpyacc,//存公 卡号
        transactionDate:this.repayForm.transactionDate,//存公日期
        naryur:this.repayForm.naryur,//存公备注
        corporateBankAccount:this.repayForm.corporateBankAccount,//对应公户后4位
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fetchData('/after/deductcg/cglist.do', data).then(response => {
            this.spTableData = response.data;
            this.sploading = false;
          })
        } else {
          return false;
        }
      });
    },

    //银企直连自定义规则
    checkRpyacc(rule, value, callback){
      if(this.repayForm.rpyacc != '' || this.repayForm.naryur != ''){
        callback();
      }else{
        callback(new Error('卡号与存公备注，至少需输入一项！'));
      }
    },
    checkNaryur(rule, value, callback){
      if(this.repayForm.rpyacc != '' || this.repayForm.naryur != ''){
        callback();
      }else{
        callback(new Error('卡号与存公备注，至少需输入一项！'));
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
.fieldset-box {
  margin: 10px 0;
  padding: 5px 10px;
  border-color: #fff;
}
.fieldset-box legend,
legend {
  font-size: 16px;
  color: #409EFF;
}
.cg-div {
  position: relative;
  padding-top: 15px;
  border:1px solid #a6a6a6;
  margin-top: 15px;
}
.cg-div legend {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
}
</style>
