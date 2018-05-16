<!--
	Created by yangfei on 2018/05/03.
    外访申请
-->
<template>
  <!-- <div> -->
    <el-dialog title="外访申请登记单" v-loading="loadingOut" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
             :visible.sync="dialogDetailForm" :lock-scroll='true' width="65%" :show-close='false' :close-on-click-modal='false'>
      <el-form :rules="rules" ref="outBoundForm" :model="applyModel" class="small-space"  label-position="right" label-width="150px" size="mini" >
        <fieldset class="fieldset-box">
          <legend>客户信息:</legend>
            <el-row>
              <el-col :span="10">
                <el-form-item label="姓名:" prop="castName">
                  <el-input v-model="applyModel.castName" :readonly='true'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="进件编号:" prop="loanId">
                  <el-input v-model="applyModel.loanId" :readonly='true'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="合同编号:" prop="conNo">
                  <el-input v-model="applyModel.conNo" :readonly='true'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="身份证:" prop="cardNo">
                  <el-input v-model="applyModel.cardNo" :readonly='true'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
        </fieldset>
        <fieldset class="fieldset-box">
          <legend>外访申请:</legend>
          <el-row>
            <el-col :span="10">
              <el-form-item label="催收状态:" prop="overdueStatus" >
                <el-select v-model="applyModel.overdueStatus" placeholder="请选择" size="small">
                  <el-option label="失联" value="失联"></el-option>
                  <el-option label="可联" value="可联" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="建议上门时间:" prop="outboundDate">
                <el-date-picker v-model="applyModel.outboundDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                placeholder="选择日期" size="small" :picker-options="pickerOptions"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="外访地址:" prop="outboundAddress">
                <el-input v-model="applyModel.outboundAddress" placeholder="外访地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="催收详情:" prop="overdueDesc">
                <el-input v-model="applyModel.overdueDesc" placeholder="催收详情" type="textarea"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="申请备注:" prop="applyDesc">
                <el-input v-model="applyModel.applyDesc" placeholder="申请备注" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('outBoundForm')" size="mini">取 消</el-button>
        <el-button type="primary"  @click="onSubmit('outBoundForm')" size="mini">提交</el-button>
      </div>
    </el-dialog>
  <!-- </div> -->
</template>

<script>
import { fetchData } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";
import { formatIdCard, formatPhone } from "@/utils/InfoFormat.js";

export default {
  data() {
    return {
      loadingOut:true,
      dialogDetailForm: false,
      pickerOptions: {//限制日期
        disabledDate(time) {
          return time.getTime() < (Date.now()-86400000);
        },
      },
      applyModel: {
        applyId: "",// 申请单号
        applyType: "outBound", //申请类型
        loanId: "", //进件编号
        conNo: "", //合同编号
        castName: "", //客戶姓名
        cardNo: "", //身份证
        outboundAddress: "", //申请地址
        overdueStatus: "", //催收状态
        outboundDate: "", //建议上门时间
        overdueDesc: "", //催收详情
        applyDesc: "", //申请备注

      },
      rules: {
        overdueStatus: [{ required: true, message: '请选择状态', trigger: 'change'}],
        outboundDate: [{ required: true, message: '请选择日期', trigger: 'change'}],
        outboundAddress: [{ required: true, message: '请输入外访地址', trigger: 'blur'}],
        overdueDesc: [{ required: true, message: '请输入详情', trigger: 'blur'}],
      },
    };
  },
  props: {
    outboundApplyForm: {
      loanId: String, //进件编号
      castName: String, //客户姓名
      conNo: String, //客户姓名
      cardNo: String //身份证
    }
  },
  methods: {
    show() {
      this.dialogDetailForm = true;
      this.applyModel.loanId = this.outboundApplyForm.loanId;
      this.applyModel.conNo = this.outboundApplyForm.conNo;
      this.applyModel.castName = this.outboundApplyForm.castName;
      this.applyModel.cardNo = this.outboundApplyForm.cardNo;
    },
    // 取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogDetailForm = false;
      this.$emit("init");
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否提交外访申请?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              fetchData("/after/outbound/outboundapply.do", this.applyModel).then(
                response => {
                  var result = response.data;
                  if (result.success) {
                    this.$message({
                      message: result.msg,
                      type: "success",
                      duration: 5000,
                    });
                    this.$refs[formName].resetFields();
                    this.dialogDetailForm = false;
                    this.$emit("init");
                  } else {
                    this.$message({
                      message: result.msg,
                      type: "warning",
                      duration: 5000
                    });
                  }
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消外访申请！"
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

.dialog-footer-box {
  /* float: right; */
  padding: 10px;
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
</style>


