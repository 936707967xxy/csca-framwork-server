<template>
<div id="credit-box">
  <!-- 信用信息 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>个人征信</span>
      <a type="primary" style="padding: 3px 5px;cursor:pointer;color:#409EFF;" class="el-icon-share" v-bind:href="htmlurl" target="_blank" ></a>
      <!-- <el-button style="float: right; padding: 6px 10px" type="success" @click="onSubmitCredit('creditModel')" :disabled="editCredit">保存数据</el-button> -->
    </div>
    <el-form ref="creditModel" :model="creditModel" label-width="190px" size="mini" :inline="true" style="padding-top:20px;">
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="未结清/销户账户（购房贷款）">
            <el-input v-model="creditModel.pbccre.wjqzh" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发生过逾期的贷款账户数">
            <el-input v-model="creditModel.pbccre.yqzhs" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="逾期>90天贷款账户数">
            <el-input v-model="creditModel.pbccre.jstysyqzh" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="为他人担保笔数">
            <el-input v-model="creditModel.pbccre.wtrdbbs" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="授信时长">
            <el-input v-model="creditModel.pbccre.sxsc" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信用卡授信总额">
            <el-input v-model="creditModel.pbccre.xyksxze" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="单张信用卡最高额度">
            <el-input v-model="creditModel.pbccre.dzxykzged" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信用卡已使用额度占比">
            <el-input v-model="creditModel.pbccre.xyksyzb" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="近2年内信用卡逾期总月数">
            <el-input v-model="creditModel.pbccre.lnxykyqzys" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="2年内信用卡逾期>90天总次数">
            <el-input v-model="creditModel.pbccre.lnxykyjstqzys" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="信用卡当前逾期金额">
            <el-input v-model="creditModel.pbccre.zykdqyqje" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房贷发放总额">
            <el-input v-model="creditModel.pbccre.fdze" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="房贷月还款总额">
            <el-input v-model="creditModel.pbccre.fdyh" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房贷已还期数">
            <el-input v-model="creditModel.pbccre.fdyhqs" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="近3个月新增其他贷款笔数">
            <el-input v-model="creditModel.pbccre.jsyxzdkbs" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="非银行贷款占比">
            <el-input v-model="creditModel.pbccre.fyhdkzb" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="其他贷款月还款总额">
            <el-input v-model="creditModel.pbccre.qtdkyh" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信用负债率">
            <el-input v-model="creditModel.pbccre.xyfzb" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="2年内贷款逾期总月数">
            <el-input v-model="creditModel.pbccre.lndkyqys" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="2年内贷款>90天逾期次数">
            <el-input v-model="creditModel.pbccre.lndkjstyqcs" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="贷款当前逾期金额">
            <el-input v-model="creditModel.pbccre.dkdqyqje" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="征信近1月内机构查询次数(不含贷后)">
            <el-input v-model="creditModel.pbccre.zxyycxcs" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="征信近1月内个人查询次数">
            <el-input v-model="creditModel.pbccre.zxyycxcssy" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="征信近3月内查询次数">
            <el-input v-model="creditModel.pbccre.zxsycxcs" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="近6个月个人查询次数(不含临柜)">
            <el-input v-model="creditModel.pbccre.jlycxchgrcx" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="近6个月保前审查次数">
            <el-input v-model="creditModel.pbccre.jlycxchbqsc" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="征信近3个月内查询次数(不含贷后管理)">
            <el-input v-model="creditModel.pbccre.jsycxchoutdh" disabled></el-input>
          </el-form-item>
        </el-col>
        </el-col>
      </el-row>

    </el-form>
  </el-card>

  <!-- <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>上海资信</span>
    </div>

    <div class="table-responsive">
      <el-form ref="creditModel" :model="creditModel" label-width="160px" size="mini" :inline="true">
      <el-row :gutter="5">
        <el-col :span="8">
          <label class="lable-tit">未结清贷款笔数</label>
          <span class="data-span">{{creditModel.userCis.wjqbs}}</span>
        </el-col>
        <el-col :span="8">
          <label class="lable-tit">贷款余额</label>
          <span class="data-span">{{creditModel.userCis.dkye}}</span>

        </el-col>
        <el-col :span="8">
          <label class="lable-tit">当前逾期总额</label>
          <span class="data-span">{{creditModel.userCis.dqyqZe}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="5">


      </el-row>

        <el-row :gutter="5">
          <el-col :span="8">
            <label class="lable-tit">最高逾期金额</label>
            <span class="data-span">{{creditModel.userCis.zgyqJe}}</span>
          </el-col>
          <el-col :span="8">
            <label class="lable-tit">最高逾期期数</label>
            <span class="data-span">{{creditModel.userCis.zgyqQs}}</span>
          </el-col>
          <el-col :span="8">
            <label class="lable-tit">6月内查询次数</label>
            <span class="data-span">{{creditModel.userCis.lynzxcxs}}</span>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-card> -->

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>人法</span>
      <a type="primary" style="padding: 3px 5px;cursor:pointer;color:#409EFF;" class="el-icon-share" href="http://zhixing.court.gov.cn/search/" target="_blank"></a>
    </div>
  </el-card>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>企业信用</span>
      <a type="primary" style="padding: 3px 5px;cursor:pointer;color:#409EFF;" class="el-icon-share" href="http://www.gsxt.gov.cn/index.html" target="_blank"></a>
    </div>
  </el-card>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>审核备注</span>
    </div>
    <div style="padding:20px 40px;">
      <el-upload :action="uploadUrl"
        list-type="picture-card"
        :show-file-list="showFileList"
        multiple
        :file-list="fileList"
        :on-success="onUploadSuccess"
        :on-error="uploadError"
        :on-remove="uploadRemove"
        accept="image/*"
        style="margin-bottom:20px;">
        <i class="el-icon-plus"></i>
      </el-upload>

      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 8}"
        placeholder="请输入审核信息内容"
        v-model="creditRemark">
      </el-input>
    </div>
  </el-card>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'

import {createDataJson,findById} from '@/apis/httpapis'

export default {
  name: 'credit',
  props: {
    applyId: String
  },
  data() {
    return {
      showFileList:true,
      fileList:[],
      count:0
    }
  },
  created() {
    const applyId = this.applyId
    this.$store.dispatch('LoadCredit', applyId)
  },
  // computed:mapState({
  //   creditModel:state => state.audit.creditModel
  // }),
  computed: {
    creditModel:{
      get () {
        return this.$store.state.audit.creditModel;
      },
      set (value) {
        this.$store.commit('UPDATE_CREDIT', value)
      }
    },
    htmlurl:function(){
      return "/sys/pbccrc/html.do?applyId="+this.applyId;
    },
    uploadUrl:function(){
      return "/sys/auditannex/upload.do?applyId="+this.applyId;
    },
    creditRemark:{
      get () {
        return this.$store.state.preaudit.creditRemark;
      },
      set (value) {
        this.$store.commit('UPDATE_CRDIT_REMARK', value)
      }
    }
  },
  methods: {
    onSubmitCredit(formName){
    //console.info("************" + JSON.stringify(this.$store.state.audit.creditModel)); pbccre
      const obj = this.creditModel;
      // console.info("####:" + JSON.stringify(obj))
      createDataJson('/sys/preaudit/savecredit.do',obj).then(res => {
        const result = res.data;
        if(result.success){
          this.editCredit = false
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }else{
          this.$message({
            type: 'warning ',
            message: '保存失败!'
          });
        }
      }).catch(error => {
        this.$message({
          type: 'error ',
          message: error
        });
      })
    },
    onUploadSuccess(response, file, fileList){
      this.$store.dispatch('addFileList', {
        name:file.name,
  			url:response.data.preView,
        uid:response.data.uid
      });

       //console.info("response   == " + JSON.stringify(response));
       //console.info("file === " + JSON.stringify(file));
       //console.info("fileList === " + JSON.stringify(fileList));
      // this.fileList.splice(this.fileList.indexOf(file), 1)

    },
    uploadError(err, file, fileList){
      this.$message({
        type: 'error ',
        message:"文件上传异常!("+ file.name +")"
      });
      file.status = 'fail'
    },
    uploadRemove(file, fileList){
       console.info("file === " + JSON.stringify(file));
       console.info("fileList === " + JSON.stringify(fileList));

      const id = file.response.data.uid;
      let url = "/sys/auditannex/delete.do?id=" + id;
      findById(url).then(res =>{
        const result = res.data;
        if (result.success) {
          this.$message({
            type: 'success',
            message: "删除成功!"
          });
        }else{
          this.$message({
            type: 'warning',
            message: "删除失败!"
          });
        }
      })

    }
  }

}
</script>
<style scoped>
.box-card-header{
  font-size: 18px;
  font-weight: 600px;
}
.el-card__body {
  padding: 0;
}

label {
  font-size: 12px;
}

.el-row {
  margin-bottom: 15px;
  margin-left: 20px;
}

.lable-tit {
  display: inline-block;
  /*width: 100px;*/
  float: none;
  text-align: right;
  box-sizing: border-box;
  padding-right: 8px;
}

.data-span {
  font-size: 14px;
  display: inline-block;
  height: 28px;
  width: auto;
  min-width: 80px;
  padding: 0px 12px;
  border: 1px solid #d8dce5;
  border-radius: 4px;
  line-height: 28px;
  color: #5a5e66;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  background-color: #f5f7fa;
  cursor: not-allowed;
}

.el-input__inner {
  padding: 0 6px;
}

.el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  font-size: 12px;
}

.el-form--inline .el-form-item__label {
  font-size: 12px;
}

.table-responsive{
  margin-top: 20px;
  margin-left: 20px;
}

div.el-card__body {
  padding: 0px;
}

.box-card {
  margin-bottom: 15px;
}
.clearfix span {
		font-size: 18px;
		font-weight: bold;
	}
</style>
<style>
	@media screen and (max-width: 1366px) {
		#credit-box .el-form-item--mini .el-form-item__label {
			width: 180px !important;
		}
		#credit-box .el-form-item--mini .el-form-item__content {
			width: 90px !important;
		}
	}
</style>
