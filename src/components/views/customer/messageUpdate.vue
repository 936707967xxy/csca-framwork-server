<!--
	Created by yangfei on 2018/04/23.
    信息变更申请
-->
<template>
  <div>
    <el-dialog title="信息变更申请登记单" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
             :visible.sync="dialogDetailForm" :lock-scroll='true' width="65%" :show-close='false' :close-on-click-modal='false'>

			<el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
				<el-tab-pane label="手机号码" name="telChange">
					<el-form :rules="rules" ref="bankForm" :model="applyModel" class="small-space"  label-position="right" label-width="150px" size="mini" >
            <fieldset style="border-color: #fff;">
              <legend style="color: #409EFF;">客户信息:</legend>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="姓名:">
                      <el-input v-model="applyModel.castName" :readonly='true'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="客户id:">
                      <el-input v-model="applyModel.custId" :readonly='true'></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </fieldset>
            <fieldset style="border-color: #fff;">
              <legend style="color: #409EFF;">手机信息:</legend>
              <el-row>
                <el-col :span="10">
                    <el-form-item label="原手机号码:">
                      <el-input v-model="applyModel.oldTel" :readonly='true'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="新手机号:"  prop="newTel">
                      <el-input v-model="applyModel.newTel" placeholder="新手机号" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="备注:">
                    <el-input v-model="applyModel.applicationDesc" type="textarea"></el-input>
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
				<el-tab-pane label="银行卡号" name="bankChange">
					<el-form class="small-space" :model="applyModel" label-position="right" label-width="150px" size="mini"  :rules="rules" ref="phoneForm">
            <fieldset style="border-color: #fff;">
              <legend style="color: #409EFF;">客户信息:</legend>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="姓名:">
                      <el-input v-model="applyModel.castName" :readonly='true'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="客户id:">
                      <el-input v-model="applyModel.custId" :readonly='true'></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </fieldset>
            <fieldset style="border-color: #fff;">
              <legend style="color: #409EFF;">银行卡信息:</legend>
              <el-row>
                <el-col :span="10">
                    <el-form-item label="原开户行名称:">
                      <el-input v-model="applyModel.oldBank" :readonly='true'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="原账户姓名:">
                      <el-input v-model="applyModel.castName" :readonly='true'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="原账户账号:">
                      <el-input v-model="applyModel.oldBankAccount" :readonly='true'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="原预留手机号:">
                      <el-input v-model="applyModel.oldBankPhone" :readonly='true'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="新开户行名称:"  prop="newBankCode">
                      <el-select v-model="applyModel.newBankCode" placeholder="请选择">
                        <el-option label="工商银行" value="ICBC"></el-option>
                        <el-option label="农业银行" value="ABC" ></el-option>
                        <el-option label="中国银行" value="BOC" ></el-option>
                        <el-option label="建设银行" value="CCB" ></el-option>
                        <el-option label="民生银行" value="CMBC" ></el-option>
                        <el-option label="交通银行" value="BCOM" ></el-option>
                        <el-option label="光大银行" value="CEB" ></el-option>
                        <el-option label="广发银行" value="GDB" ></el-option>
                        <el-option label="兴业银行" value="CIB" ></el-option>
                        <el-option label="平安银行" value="PAB" ></el-option>
                        <el-option label="浦发银行" value="SPDB" ></el-option>
                        <el-option label="上海银行" value="SHB" ></el-option>
                        <el-option label="邮政储蓄" value="PSBC" ></el-option>
                        <el-option label="中信银行" value="CITIC" ></el-option>
                        <el-option label="招商银行" value="CMB" ></el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="新银行卡号:"  prop="newBankAccount">
                      <el-input v-model="applyModel.newBankAccount" placeholder="新银行卡号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="新预留手机号:"  prop="newBankPhone">
                      <el-input v-model="applyModel.newBankPhone" placeholder="新预留手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="备注:">
                    <el-input v-model="applyModel.applicationDesc" type='textarea'></el-input>
                  </el-form-item>
                </el-col>
               <el-col :span="10">
                    <el-form-item label="上传身份证信息:">
                      <el-upload
                        ref="idCardImg"
                        action="/after/upload/uploadImage.do"
                        :data="idCardModel"
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
                <el-col :span="10">
                    <el-form-item label="上传银行卡信息:">
                      <el-upload
                        ref="bankCardImg"
                        action="/after/upload/uploadImage.do"
                        :data="bankCardModel"
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
            <div class="dialog-footer-box">
              <el-button @click="cancel('phoneForm')" size="mini">取 消</el-button>
              <el-button type="primary"  @click="submitForm('phoneForm')" size="mini">提交</el-button>
            </div>
					</el-form>
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
      activeName: "telChange",
      applyModel: {
        //手机号
        applyId: "",
        applyType: "", //申请类型
        custId: "",
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
        applicationDesc: "" //申请备注
      },
      rules: {
        newTel: [
          { required: true, message: '请输入新手机号', trigger: 'blur' },
          {
            pattern: /^1[345789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        newBankCode: [
          { required: true, message: '请输入新开户行名称', trigger: 'change' }
        ],
        newBankAccount: [
          { required: true, message: '请输入新账户', trigger: 'blur' }
        ],
        newBankPhone: [
          { required: true, message: '请输入新预留手机号', trigger: 'blur' },
          {
            pattern: /^1[345789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
      },
      idCardModel: {
        applyType: "A1",
        applyId: "",
        imageType: "bankChange",
        imageId: "",
        diskPath: ""
      },
      bankCardModel: {
        applyType: "B1",
        applyId: "",
        imageType: "bankChange",
        imageId: "",
        diskPath: ""
      },
      delImgModel: {
        applyId: "",
        Id: "",
        diskPath: ""
      },
      dialogImageUrl: ""
    };
  },
  props: {
    messageUpdateForm: {
      loanId: String, //进件编号
      castName: String, //客户姓名
      castId: String //客户姓名
    }
  },
  methods: {
    show() {
      this.dialogDetailForm = true;
      this.applyModel.applyType = this.activeName;
      this.applyModel.custId = this.messageUpdateForm.castId;
      this.applyModel.castName = this.messageUpdateForm.castName;
      this.getData();
    },
    getData() {
      let data = {
        loanId: this.messageUpdateForm.loanId
      };
      fetchData("/after/messageupdate/banklist.do", data).then(response => {
        this.applyModel.oldTel = response.data.tel;
        this.applyModel.oldBank = response.data.bank;
        this.applyModel.oldBankPhone = response.data.bankPhone;
        this.applyModel.oldBankAccount = response.data.bankAccount;
        this.applyModel.oldBankCode = response.data.bankCode;
        this.applyModel.sex = response.data.sex;
        this.loading = false;
      });
    },
    tabClick(tab) {
      this.applyModel.applyType = tab.name;
    },
    // 取消
    cancel(formName) {
      this.$refs["idCardImg"].clearFiles();
      this.$refs["bankCardImg"].clearFiles();
      this.$refs[formName].resetFields();
      this.dialogDetailForm = false;
      this.$emit("init");
    },
    getStatus(status){
      let str = "";
        switch (status) {
          case 'ICBC':
                str = "工商银行";
                break;
            case 'ABC':
                str = "农业银行";
                break;
            case 'BOC':
                str = "中国银行";
                break;
            case 'CCB':
                str = "建设银行";
                break;
            case 'CMBC':
                str = "民生银行";
                break;
            case 'BCOM':
                str = "交通银行";
                break;
            case 'CEB':
                str = "光大银行";
                break;
            case 'GDB':
                str = "广发银行";
                break;
            case 'CIB':
                str = "兴业银行";
                break;
            case 'PAB':
                str = "平安银行";
                break;
            case 'SPDB':
                str = "浦发银行";
                break;
            case 'SHB':
                str = "上海银行";
                break;
            case 'PSBC':
                str = "邮政储蓄";
                break;
            case 'CITIC':
                str = "中信银行";
                break;
            case 'CMB':
                str = "招商银行";
                break;
            default:
                str = "";
        }
        return str;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.applyModel.newBank = this.getStatus(this.applyModel.newBankCode);
          this.onSubmit();
        } else {
          return false;
        }
      });
    },
    onSubmit() {
      fetchData("/after/messageupdate/changeinfoupdate.do", this.applyModel).then(
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
    //上传影像资料成功
    handleSuccess(response, file, fileList) {
      if (response.success) {
        this.$notify({
          title: "提示",
          message: file.name + response.msg,
          type: "success"
        });
        this.applyModel.applyId = response.data.applyId;
        this.idCardModel = {
          applyType:'A1',
          applyId: response.data.applyId,
          imageType: response.data.imageType,
          imageId: response.data.imageId,
          diskPath: response.data.diskPath ||""
        };
        this.bankCardModel = {
          applyType: 'B1',
          applyId: response.data.applyId,
          imageType: response.data.imageType,
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
      console.log(file);
      this.dialogImageUrl = file.url;
      this.imgdialogVisible = true;
    },
    //删除影像资料
    handleRemove(file, fileList) {
      this.delImgModel = file.response.data;
      fetchData(
        "/after/changeInfo/deleteimageassortments.do",
        this.delImgModel
      ).then(response => {
        var result = response.data;
        if (result.success) {
          this.$message({
            message: result.msg,
            type: "success"
          });
        } else {
          this.$message({
            message: result.msg,
            type: "warning"
          });
        }
      });
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
.dialog-footer-box {
  float: right;
  padding: 10px;
}
</style>


