<!--
	Created by yangfei on 2018/05/15.
    留案二级申请详情
-->
<template>
     <el-dialog :title="titleType" :visible.sync="dialogDetailForm" width="80%" center :show-close='false'>
      <el-form :model="detailForm" ref="detailForm" :inline="true" size="small">
        <div class="fieldset-box">
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
              <el-form-item label="合同编号:" :label-width="formLabelWidth" prop="conNo">
                <el-input v-model="detailForm.conNo" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="逾期天数:" :label-width="formLabelWidth" prop="overdueDays">
                <el-input v-model="detailForm.overdueDays" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收违约金:" :label-width="formLabelWidth" prop="receivePenalty">
                <el-input v-model="detailForm.receivePenalty" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收罚息:" :label-width="formLabelWidth" prop="receiveInterest">
                <el-input v-model="detailForm.receiveInterest" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收违罚金:" :label-width="formLabelWidth" prop="receivePenaltyInterest">
                <el-input v-model="detailForm.receivePenaltyInterest" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应还本金:" :label-width="formLabelWidth" prop="receiveCorpus">
                <el-input v-model="detailForm.receiveCorpus" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应还利息:" :label-width="formLabelWidth" prop="receiveShouldinte">
                <el-input v-model="detailForm.receiveShouldinte" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="月还款额:" :label-width="formLabelWidth" prop="amt">
                <el-input v-model="detailForm.amt" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收总额:" :label-width="formLabelWidth" prop="receiveMoney">
                <el-input v-model="detailForm.receiveMoney" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逾期期数:" :label-width="formLabelWidth" prop="overdueNum">
                <el-input v-model="detailForm.overdueNum" auto-complete="off" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <el-form :model="leaveApplyForm" ref="leaveApplyForm" label-position="right" size="small" label-width="120px">
        <div class="fieldset-box" v-for="(i,index) in applyList" :key="i.id">
          <legend>{{getStatus(i.applyStatus)}}</legend>
          <el-row>
            <el-col :span="20" v-if="index == 0">
              <el-form-item  label="备注:" prop="applicationDesc">
                <el-input v-model="i.approveDesc" type='textarea' readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="index != 0">
            <el-col :span="10">
              <el-form-item label="审批意见:" prop="approveOpinion">
              <el-input v-model="i.approveOpinion=='1'?'拒绝':'同意'" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="审批备注:" prop="approveDesc">
                  <el-input v-model="i.approveDesc" type='textarea' readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFun" size="small">取 消</el-button>
        <el-button type="primary" @click="onSubmit" size="small">确 定</el-button>
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
      titleType:"",
      queryType:"",
      detailForm: {
        loanId: "", //进件编号
        castName: "", //客户姓名
        conNo: "", //合同编号
        overdueDays: "", //逾期天数
        overdueNum: "", //逾期期数
        receiveShouldinte: "", //应还利息
        receiveCorpus: "", //应还本金
        amt: "", //月还款额
        receivePenalty: "", //应收违约金
        receiveInterest: "", //应收罚息
        receivePenaltyInterest:"",//应收违罚金
        receiveMoney: "", //应收总额
      },
      leaveApplyForm:{
        applicationDesc:'',//申请备注
        approveDesc1:'',
        approveOpinion1:'',
        approveDesc:'',
        approveOpinion:'',
      },
      applyList:[],
      applyListLength:"",
    };
  },
  props:{
    leaveApplyParams: {
      loanId: String, //进件编号
      applyId: String, //订单ID
    },
  },
  methods: {
    show(titleType){
      if(titleType == 'overdueLeave') {
        this.titleType = '电催留案申请'
      }else if(titleType == 'outBoundLeave') {
        this.titleType = '外访留案申请'
      }
      this.dialogDetailForm = true;
      this.getData();
    },
    getData() {
      let data = {
        loanId:this.leaveApplyParams.loanId
      }
      let data1 = {
        applyId:this.leaveApplyParams.applyId
      }
      fetchData( "/after/singelsubapply/minoverdue.do",data).then(response => {
        this.detailForm = response.data;
      });
      fetchData("/after/flow/apply.do", data1).then(response => {
        this.applyListLength = response.data.length;
        this.applyList = response.data;
      });

    },
    // 提交
    onSubmit(formName) {
      let data = {
        loanId:this.leaveApplyParams.loanId,
        applyId:this.leaveApplyParams.applyId,
        applyType:this.leaveApplyParams.titleType,
        applicationDesc:this.leaveApplyForm.applicationDesc,
        approveOpinion:this.leaveApplyForm.approveOpinion,
      }
      this.$confirm("此操作将提交留案申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          fetchData("/after/leaveapply/leaveapply2.do",data).then(
            response => {
            var result = response.data;
            if (result.success) {
              this.$message({
                message: result.msg,
                type: "success"
              });
              this.$refs['detailForm'].resetFields();
              this.$refs['leaveApplyForm'].resetFields();
              this.dialogDetailForm = false;
              this.$emit('init');
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
            message: "已取消留案申请！"
          });
        });
    },
      //还款详情 取消
    cancelFun() {
      this.$refs["detailForm"].resetFields();
      this.$refs["leaveApplyForm"].resetFields();
      this.dialogDetailForm = false;
      this.$emit('init');
    },
    getStatus(status){
      let str = "";
        switch (status) {
          case '2':
              str = "申请";
              break;
          case '3':
              str = "一级审批";
              break;
          case '4':
              str = "二级审批";
              break;
          default:
              str = "";
        }
        return str;
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
  position: relative;
  padding-top: 15px;
  border:1px solid #a6a6a6;
  margin-top: 15px;
}
.fieldset-box legend {
  position: absolute;
  top: -10px;
  left: 10px;
  color: #409eff;
  background-color: #fff;
}
</style>
