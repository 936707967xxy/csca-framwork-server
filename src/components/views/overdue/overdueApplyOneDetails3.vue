<!--
	Created by yangfei on 2018/04/27.
    减免申请记录详情
-->
<template>
  <div>
    <el-dialog title="逾期单月减免审批" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
              :visible.sync="dialogDetailForm" :lock-scroll='true' width="80%" :show-close='false' :close-on-click-modal='false'>
      <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="单月减免申请单" name="overdueSingle">
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

          <el-form :model="overdueApplyForm2" ref="overdueApplyForm2" label-position="right" label-width="120px" size="small">
            <fieldset class="overdue-box">
              <legend>实际减免信息:</legend>
              <el-row>
                <el-col :span="8">
                    <el-form-item label="减免总额:" prop="subSum">
                      <el-input v-model="overdueApplyForm2.subSum" type='text' readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="减免失效时间:" prop="subDate">
                      <el-input v-model="overdueApplyForm2.subDate" type='text' readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="减免期数:" prop="subStream">
                    <el-input v-model="overdueApplyForm2.subStream" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="减免罚息:" prop="subPenalty">
                    <el-input v-model="overdueApplyForm2.subPenalty" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="减免违约金:" prop="subInterest">
                    <el-input v-model="overdueApplyForm2.subInterest" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="减免本金:" prop="subCorpus">
                    <el-input v-model="overdueApplyForm2.subCorpus" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="减免利息:" prop="subShouldinte">
                    <el-input v-model="overdueApplyForm2.subShouldinte" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实还违约金:" prop="shPenalty">
                    <el-input v-model="overdueApplyForm2.shPenalty" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实还罚息:" prop="shInterest">
                    <el-input v-model="overdueApplyForm2.shInterest" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实还本金:" prop="shCorpus">
                    <el-input v-model="overdueApplyForm2.shCorpus" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实还利息:" prop="shShouldinte">
                    <el-input v-model="overdueApplyForm2.shShouldinte" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实还总额:" prop="shSum">
                    <el-input v-model="overdueApplyForm2.shSum" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建日期:" prop="createTime">
                    <el-input v-model="overdueApplyForm2.createTime" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </fieldset>
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
            <div class="dialog-footer-box">
              <el-button type="primary" @click="cancel" size="mini">取 消</el-button>
            </div>
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
            <el-button type="primary" @click="cancel" size="mini">取 消</el-button>
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
import { fetchData } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";
import { formatIdCard, formatPhone } from "@/utils/InfoFormat.js";

export default {
  data() {
    return {
      loading:false,
      dialogDetailForm: false,
      imgdialogVisible:false,//图片预览
      activeName: "overdueSingle",

      repayFlag:false,//实还总额
      applyStatus:"",//审批状态
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
        id:"",
        applyId:"",
        applyType:"",
        castName:"",
        conNo:"",
        loanId:"",
        shCorpus:"",
        shInterest:"",
        shPenalty:"",
        shShouldinte:"",
        shSum:"",
        subCorpus:"",
        subDate:"",
        subInterest:"",
        subPenalty:"",
        subShouldinte:"",
        subStatus:"",
        subStream:"",
        subSum:"",
        createTime:"",
        updateDate:"",
        // applicationDesc:"",//备注
        approveOpinion:"",
        approveDesc:""
      },
      apporoveModel:{
        applicationDesc:"",
        approveOpinion1:"",
        approveDesc1:"",
        approveOpinion2:"",
        approveDesc2:""
      },
      applyList:[],
      applyListLength:'',
      imageModel: {
        applyType: "overdueSingle",
        applyId: "",
        imageType: "C1",
        imageId: "",
        diskPath: ""
      },
      imgSrcModel : {},
      //图片预览路径
      previewScr : '',
      dialogImageUrl: "",
    };
  },
  props: {
    overdueApplyParams: {
      loanId: String, //进件单号
      applyId: String, //申请单号
      applyStatus: String, //申请状态
    }
  },
  methods: {
    show() {
      this.dialogDetailForm = true;
      this.applyStatus = this.overdueApplyParams.applyStatus;
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
      fetchData("/after/singelsubapply/minoverdue.do", data).then(response => {
        this.overdueApplyForm = response.data;
      });
      fetchData("/after/subapply/subapplylist.do", data1).then(response => {
        this.overdueApplyForm2 = response.data[0];
      });
      fetchData("/after/flow/apply.do", data1).then(response => {
        this.applyListLength = response.data.length;
        this.applyList = response.data;
      });
    },
    tabClick(tab) {

    },
    // 取消
    cancel() {
      this.$refs['overdueApplyForm'].resetFields();
      this.$refs['overdueApplyForm2'].resetFields();
      this.dialogDetailForm = false;
      this.$emit("init");
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
.overdue-box legend {
  color: #409eff;
}
</style>



