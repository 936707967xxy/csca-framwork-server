<!--
	Created by yangfei on 2018/04/23.
    信息变更申请
-->
<template>
  <div>
    <el-dialog title="信息变更申请登记单" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
              :visible.sync="dialogDetailForm" :lock-scroll='true' width="65%" :show-close='false' :close-on-click-modal='false'>
      <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="手机号码" v-if="applyModel.applyType == 'telChange'" name="telChange">
          <el-form ref="bankForm" :model="applyModel"  label-position="right" label-width="150px" size="mini" >
            <fieldset class="overdue-box">
              <legend >客户信息:</legend>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="姓名:" prop="castName">
                      <el-input v-model="applyModel.castName" :readonly='true'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="客户id:" prop="custId">
                      <el-input v-model="applyModel.custId" :readonly='true'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="身份证:" prop="cardNo">
                      <el-input v-model="applyModel.cardNo" :readonly='true'></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </fieldset>

            <fieldset class="overdue-box">
              <legend >手机信息:</legend>
              <el-row>
                <el-col :span="10">
                    <el-form-item label="原手机号码:" prop="oldTel">
                      <el-input v-model="applyModel.oldTel" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="新手机号:"  prop="newTel">
                      <el-input v-model="applyModel.newTel" placeholder="新手机号" readonly></el-input>
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

            <div class="dialog-footer-box">
              <el-button @click="cancel('bankForm')" size="mini">取 消</el-button>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="银行卡号" v-if="applyModel.applyType == 'bankChange'" name="bankChange">
          <el-form class="small-space" :model="applyModel" label-position="right" label-width="150px" size="mini" ref="phoneForm">
            <fieldset class="overdue-box">
              <legend >客户信息:</legend>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="姓名:" prop="castName">
                      <el-input v-model="applyModel.castName" :readonly='true'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="客户id:" prop="custId">
                      <el-input v-model="applyModel.custId" :readonly='true'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="身份证:" prop="cardNo">
                      <el-input v-model="applyModel.cardNo" :readonly='true'></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </fieldset>

            <fieldset style="border-color: #fff;">
              <legend >银行卡信息:</legend>
              <el-row>
                <el-col :span="10">
                    <el-form-item label="原开户行名称:" prop="oldBank">
                      <el-input v-model="applyModel.oldBank" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="原账户姓名:" prop="castName">
                      <el-input v-model="applyModel.castName" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="原账户账号:" prop="oldBankAccount">
                      <el-input v-model="applyModel.oldBankAccount" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="原预留手机号:" prop="oldBankPhone">
                      <el-input v-model="applyModel.oldBankPhone" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="新开户行名称:" prop="newBank">
                      <el-input v-model="applyModel.newBank" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="新银行卡号:" prop="newBankAccount">
                      <el-input v-model="applyModel.newBankAccount" placeholder="新银行卡号" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="新预留手机号:" prop="newBankPhone">
                      <el-input v-model="applyModel.newBankPhone" placeholder="新预留手机号" readonly></el-input>
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

            <div class="dialog-footer-box">
              <el-button @click="cancel('phoneForm')" size="mini">取 消</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="查阅影像资料" name="imgShow">
          <fieldset class="overdue-box" v-for="(i,key) in imgSrcModel" :key="i.key">
            <legend >{{key=='A1'?'身份证':'银行卡'}}</legend>
            <el-row>
              <el-col :span="8"v-for="(c,index) in i.list" :key="c.index" :offset="c > 0 ? 2 : 0">
                <el-card>
                  <div class="card-img-box">
                    <img :src="c.imageUrl" @click="imgPreview(c.imageUrl)" />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </fieldset>
          <div class="dialog-footer-box">
            <el-button @click="cancel1" size="mini">取 消</el-button>
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
      loading:true,
      dialogDetailForm: false,
      imgdialogVisible: false, //图片
      activeName: "",
      applyModel: {
        //手机号
        loanId: "",
        applyId: "",
        applyType: "", //申请类型
        custId: "",
        sex: "",
        castName: "",
        cardNo: "",
        oldTel: "",
        newTel: "",
        oldBank: "",
        oldBankPhone: "",
        oldBankAccount: "",
        oldBankCode: "",
        newBank: "",
        newBankPhone: "",
        newBankAccount: "",
        newBankCode: "",
        approveOpinion:"",
        approveDesc:""
      },
      applyList:[],
      imgSrcModel : {},
      //图片预览路径
      previewScr : '',
      dialogImageUrl: ""
    };
  },
  props: {
    messageUpdateForm: {
      applyId: String, //申请单号
    }
  },
  methods: {
    show() {
      this.dialogDetailForm = true;
      this.getData();
      this.initImg();
    },
    getData() {
      let data = {
        applyId: this.messageUpdateForm.applyId
      };
      fetchData("/after/messageupdate/changeinfo.do", data).then(response => {
        this.applyModel = response.data;
        this.activeName = this.applyModel.applyType;
        this.loading = false;
      });
      fetchData("/after/flow/apply.do", data).then(response => {
        this.applyList = response.data;
      });
    },
    tabClick(tab) {

    },
    // 取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogDetailForm = false;
      this.$emit("init");
    },
    cancel1() {
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
          default:
              str = "";
        }
        return str;
    },
    //初始化印象资料
    initImg(){
      let data = {
        applyId:this.messageUpdateForm.applyId
      }
      fetchData('/after/upload/previewImage.do', data).then(response => {
        let d = response.data.data;
        let obj = {};
        for (var i = 0; i < d.length; i++) {
            let applyType = d[i].applyType;
            obj[applyType] = obj[applyType] || {};
            obj[applyType].list = obj[applyType].list || [];
            obj[applyType].list.push(d[i]);
        }
          this.imgSrcModel = obj;
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
.dialog-footer-box {
  float: right;
  padding: 10px;
}
.card-img-box {
  width: 250px;
  height: 150px;

}
.card-img-box img {
  display: block;
  width: 100%;
}

.overdue-box {
  margin: 10px 0;
  padding: 5px 10px;
  border-color: #fff;
}
.overdue-box legend {
  /* font-size: 16px; */
  color: #409eff;
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
</style>


