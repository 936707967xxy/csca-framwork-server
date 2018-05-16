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

          <el-form label-position="right" label-width="100px" :model="overdueApplyForm2" ref="overdueApplyForm2" size="small">

            <fieldset class="overdue-box" v-for="(i,index) in applyList" :key="i.id">
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
            </fieldset>
          </el-form>
          <el-row>
            <el-col :span="20" style="padding-top: 10px;">
              <div style="float: right;">
                <el-button type="primary" @click="cancel" size="mini">取 消</el-button>
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
            <el-button @click="cancel" type="primary" size="mini">取 消</el-button>
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
        approveOpinion:"1",
        approveDesc:"",
      },
      apporoveModel:{
        applicationDesc:"",
        approveOpinion1:"",
        approveDesc1:"",
      },
      applyList:[],
      applyListLength:'',
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
        this.applyListLength = response.data.length;
        this.applyList = response.data;
      });
    },
     tabClick(tab) {

    },
    // 减免申请取消
    cancel() {
      this.$refs['overdueApplyForm2'].resetFields();
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
          case '5':
              str = "结算审批";
              break;
          default:
              str = "";
        }
        return str;
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
.form-r-btn {
  margin-left: 30px;
}
.dialog-footer-box {
  float: right;
  padding: 10px;
}
.card-img-box {
  width: 100%;

}
.card-img-box img {
  display: block;
  width: 100%;
  height: 150px;
}
.overdue-box {
  margin: 10px 0;
  padding: 5px 10px;
  border-color: #fff;
}
.overdue-box legend,
legend {
  color: #409eff;
}
.overdue-table-box {
  margin: 5px;
}
.overdue-info {
  padding: 10px;
  padding-left: 20px;
}

</style>
