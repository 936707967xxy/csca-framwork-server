<!--
	Created by yangfei on 2018/4/18.
    客服催收提醒
-->
<template>
  <div>
    <el-dialog title="客服催收提醒" :visible.sync="dialogDetail" width="70%" center :close-on-click-modal='false' :show-close="false">
      <el-form class="small-space" label-position="right" label-width="100px" size="mini" :model="castInfo" ref="castInfo">
        <div class="fieldset-box">
          <legend>客户信息:</legend>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名:" prop="castName">{{castInfo.castName}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别:" prop="sex">{{castInfo.sex}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号:" prop="cardNo">{{castInfo.cardNo}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话:" prop="tel">{{castInfo.tel}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位名称:" prop="unitName">{{castInfo.unitName}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位电话:" prop="unitTel">{{castInfo.unitTel}}</el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="单位地址:" prop="unitAddress">{{castInfo.unitAddress}}</el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="家庭住址:" prop="homeAddress">{{castInfo.homeAddress}}</el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="fieldset-box">
          <legend>案件详情:</legend>
          <el-row>
            <el-col :span="8">
              <el-form-item label="银行名称:" prop="bankName">{{castInfo.bankName}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号:" prop="bankAcount">{{castInfo.bankAcount}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品名称:" prop="productName">{{castInfo.productName}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款期次:" prop="loanPeriod">{{castInfo.loanPeriod}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="剩余期数:" prop="remainderPeriod">{{castInfo.remainderPeriod}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="放款日期:" prop="loanDate">{{castInfo.loanDate}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="放款金额:" prop="loanMoney">{{castInfo.loanMoney}}元</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账单日:" prop="statementDate">{{castInfo.statementDate}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应还金额:" prop="shouldAmt">{{castInfo.shouldAmt}}元</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="还款日:" prop="replaymentDate">{{castInfo.replaymentDate}}</el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div class="fieldset-box">
        <legend>客户逾期详细:</legend>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <div class="overdue-title">客户逾期详细</div>
            </template>
            <legend>逾期合计:</legend>
            <el-row>
              <el-col :span="10" class="form-left-margin">
                  <span>逾期总金额:</span>
                  <span style="color: red;">{{castInfo.overdueTotalAmt}}</span>
                  <span>元</span>
              </el-col>
              <el-col :span="10" class="form-left-margin">
                  <span>逾期总期数:</span>
                  <span style="color: red;">{{castInfo.overduePeriod}} </span>
                  <span>期</span>
              </el-col>
            </el-row>
            <el-table :data="overdueDetailsList" :stripe="true" border cell-class-name="cell-class" height="250" size="small" style="width:100%">
              <el-table-column prop="overdueNum" label="逾期期数" align="center" ></el-table-column>
              <el-table-column prop="overdueDays" label="逾期天数" align="center" ></el-table-column>
              <el-table-column prop="receivePenaltyInterest" label="应收违约金" align="center" ></el-table-column>
              <el-table-column prop="receiveInterest" label="应收罚息" align="center" ></el-table-column>
              <el-table-column prop="receivePenaltyInt" label="应收违罚金" align="center" ></el-table-column>
              <el-table-column prop="receiveMoney" label="应收总额" align="center" ></el-table-column>
              <el-table-column prop="receivedMoney" label="已收金额" align="center" ></el-table-column>
              <el-table-column prop="balanceMoney" label="结欠金额" align="center" ></el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="fieldset-box">
        <legend>外访历史记录:</legend>
        <el-table :data="visitRecordList" :stripe="true" border cell-class-name="cell-class" height="250" size="mini" style="width:100%">
              <el-table-column prop="castName" label="姓名" min-width="100" align="center"></el-table-column>
              <el-table-column prop="visitCreateTime" label="时间" min-width="180" align="center"></el-table-column>
              <el-table-column prop="visitCastAddress" label="地址" min-width="170" align="center"></el-table-column>
              <el-table-column prop="visitNote" label="详情" min-width="70" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="applyId" label="附件" min-width="70" align="center">
                <template slot-scope="props">
                  <el-button type="text" @click="initImg(props.row.applyId)" size="small">附件</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="collectionCastName" label="电催负责人" min-width="90" align="center"></el-table-column>
              <el-table-column prop="visitCastName" label="外访负责人" min-width="90" align="center"></el-table-column>
              <el-table-column prop="noteTaker" label="记录人" min-width="100" align="center"></el-table-column>
              <el-table-column prop="remarks" label="备注" min-width="100" align="center" show-overflow-tooltip></el-table-column>
            </el-table>
            <div v-if="imagesdialogVisible" class="fieldset-box" style="margin:15px 0;">
              <legend>影像资料</legend>
              <el-row>
                <el-col :span="6" v-for="(i,index) in imgSrcModel" :key="i.id" :offset="index > 0 ? 2 : 0">
                  <el-card>
                    <div class="card-img-box">
                      <img v-if="i.imageType=='D1'" :src="i.imageUrl" @click="imgPreview(i.imageUrl,i.imageType)"/>
                      <audio v-if="i.imageType=='MP3'" controls="controls" @click="imgPreview(i.imageUrl,i.imageType)">
                        <source :src="i.imageUrl" type="audio/mpeg">
                        您的浏览器不支持 audio 元素。
                      </audio>
                      <video v-if="i.imageType=='MP4'" width="100%" controls="controls" @click="imgPreview(i.imageUrl,i.imageType)">
                        <source :src="i.imageUrl" type="video/mp4">
                        您的浏览器不支持 video 元素。
                      </video>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
      </div>
      <div class="fieldset-box">
        <legend>催收历史记录:</legend>
        <el-table :data="collectingHistoryList" :stripe="true" border cell-class-name="cell-class" height="250" size="small" style="width:100%">
          <el-table-column prop="collectingDate" label="催收时间" min-width="120" align="center"></el-table-column>
          <el-table-column prop="collectingName" label="姓名" min-width="100" align="center"></el-table-column>
          <el-table-column prop="relationship" label="关系" min-width="70" align="center"></el-table-column>
          <el-table-column prop="receivingState" label="接听状态" min-width="70" align="center"></el-table-column>
          <el-table-column prop="remindingState" label="提醒状态" min-width="70" align="center"></el-table-column>
          <el-table-column prop="noMndingNum" label="未提醒天数" min-width="70" align="center"></el-table-column>
          <el-table-column prop="noteTaker" label="记录人" min-width="100" align="center"></el-table-column>
          <el-table-column prop="nextRemindingTime" label="下次提醒时间" min-width="120" align="center"></el-table-column>
          <el-table-column prop="remarks" label="备注" min-width="100" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <p class="legend-p">新增催收记录:</p>
        <el-form class="small-space" label-position="right" :model="addRemindModel" ref="addRemindModel" :rules="addRemindRules" label-width="150px" size="mini" style="width: 100%">
          <el-row>
            <el-col :span='7'>
              <el-form-item label="姓名:" prop="collectingName">
                <el-input v-model="addRemindModel.collectingName" type='text'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label="电话:" prop="collectingTel">
                <el-input v-model="addRemindModel.collectingTel" type='text'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label="关系:" prop="relationship">
                <el-select v-model="addRemindModel.relationship" placeholder="请选择">
                  <el-option label="本人" value="MS"></el-option>
                  <el-option label="配偶" value="SS"></el-option>
                  <el-option label="亲属" value="RE"></el-option>
                  <el-option label="朋友" value="FP"></el-option>
                  <el-option label="同事" value="CE"></el-option>
                  <el-option label="其他" value="OS"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label="接听状态:" prop="receivingState">
                <el-select v-model="addRemindModel.receivingState" placeholder="请选择">
                  <el-option label="已接听" value="HBA"></el-option>
                  <el-option label="无人接听" value="NA"></el-option>
                  <el-option label="关机" value="SD"></el-option>
                  <el-option label="空号" value="EP"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label="下次提醒时间:" prop="nextRemindingTime">
                <el-date-picker v-model="addRemindModel.nextRemindingTime" type="datetime" :editable="false" format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" size="small" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="21">
              <el-form-item label="备注:" prop="remarks">
                <el-input v-model="addRemindModel.remarks" type='textarea'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="add-btn-box">
              <el-button @click="clearRemind('addRemindModel')" size="mini">重置</el-button>
              <el-button type="primary" @click="addReminderSubmit('addRemindModel')" size="mini">提交</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="fieldset-box">
        <legend>通话详单:</legend>
          <el-table :stripe="true" :data="callDetailsList" border style="width: 100%" cell-class-name="cell-class" height="250" size="mini">
            <el-table-column prop="collectingName" label="姓名" min-width="90" align="center"></el-table-column>
            <el-table-column prop="relationship" label="关系" min-width="55" align="center"></el-table-column>
            <el-table-column prop="collectingTel" label="电话" min-width="105" align="center"></el-table-column>
          </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFun" size="small">关 闭</el-button>
      </div>
    </el-dialog>
     <!-- 图片预览 -->
    <el-dialog :visible.sync="imgdialogVisible" size="tiny">
      <img v-if="upType=='D1'" width="100%" :src="dialogImageUrl" alt="">
      <audio v-if="upType=='MP3'" width="100%" controls="controls">
        <source :src="dialogImageUrl" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
      </audio>
      <video v-if="upType=='MP4'" width="100%" controls="controls">
        <source :src="dialogImageUrl" type="video/mp4">
        您的浏览器不支持 video 元素。
      </video>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from "@/apis/httpapis";
import { formatDate } from "@/utils/date";
import axios from "axios";

export default {
  data() {
    return {
      dialogDetail: false,
      formLabelWidth: "150px",
      imagesdialogVisible:false,
      imgdialogVisible: false, //图片
      castInfo: {
        castName: "", //客户姓名
        sex: "", //性别
        cardNo: "", //身份证号
        tel: "", //联系电话
        bankName: "", //银行名称
        bankAcount: "", //银行卡号
        homeAddress: "", //家庭住址
        unitName: "", //单位名称
        unitAddress: "", //单位地址
        unitTel: "", //单位电话
        productName: "", //产品名称
        loanPeriod: "", //贷款期次
        remainderPeriod: "", //剩余期数
        loanMoney: "", //放款金额
        loanDate: "", //放款日期
        statementDate: "", //账单日
        shouldAmt: "", //应还金额
        replaymentDate: "", //还款日
        overdueTotalAmt: "", //逾期总金额
        overduePeriod: "", //逾期总期数
      },
      overdueDetailsList: [], //客户逾期详情
      visitRecordList:[],//外访记录
      collectingHistoryList: [], //催收记录
      callDetailsList:[],//通话详单

      addRemindModel: { //新增催收记录
        loanId:"",
        collectingName:"",//姓名
        relationship:"",//关系
        collectingTel:"",//电话
        receivingState:"",//接听状态
        nextRemindingTime:"",//下次提醒时间
        remarks:"",//备注
      },

      addRemindRules: {//新增催收记录 校验
        collectingName: [{required: true,message: "请输入姓名",trigger: "blur"}],
        relationship: [{required: true,message: "请输入关系",trigger: "blur"}],
        collectingTel: [
          {required: true,message: "请输入电话号码",trigger: "blur"},
          {
            pattern: /^((1\d{10})|(0\d{2,3}-?\d{7,8}))$/,
            message: "请输入正确电话号码",
            trigger: "blur"
          }],
        receivingState: [{required: true,message: "请选择接听状态",trigger: "change"}]
      },
      pickerOptions: {//限制日期
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      imageModel: {
        applyType: "visitRemind",
        applyId: "",
        imageType: "",
        imageId: "",
        diskPath: ""
      },
      imgSrcModel : {},
      //图片预览路径
      previewScr : '',
      dialogImageUrl: "",
      upType:'',//上传预览
    }
  },
  props: {
    collectionRemind: {
      loanId: String, //进件编号
      conNo: String //合同编号
    }
  },
  methods: {
    show(queryType) {
      this.dialogDetail = true;
      this.getList();
    },
    // 获取列表
    getList() {
      let data = {
        loanId: this.collectionRemind.loanId, //进件编号
        conNo: this.collectionRemind.conNo //合同编号
      };
      fetchData("/after/collection/collectionRecordRemindingService.do",data).then(response => {
        this.castInfo = response.data.data;
        this.overdueDetailsList = response.data.data.overdueDetailsList;
        this.visitRecordList = response.data.data.visitRecordList;
        this.collectingHistoryList = response.data.data.collectingHistoryList;
        this.callDetailsList = response.data.data.callDetailsList;
        this.loading = false;
      });
    },
    //清空新增催收记录
    clearRemind(formName) {
      this.$refs[formName].resetFields();
    },

    //新增催收记录提交
    addReminderSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addReminderSubmit1();
        } else {
          return false;
        }
      });
    },
    addReminderSubmit1() {
      this.addRemindModel.loanId = this.collectionRemind.loanId;
      this.$confirm("此操作将新增催收记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          fetchData("/after/collection/addcollectionRecordRemService.do",this.addRemindModel).then(response => {
            var result = response.data;
            if (result.success) {
              this.$message({
                message: result.msg,
                type: "success"
              });
              this.getList();
              this.$refs["addRemindModel"].resetFields();
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
            message: "取消新增！"
          });
        });
    },
    //催收提醒 关闭
    cancelFun() {
      this.$refs["castInfo"].resetFields();
      this.$refs["addRemindModel"].resetFields();
      this.dialogDetail = false;
      this.$emit("init");
    },
     //附件资料
    initImg(applyId){
      console.log(applyId);
      let data = {
        applyId:applyId
      }
      if(applyId) {
        fetchData('/after/upload/previewImage.do', data).then(response => {
          console.log(response.data);
          // this.showImgType = response.data.imageType;
          this.imgSrcModel = response.data.data;
          this.imagesdialogVisible = true;
        })
      }else {
        this.$message({
          message: '没有附件！',
          type: "warning"
        });
        this.imagesdialogVisible = false;
      }
    },
    imgPreview(previewScr,imageType){
      console.log(this.dialogImageUrl);
      this.upType = imageType;
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
.form-left-margin {
  margin-left: 30px;
  padding: 10px;
}
.form-left-margin span {
  color: #606266
}
/* .fieldset-box {
  margin: 10px 0;
  padding: 10px 0;
  border-color: #fff;
}*/
.overdue-title {
  font-size: 18px;
  color: #409eff;
  padding-left: 44%;
}
.add-btn-box {
  float: right;
  margin-right: 100px;
}

.fieldset-box {
  position: relative;
  padding-top: 15px;
  border:1px solid #a6a6a6;
  margin-top: 15px;
}
.fieldset-box > legend {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
  font-size: 14px;
  color: #409eff;
}
.fieldset-box .legend-p {
  padding-left: 10px;
  font-size: 14px;
  color: #409eff;
}
.card-img-box {
  width: 100%;
  box-sizing: border-box;

}
.card-img-box img,
.card-img-box video,
.card-img-box audio {
  display: block;
  width: 100%;
  height: 100px;
}
</style>
