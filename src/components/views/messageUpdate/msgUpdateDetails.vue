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
          <el-form :rules="rules" ref="bankForm" :model="applyModel" class="small-space"  label-position="right" label-width="150px" size="mini" >
            <fieldset style="border-color: #fff;">
              <legend style="color: #409EFF;">客户信息:</legend>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="姓名:" prop="castName">
                      <el-input v-model="applyModel.castName" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="客户id:" prop="custId">
                      <el-input v-model="applyModel.custId" readonly></el-input>
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
              <legend style="color: #409EFF;">手机信息:</legend>
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
                <el-col :span="20">
                  <el-form-item label="备注:" prop="applicationDesc">
                    <el-input v-model="applyModel1.applicationDesc" type="textarea" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </fieldset>
            <fieldset style="border-color: #fff;">
              <legend style="color: #409EFF;">一级审批:</legend>
              <el-row>
                <el-col :span="10">
                    <el-form-item label="审批意见:" prop="approveOpinion">
                      <el-select v-model="applyModel.approveOpinion" placeholder="请选择" >
                        <el-option label="同意" value="0"></el-option>
                        <el-option label="拒绝" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item  label="审批备注:" prop="approveDesc">
                      <el-input v-model="applyModel.approveDesc" type='textarea'></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </fieldset>
            <div class="dialog-footer-box">
              <el-button @click="cancel('bankForm')" size="mini">取 消</el-button>
              <el-button type="primary"  @click="submitForm('bankForm')" size="mini">提交</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="银行卡号" v-if="applyModel.applyType == 'bankChange'" name="bankChange">
          <el-form class="small-space" :model="applyModel" label-position="right" label-width="150px" size="mini"  :rules="rules" ref="phoneForm">
            <fieldset style="border-color: #fff;">
              <legend style="color: #409EFF;">客户信息:</legend>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="姓名:" prop="castName">
                      <el-input v-model="applyModel.castName" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="客户id:" prop="custId">
                      <el-input v-model="applyModel.custId" readonly></el-input>
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
              <legend style="color: #409EFF;">银行卡信息:</legend>
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
                <el-col :span="20">
                  <el-form-item label="备注:" prop="applicationDesc">
                    <el-input v-model="applyModel1.applicationDesc" type='textarea' readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </fieldset>
            <fieldset style="border-color: #fff;">
              <legend style="color: #409EFF;">一级审批:</legend>
              <el-row>
                <el-col :span="10">
                    <el-form-item label="审批意见:" prop="approveOpinion" required>
                      <el-select v-model="applyModel.approveOpinion" placeholder="请选择" >
                        <el-option label="同意" value="0"></el-option>
                        <el-option label="拒绝" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item  label="审批备注:" prop="approveDesc">
                      <el-input v-model="applyModel.approveDesc" type='textarea'></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </fieldset>
            <div class="dialog-footer-box">
              <el-button @click="cancel('phoneForm')" size="mini">取 消</el-button>
              <el-button type="primary"  @click="submitForm('phoneForm')" size="mini">提交</el-button>
            </div>

          </el-form>
        </el-tab-pane>
        <el-tab-pane label="查阅影像资料" name="imgShow">
          <fieldset style="border-color: #fff;" v-for="(i,key) in imgSrcModel" :key="i.key">
            <legend style="color: #409EFF;">{{key=='A1'?'身份证':'银行卡'}}</legend>
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
        cardNo:"",
        sex: "",
        castName: "",
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
        // applicationDesc: "", //申请备注
        approveOpinion:"",
        approveDesc:""
      },
      applyModel1:{
        applicationDesc:""
      },
      rules: {
        approveOpinion:[{ required: true, message: '请选择审批意见', trigger: 'change' }],
      },
      imgSrcModel : {},
      //图片预览路径
      previewScr : '',
      dialogImageUrl: ""
    };
  },
  props: {
    messageUpdateForm: {
      applyId: String, //申请单号
      // cardNo: String,
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
        // this.applyModel.cardNo = this.messageUpdateForm.cardNo;
        this.activeName = this.applyModel.applyType;
        this.loading = false;
      });
      fetchData("/after/flow/apply.do", data).then(response => {
        this.applyModel1.applicationDesc = response.data[0].approveDesc;
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.onSubmit();
        } else {
          return false;
        }
      });
    },
    onSubmit() {
      let data = {
        applyType:this.applyModel.applyType,
        applyId:this.applyModel.applyId,
        approveDesc:this.applyModel.approveDesc,
        approveOpinion:this.applyModel.approveOpinion,
      }
      fetchData("/after/messageupdate/changeinfoupdate1.do", data).then(
        response => {
          var result = response.data;
          if (result.success) {
            this.$message({
              message: result.msg,
              type: "success"
            });
            this.dialogDetailForm = false;
            this.$emit("init");
          } else {
            this.$message({
              message: result.msg,
              type: "warning"
            });
          }
        }
      );
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
</style>


