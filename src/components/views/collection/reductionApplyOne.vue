<!--
	Created by yangfei on 2018/4/25.
    单月减免申请
-->
<template>
<div>
  <el-dialog class="wrap-box" title="单月减免申请" :visible.sync="dialogDetailForm" width="70%" :show-close='false' :close-on-press-escape='false' :close-on-click-modal='false'>
      <el-form label-position="right" label-width="120px" :model="overdueApplyForm" ref="overdueApplyForm" size="small">
        <fieldset class="overdue-box">
          <legend>减免申请信息:</legend>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名:" prop="castName">
                <el-input v-model="overdueApplyForm.castName" type='text' readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="进件编号:" prop="loanId">
                <el-input v-model="overdueApplyForm.loanId" type='text' readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号:" prop="conNo">
                <el-input v-model="overdueApplyForm.conNo" type='text' readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="逾期天数:" prop="overdueDays">
                <el-input v-model="overdueApplyForm.overdueDays" type='text' readonly></el-input>
                <template slot="append">天</template>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逾期期数:" prop="overdueNum">
                <el-input v-model="overdueApplyForm.overdueNum" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收违约金:" prop="receivePenalty">
                <el-input v-model="overdueApplyForm.receivePenalty" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收罚息:" prop="receiveInterest">
                <el-input v-model="overdueApplyForm.receiveInterest" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收违罚金:" prop="receivePenaltyInterest">
                <el-input v-model="overdueApplyForm.receivePenaltyInterest" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应还本金:" prop="receiveCorpus">
                <el-input v-model="overdueApplyForm.receiveCorpus" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应还利息:" prop="receiveShouldinte">
                <el-input v-model="overdueApplyForm.receiveShouldinte" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="月还款额:" prop="amt">
                <el-input v-model="overdueApplyForm.amt" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收总额:" prop="receiveMoney">
                <el-input v-model="overdueApplyForm.receiveMoney" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
      </el-form>

      <el-form :model="overdueApplyForm2" ref="overdueApplyForm2" :rules="rule" label-position="right" label-width="120px" size="small">
        <fieldset class="overdue-box">
          <legend>实际减免信息:</legend>
          <el-row>
            <el-col :span="8">
                <el-form-item label="实还金额:" prop="repaymentMoney">
                  <el-input v-model="overdueApplyForm2.repaymentMoney" type='text'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="实还日期:" prop="subDate">
                  <el-date-picker v-model="overdueApplyForm2.subDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  placeholder="选择日期" size="small" :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item >
                  <el-button type="primary" @click="repaymentMoneyClick('overdueApplyForm2')">计算金额</el-button>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="repayFlag">
            <el-col :span="8">
              <el-form-item label="逾期天数:" prop="overdays">
                <el-input v-model="overdueApplyForm2.overdays" type='text' readonly></el-input>
                <template slot="append">天</template>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逾期期数:" prop="currentPeriod">
                <el-input v-model="overdueApplyForm2.currentPeriod" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收违约金:" prop="receivePenalty">
                <el-input v-model="overdueApplyForm2.receivePenalty" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收罚息:" prop="receiveInterest">
                <el-input v-model="overdueApplyForm2.receiveInterest" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收违罚金:" prop="receivePenaltyInterest">
                <el-input v-model="overdueApplyForm2.receivePenaltyInterest" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收本金:" prop="shouldCapi">
                <el-input v-model="overdueApplyForm2.shouldCapi" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收利息:" prop="shouldInte">
                <el-input v-model="overdueApplyForm2.shouldInte" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收月还:" prop="shouldAmt">
                <el-input v-model="overdueApplyForm2.shouldAmt" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收总额:" prop="receiveMoney">
                <el-input v-model="overdueApplyForm2.receiveMoney" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="减免违约金:" prop="subInterest">
                <el-input v-model="overdueApplyForm2.subInterest" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="减免罚息:" prop="subPenalty">
                <el-input v-model="overdueApplyForm2.subPenalty" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="减免总额:" prop="reduction">
                <el-input v-model="overdueApplyForm2.reduction" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="实还违约金:" prop="shInterest">
                <el-input v-model="overdueApplyForm2.shInterest" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实还罚息:" prop="shPenalty">
                <el-input v-model="overdueApplyForm2.shPenalty" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实还月还:" prop="shshouldAmt">
                <el-input v-model="overdueApplyForm2.shshouldAmt" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实还总额:" prop="shreduction">
                <el-input v-model="overdueApplyForm2.shreduction" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item class="overdue-desc textarea-wrap" label="备注:" prop="applicationDesc">
                <el-input v-model="overdueApplyForm2.applicationDesc" type='textarea'></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="20">
              <el-form-item label="上传:">
                <el-upload
                  ref="overdueImg"
                  action="/after/upload/uploadImage.do"
                  :data="imageModel"
                  list-type="picture-card"
                  accept=".gif,.png,.jpg,.jpeg,.bmp"
                  :on-preview="handlePictureCardPreview"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :on-error="handleError"
                  >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="overApplyCancel('overdueApplyForm2')" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSubmit('overdueApplyForm2')" size="mini">提交</el-button>
      </div>
		</el-dialog>
      <!-- 图片预览 -->
    <el-dialog :visible.sync="imgdialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
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
      dialogDetailForm:false,
      repayFlag:false,//实还总额
      imgdialogVisible:false,//图片预览
      pickerOptions: {//限制日期
        disabledDate(time) {
          return time.getTime() < (Date.now()-86400000);
        },
      },
      overdueSumMoney:"",//应还总额最大值
      overdueApplyForm: {
        id: "",
        loanId: "",
        conNo: "",
        castName: "",
        overdueDays: "",
        receivePenalty: "",
        receiveInterest: "",
        receivePenaltyInterest: "",
        receiveCorpus:"",
        receiveShouldinte:"",
        amt:"",
        receiveMoney: "",
        overdueNum: "",
        settleFlag: "",
        createTime: "",
        updateDate: ""
      },
      overdueApplyForm2:{
        repaymentMoney:"",
        subDate:"",
        overdays: "",
        currentPeriod: "",
        receivePenalty: "",
        receiveInterest: "",
        receivePenaltyInterest: "",
        receiveMoney: "",
        shouldCapi:"",
        shouldInte:"",
        shouldAmt:"",
        subInterest:"",
        subPenalty:"",
        reduction:"",
        shInterest:"",//实还违约金
        shPenalty:"",//实还罚息
        shshouldAmt:"",//实还月还
        shreduction:"",//实还总额
        applicationDesc:"",//备注
        applyId:"",//图片
        applyType:"overdueSingle",//类型
      },
      subparams:[],
      imageModel: {
        applyType: "C1",
        applyId: "",
        imageType: "overdueSingle",
        imageId: "",
        diskPath: ""
      },
      delImgModel: {
        applyId: "",
        Id: "",
        diskPath: ""
      },
      dialogImageUrl: "",

      rule:{
        repaymentMoney:{required: true, validator: this.repaymentMoneyRule, trigger:'blur' },
        subDate:{required: true, message:"请选择日期", trigger:'change' }
      }
    }
  },
  props:{
    reductionApplyOne:{
      loanId: String, //进件编号
    }
  },
  methods:{
    show(){
      this.dialogDetailForm = true;
      this.getData();
    },
       // 多月减免申请
    getData() {
      let data = {
        loanId:this.reductionApplyOne.loanId
      }
      fetchData( "/after/singelsubapply/minoverdue.do",data).then(response => {
          this.overdueApplyForm = response.data;
          this.overdueSumMoney = parseInt(Math.ceil(this.overdueApplyForm.receiveMoney));
        })

    },
    //实际金额 校验
    repaymentMoneyRule(rule, value, callback){
        if(!value){
            callback(new Error("请输入金额"));
        }
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if(!reg.test(value)){
            callback(new Error("输入金额有误"));
        }else{
          if(value>this.overdueSumMoney) {
            callback(new Error("输入金额过大"));
          }else{
            callback();
          }
        }
    },
    //实际金额 计算
    repaymentMoneyClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            loanId:this.reductionApplyOne.loanId,
            repaymentMoney:this.overdueApplyForm2.repaymentMoney,
            subDate:this.overdueApplyForm2.subDate,
          }
          fetchData("/after/singelsubapply/singelreductionmoney.do", data).then(
            response => {
              if (!response.data.success) {
                this.$message({
                  message:response.data.msg,
                  type: "warning"
                });
                return;
              }else if(response.data.success) {
                let res = response.data;
                this.overdueApplyForm2.overdays = res.overdays;
                this.overdueApplyForm2.currentPeriod = res.currentPeriod;
                this.overdueApplyForm2.receivePenalty = res.receivePenalty;
                this.overdueApplyForm2.receiveInterest = res.receiveInterest;
                this.overdueApplyForm2.receivePenaltyInterest = res.receivePenaltyInterest;
                this.overdueApplyForm2.receiveMoney = res.receiveMoney;
                this.overdueApplyForm2.shouldCapi = res.shouldCapi;
                this.overdueApplyForm2.shouldInte = res.shouldInte;
                this.overdueApplyForm2.shouldAmt = res.shouldAmt;
                this.overdueApplyForm2.subInterest = res.subInterest;
                this.overdueApplyForm2.subPenalty = res.subPenalty;
                this.overdueApplyForm2.reduction = res.reduction;
                this.overdueApplyForm2.shInterest= res.shInterest;//实还违约金
                this.overdueApplyForm2.shPenalty= res.shPenalty;//实还罚息
                this.overdueApplyForm2.shshouldAmt= res.shshouldAmt;//实还月还
                this.overdueApplyForm2.shreduction= res.shreduction;//实还总额
                this.repayFlag = true;
              }
            });
        } else {
          return false;
        }
      });
    },
    // 减免申请取消
    overApplyCancel() {
      this.$refs["overdueImg"].clearFiles();
      this.$refs['overdueApplyForm'].resetFields();
      this.$refs['overdueApplyForm2'].resetFields();
      this.repayFlag = false;
      this.dialogDetailForm = false;
      this.$emit('init');
    },
    //减免 提交
    onSubmit(formName) {
      let m = this.overdueApplyForm2
      this.subparams = [{
        overdays: m.overdays,
        currentPeriod: m.currentPeriod,
        receivePenalty: m.receivePenalty,
        receiveInterest: m.receiveInterest,
        receivePenaltyInterest: m.receivePenaltyInterest,
        shouldCapi:m.shouldCapi,
        shouldInte:m.shouldInte,
        shouldAmt:m.shouldAmt,
        subInterest:m.subInterest,
        subPenalty:m.subPenalty,
        reduction:m.reduction,
        shInterest: m.shInterest,
        shPenalty: m.shPenalty,
        shshouldAmt: m.shshouldAmt,
        shreduction: m.shreduction,
      }];
      let data = {
        loanId:this.reductionApplyOne.loanId,
        applyId:this.imageModel.applyId,
        applyType:this.overdueApplyForm2.applyType,
        repaymentMoney:this.overdueApplyForm2.repaymentMoney,
        subDate:this.overdueApplyForm2.subDate,
        applicationDesc:this.overdueApplyForm2.applicationDesc,
        subparams:this.subparams
      }
       this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("此操作将提交减免申请, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              createDataJson( "/after/subapply/subapply.do ",data).then(
                response => {
                var result = response.data;
                if (result.success) {
                  this.$message({
                    message: result.msg,
                    type: "success"
                  });
                  this.$refs["overdueImg"].clearFiles();
                  this.$refs['overdueApplyForm'].resetFields();
                  this.$refs['overdueApplyForm2'].resetFields();
                  this.repayFlag = false;
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
                message: "已取消减免申请！"
              });
            });
        } else {
          this.$message({
            message: "请检查表单数据！！",
            type: "warning"
          });
          return false;
        }
      });
    },
     //上传影像资料成功
    handleSuccess(response, file, fileList) {
      if (response.success) {
        this.$notify({
          title: "提示",
          message: file.name + response.msg,
          type: "success"
        });
        this.overdueApplyForm2.applyId = response.data.applyId;
        this.imageModel = {
          applyType:'C1',
          applyId: response.data.applyId,
          imageType: 'overdueSingle',
          imageId: response.data.imageId,
          diskPath: response.data.diskPath ||""
        };
      } else {
        (file.status = "fail"),
          this.$notify.error({
            title: "提示",
            message: file.name + response.msg
          });
      }
    },
    //上传印象资料失败
    handleError(response, file, fileList) {
      this.$message({
        message: file.name + "上传失败",
        type: "warning"
      });
    },
    //影像资料预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgdialogVisible = true;
    },
    //删除影像资料
    handleRemove(file, fileList) {
      this.delImgModel = file.response.data;
      fetchData("/after/upload/deleteImage.do", this.delImgModel
      ).then(response => {
        var result = response.data;
        if (result.success) {
          this.$message({
            message: result.msg,
            type: "success"
          });
          this.imageModel = {
            applyType: "C1",
            applyId: "",
            imageType: "overdueSingle",
            imageId: "",
            diskPath: ""
          }
          console.log(this.imageModel);
        } else {
          this.$message({
            message: result.msg,
            type: "warning"
          });
        }
      });
    }
  }
}
</script>
<style scoped>
  /* 减免申请 */
.overdue-box {
  margin: 10px 0;
  padding: 5px 10px;
  border-color: #fff;
}
.overdue-box legend {
  font-size: 16px;
  color: #409EFF;
}
.overdue-table-box {
  margin: 5px;
}
.overdue-info {
  padding: 10px;
  padding-left: 20px;
}
.overdue-upload-box {
  margin-top: 20px;
}
.overdue-desc {
  width: 100%;
}
</style>
