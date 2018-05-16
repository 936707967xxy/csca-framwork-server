<!--
	Created by yangfei on 2018/4/28.
    多月减免申请
-->
<template>
  <div>
    <el-dialog class="wrap-box" title="多月减免申请" :visible.sync="dialogDetailForm" width="80%" :show-close='false' :close-on-press-escape='false' :close-on-click-modal='false'>
      <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="多月减免申请单" name="overdueAll">
          <fieldset class="overdue-box">
            <legend>客户基本信息:</legend>
            <el-row :gutter="20">
                <el-col :span="8"><div class="overdue-info">客户姓名：{{overdueApplyParams.castName}}</div></el-col>
                <el-col :span="8"><div class="overdue-info">合同编号：{{overdueApplyParams.conNo}}</div></el-col>
            </el-row>
          </fieldset>
        <!-- <fieldset  class="overdue-box"> -->
          <div style="border:1px solid #a6a6a6;">
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

            <div class="overdue-table-box">
              <h4>实收逾期列表:</h4>
              <el-table :data="overdueApplyList2" :stripe="true" show-summary border cell-class-name="cell-class" class="overdue-table">
                <el-table-column prop="subStream" label="减免期数" align="center" ></el-table-column>
                <el-table-column prop="subDate" label="减免失效时间" align="center" min-width="170"></el-table-column>
                <el-table-column prop="subPenalty" label="减免罚息" align="center" ></el-table-column>
                <el-table-column prop="subInterest" label="减免违约金" align="center" min-width="100"></el-table-column>
                <el-table-column prop="subCorpus" label="减免本金" align="center" ></el-table-column>
                <el-table-column prop="subShouldinte" label="减免利息" align="center" ></el-table-column>
                <el-table-column prop="subSum" label="减免总额" align="center" ></el-table-column>
                <el-table-column prop="shInterest" label="实还违约金" align="center" min-width="100"></el-table-column>
                <el-table-column prop="shPenalty" label="实还罚息" align="center" ></el-table-column>
                <el-table-column prop="shCorpus" label="实还本金" align="center" ></el-table-column>
                <el-table-column prop="shShouldinte" label="实还利息" align="center" ></el-table-column>
                <el-table-column prop="shSum" label="实还总额" align="center" ></el-table-column>
                <el-table-column prop="createTime" label="申请日期" align="center" min-width="170"></el-table-column>
              </el-table>
            </div>
          </div>
        <!-- </fieldset> -->

          <el-form label-position="right" label-width="100px" :model="overdueApplyForm2" :rules="rule" ref="overdueApplyForm2" size="small">

            <fieldset class="overdue-box">
              <legend>备注:</legend>
              <el-row>
                <el-col :span="16">
                  <el-form-item class="overdue-desc" label="备注:" prop="applicationDesc">
                    <el-input v-model="apporoveModel.applicationDesc" type='textarea'></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </fieldset>
            <fieldset class="overdue-box">
              <legend>一级审批:</legend>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="审批意见:" prop="approveOpinion">
                    <el-select v-model="overdueApplyForm2.approveOpinion" placeholder="请选择" >
                      <el-option label="同意" value="0"></el-option>
                      <el-option label="拒绝" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item  label="审批备注:" prop="approveDesc">
                      <el-input v-model="overdueApplyForm2.approveDesc" type='textarea'></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
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
        </el-tab-pane>

        <el-tab-pane label="查阅影像资料" name="imgShow">
          <fieldset class="overdue-box">
            <legend>影像资料</legend>
            <el-row>
              <el-col :span="5" v-for="(i,index) in imgSrcModel" :key="i.id" :offset="index > 0 ? 1 : 0">
                <el-card>
                  <div class="card-img-box">
                    <img :src="i.imageUrl" @click="imgPreview(i.imageUrl)" />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </fieldset>
          <div class="dialog-footer-box">
            <el-button type="primary" @click="cancel('overdueApplyForm2')" size="mini">取 消</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      // repaymentMoneyFlag:false,//实还金额列表
      imgdialogVisible:false,//图片预览
      activeName: "overdueAll",
      overdueApplyList: [],//应还逾期列表
      overdueApplyList2: [],//实还逾期列表
      overdueApplyForm2:{
        loanId: "",
        applyId:"",//图片
        applyType:"overdueAll",//类型
        repaymentMoney:"",//实还金额
        subDate:"",//是换日期
        approveOpinion:"",
        approveDesc:"",
      },
      apporoveModel:{
        applicationDesc:"",
      },
      imgSrcModel:[],
      imageModel: {
        applyType: "overdueAll",
        applyId: "",
        imageType: "C1",
        imageId: "",
        diskPath: ""
      },
      delImgModel: {
        applyId: "",
        Id: "",
        diskPath: ""
      },
      dialogImageUrl: "",
      rule: {
        approveOpinion:[{ required: true, message: '请选择审批意见', trigger: 'change' }],
      },
    }
  },
  props:{
    overdueApplyParams:{
      loanId: String, //进件编号
      applyId:String,
      castName:String,
      conNo:String,
    }
  },
  methods:{
    show(){
      this.dialogDetailForm = true;
      this.getData();
      this.initImg();
    },
    getData() {
      let data = {
        loanId:this.overdueApplyParams.loanId
      }
      let data1 = {
        applyId: this.overdueApplyParams.applyId
      };
      this.custInfo = this.reductionApplyMore;
      fetchData("/after/allsubapply/alloverdue.do", data).then(response => {
        this.overdueApplyList = response.data;
      });
      fetchData("/after/subapply/subapplylist.do", data1).then(response => {
         this.overdueApplyList2 = response.data;
      });
      fetchData("/after/flow/apply.do", data1).then(response => {
        this.apporoveModel.applicationDesc = response.data[0].approveDesc;
      });
    },
     tabClick(tab) {

    },
    // 减免申请取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogDetailForm = false;
      this.$emit('init');
    },
    // 减免申请2 提交
    onSubmit(formName) {
      let data = {
        applyId:this.overdueApplyParams.applyId,
        applyType:this.overdueApplyForm2.applyType,
        approveOpinion:this.overdueApplyForm2.approveOpinion,
        approveDesc:this.overdueApplyForm2.approveDesc,
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("此操作将批准减免申请, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              fetchData("/after/subapply/saveSubapply1.do",data).then(
                response => {
                var result = response.data;
                if (result.success) {
                  this.$message({
                    message: result.msg,
                    type: "success"
                  });
                  this.$refs[formName].resetFields();
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
            message: "请检查表单数据！",
            type: "warning"
          });
          return false;
        }
      });
    },
     //初始化印象资料
    initImg(){
      let data = {
        applyId:this.overdueApplyParams.applyId
      }
      fetchData('/after/upload/previewImage.do', data).then(response => {
        this.imgSrcModel = response.data.data;;
      })
    },
    imgPreview(previewScr){
      this.dialogImageUrl = previewScr;
      this.imgdialogVisible = true;

    },
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
</style>
