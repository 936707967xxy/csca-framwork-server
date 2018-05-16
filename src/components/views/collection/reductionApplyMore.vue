<!--
	Created by yangfei on 2018/4/28.
    多月减免申请
-->
<template>
  <div>
    <el-dialog class="wrap-box" title="多月减免申请" :visible.sync="dialogDetailForm" width="80%" :show-close='false' :close-on-press-escape='false' :close-on-click-modal='false'>
      <fieldset class="overdue-box">
        <legend>客户基本信息:</legend>
        <el-row :gutter="20">
            <el-col :span="8"><div class="overdue-info">客户姓名：{{custInfo.castName}}</div></el-col>
            <el-col :span="8"><div class="overdue-info">合同编号：{{custInfo.conNo}}</div></el-col>
            <el-col :span="8"><div class="overdue-info">总逾期数：{{overdueSum}}</div></el-col>
        </el-row>
      </fieldset>
        <div class="overdue-div">
          <legend>减免申请单信息:</legend>
          <div class="overdue-table-box">
            <h4>逾期列表:</h4>
            <el-table :data="overdueApplyList" :stripe="true" show-summary border cell-class-name="cell-class" class="overdue-table">
              <el-table-column prop="overdueNum" label="逾期期次" align="center" fixed>
                <template slot-scope="props">
                    <span>第{{props.row.overdueNum}}期</span>
                </template>
              </el-table-column>
              <el-table-column prop="overdueDays" label="逾期天数" align="center"></el-table-column>
              <el-table-column prop="receivePenalty" label="应收违约金" align="center" min-width="100"></el-table-column>
              <el-table-column prop="receiveInterest" label="应收罚息" align="center" ></el-table-column>
              <el-table-column prop="receivePenaltyInterest" label="应收违罚金" align="center" min-width="100"></el-table-column>
              <el-table-column prop="receiveCorpus" label="应还本金" align="center" ></el-table-column>
              <el-table-column prop="receiveShouldinte" label="应还利息" align="center" ></el-table-column>
              <el-table-column prop="amt" label="月还款额" align="center" ></el-table-column>
              <el-table-column prop="receiveMoney" label="应收总额" align="center" ></el-table-column>
              <el-table-column prop="createTime" label="申请日期" align="center" min-width="170"></el-table-column>
            </el-table>
          </div>

          <div v-show="repaymentMoneyFlag" class="overdue-table-box">
            <h4>实收逾期列表:</h4>
            <el-table :data="overdueApplyList2" :stripe="true" show-summary border cell-class-name="cell-class" class="overdue-table">
              <el-table-column prop="currentPeriod" label="逾期期次" align="center" fixed>
                <template slot-scope="props">
                    <span>第{{props.row.currentPeriod}}期</span>
                </template>
              </el-table-column>
              <el-table-column prop="overdays" label="逾期天数" align="center" ></el-table-column>
              <el-table-column prop="receivePenalty" label="应收违约金" align="center" min-width="100"></el-table-column>
              <el-table-column prop="receiveInterest" label="应收罚息" align="center" ></el-table-column>
              <el-table-column prop="receivePenaltyInterest" label="应收违罚金" align="center" min-width="100"></el-table-column>
              <el-table-column prop="shouldCapi" label="应收本金" align="center" ></el-table-column>
              <el-table-column prop="shouldInte" label="应收利息" align="center" ></el-table-column>
              <el-table-column prop="shouldAmt" label="应收月还" align="center" ></el-table-column>
              <el-table-column prop="receiveMoney" label="应收总额" align="center" ></el-table-column>
              <el-table-column prop="subInterest" label="减免违约金" align="center" min-width="100"></el-table-column>
              <el-table-column prop="subPenalty" label="减免罚息" align="center" ></el-table-column>
              <el-table-column prop="reduction" label="减免总额" align="center" ></el-table-column>
              <el-table-column prop="shInterest" label="实还违约金" align="center" min-width="100"></el-table-column>
              <el-table-column prop="shPenalty" label="实还罚息" align="center" ></el-table-column>
              <el-table-column prop="shshouldAmt" label="实还月还" align="center" ></el-table-column>
              <el-table-column prop="SSmoney" label=" 实还总违罚金" align="center" min-width="120"></el-table-column>
              <el-table-column prop="shreduction" label=" 实还总额" align="center" ></el-table-column>
            </el-table>
          </div>
        </div>

      <el-form label-position="right" label-width="100px" :model="overdueApplyForm2" :rules="rule" ref="overdueApplyForm2">
        <fieldset class="overdue-box">
          <legend style="color: #409EFF;">金额:</legend>
            <el-row :gutter="22">
							<el-col :span="8">
                <el-form-item label="实还金额:" prop="repaymentMoney">
                  <el-input v-model="overdueApplyForm2.repaymentMoney" type='text' placeholder="输入实还金额"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实还日期:" prop="subDate">
                  <el-date-picker v-model="overdueApplyForm2.subDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  placeholder="选择日期" size="small" :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item >
                  <el-button type="primary" @click="repaymentMoneyClick('overdueApplyForm2')" size="small">计算金额</el-button>
                </el-form-item>
              </el-col>
          </el-row>
        </fieldset>
        <fieldset class="overdue-box" v-show="repaymentMoneyFlag">
          <legend>备注:</legend>
          <el-row>
            <el-col :span="16">
              <el-form-item class="overdue-desc" label="备注:" prop="applicationDesc">
                <el-input v-model="overdueApplyForm2.applicationDesc" type='textarea'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset class="overdue-box" v-show="repaymentMoneyFlag">
          <legend style="color: #409EFF;">上传影像资料:</legend>
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
        </fieldset>
      </el-form>
      <el-row>
        <el-col :span="20" style="padding-top: 10px;">
          <div style="float: right;">
            <el-button @click="cancel('overdueApplyForm2')" size="mini">取 消</el-button>
            <el-button type="primary" @click="onSubmit('overdueApplyForm2')" size="mini">提交</el-button>
          </div>
        </el-col>
      </el-row>
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
      repaymentMoneyFlag:false,//实还金额列表
      imgdialogVisible:false,//图片预览
      pickerOptions: {//限制日期
        disabledDate(time) {
          return time.getTime() < (Date.now()-86400000);
        },
      },
      overdueApplyList: [],//应还逾期列表
      overdueApplyList2: [],//实还逾期列表
      overdueApplyForm2:{
        loanId: "",
        applyId:"",//图片
        applyType:"overdueAll",//类型
        repaymentMoney:"",//实还金额
        subDate:"",//是换日期
        applicationDesc:"",//备注
      },
      custInfo:{},//客户信息
      overdueSum:"",//总逾期数
      overdueSumMoney:"",//应还总额

      subparams:[],
      imageModel: {
        applyType: "C1",
        applyId: "",
        imageType: "overdueAll",
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
    reductionApplyMore:{
      loanId: String, //进件编号
      castName:String,
      conNo:String,
    }
  },
  methods:{
    show(){
      this.dialogDetailForm = true;
      this.getData();
    },
    getData() {
      let data = {
        loanId:this.reductionApplyMore.loanId
      }
      fetchData("/after/allsubapply/alloverdue.do", data).then(
        response => {
          this.custInfo = this.reductionApplyMore;
          this.overdueApplyList = response.data;
          this.overdueSum = response.data.length;
          var sum = 0;
          for(var i=0;i<this.overdueSum;i++) {
            sum += parseFloat(this.overdueApplyList[i].receiveMoney);
          }
          this.overdueSumMoney = sum;
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
            loanId:this.reductionApplyMore.loanId,
            repaymentMoney:this.overdueApplyForm2.repaymentMoney,
            subDate:this.overdueApplyForm2.subDate,
          }
          fetchData("/after/allsubapply/allreductionmoney.do", data).then(
            response => {
              if (!response.data.success) {
                this.$message({
                  message:response.data.msg,
                  type: "warning"
                });
                return;
              }else if(response.data.success) {
                this.overdueApplyList2 = response.data.data;
                this.repaymentMoneyFlag = true;
              }
            });
        } else {
          return false;
        }
      });
    },
    //计算
    // calculation(f, digit) {
    //   var m = Math.pow(10, digit);
    //   return parseInt(f * m, 10) / m;
    // },
    // 减免申请取消
    cancel(formName) {
      this.$refs["overdueImg"].clearFiles();
      this.$refs[formName].resetFields();
      this.repaymentMoneyFlag = false;
      this.dialogDetailForm = false;
      this.$emit('init');
    },
    // 减免申请2 提交
    onSubmit(formName) {
      let data = {
        loanId:this.reductionApplyMore.loanId,
        applyId:this.imageModel.applyId,
        applyType:this.overdueApplyForm2.applyType,
        repaymentMoney:this.overdueApplyForm2.repaymentMoney,
        subDate:this.overdueApplyForm2.subDate,
        applicationDesc:this.overdueApplyForm2.applicationDesc,
        subparams:this.overdueApplyList2
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
                this.loading = false;
                var result = response.data;
                if (result.success) {
                  this.$message({
                    message: result.msg,
                    type: "success"
                  });
                  this.$refs[formName].resetFields();
                  this.$refs["overdueImg"].clearFiles();
                  this.repaymentMoneyFlag = false;
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
          imageType: 'overdueAll',
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
            imageType: "overdueAll",
            imageId: "",
            diskPath: ""
          }
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
  /* width: 100%; */
  margin: 10px 0;
  padding: 5px 10px;
  border-color: #fff;
}
.overdue-box legend,
legend {
  font-size: 16px;
  color: #409EFF;
}
.overdue-table-box {
  margin: 5px;
}
.overdue-table {
  width: 100%;
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
.overdue-div {
  position: relative;
  padding-top: 15px;
  border:1px solid #a6a6a6;
  margin-top: 15px;
}
.overdue-div legend {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
}
</style>
