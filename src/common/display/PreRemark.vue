<template>
<div id="final-remark-box">
  <el-form :model="preAuditModel" ref="preAuditModel" label-width="120px" size="small">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>信用备注</span>
      </div>
      <div style="padding:20px 40px;">
        <el-upload :action="uploadUrl"
          list-type="picture-card"
          :show-file-list="showFileList"
          :file-list="fileList"
          accept="image/*"
          style="margin-bottom:20px;" disabled>
        </el-upload>

        <el-form-item label="信用审核备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8}"
            placeholder="请输入信用审核信息内容"
            v-model="preAuditModel.creditRemark" style="width:560px;" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="财务审核备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8}"
          placeholder="请输入财务审核信息内容"
          v-model="preAuditModel.financeRemark" style="width:560px;" disabled>
        </el-input>
      </el-form-item>
      <el-form-item label="其他信息审核备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8}"
          placeholder="请输入其他信息审核内容"
          v-model="preAuditModel.otherRemark" style="width:560px;" disabled>
        </el-input>
        </el-form-item>

        <el-form-item label="审核意见">
          <el-input v-model="preAuditModel.handleOptionval" style="width:160px;" disabled>
          </el-input>
        </el-form-item>

        <el-form-item label="批核产品">
          <el-input v-model="preAuditModel.productName" style="width:160px;" disabled>
          </el-input>
        </el-form-item>

        <el-form-item label="批核金额">
          <el-input v-model.number="preAuditModel.handleMoney" style="width:160px;" disabled></el-input>
        </el-form-item>

        <el-form-item label="处理备注">
          <el-input v-model="preAuditModel.innerRemark" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" style="width:560px;" disabled></el-input>
        </el-form-item>
      </div>
    </el-card>
</el-form>


</div>
</template>

<script>
import {
  mapState
} from 'vuex'

import {
  findById,
  createData
} from '@/apis/httpapis'
export default {
  name: 'preRemark',
  props: {
    applyId: String
  },
  data() {
    return {
      creditRemark:"",
      showFileList:true,
      productTypes: [{
        prodId: '',
        prodName: ''
      }],
      product: [],
      props: {
        value: 'prodId',
        label: 'prodName',
        children: 'products'
      }
    }
  },
  created() {
    const applyId = this.applyId
    this.preAuditModel.applyId = applyId;
    findById('/sys/producttype/queryalltype.do')
      .then(response => {
        var obj = response.data;
        this.productTypes = obj;
      })

    this.$store.dispatch('LoadPreAudit', applyId).then(() => {

    }).catch(error => {
      this.$message({
        type: 'error',
        message: '审核数据获取异常'
      });
    })

  },//fileList
  computed:{
    fileList:{
      get () {
        return this.$store.state.preaudit.fileList;
      },
      set (value) {
        this.$store.preaudit.commit('UPDATE_FILE_LIST', value)
      }
    },
    preAuditModel:{
      get () {
        return this.$store.state.preaudit.preAuditModel;
      },
      set (value) {
        this.$store.preaudit.commit('SET_PREAUDIT', value)
      }
    },
    uploadUrl:function(){
      return "/sys/auditannex/upload.do?applyId="+this.applyId;
    }
  },
  methods: {
    onCancel() {
      this.$router.push({
        path: "/preaudit"
      });
    }
  }
}
</script>

</script>
<style scoped>
.el-card__body {
  padding: 0;
}

label {
  font-size: 12px;
}

.el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  font-size: 12px;
}

.el-form--inline .el-form-item__label {
  font-size: 12px;
}

.table>tr>td {
  padding: 5px;
  vertical-align: top;
  border-top: 1px solid #ddd;
}

table tr,
td {
  border: 1px solid #ccc;
  font-size: 13px;
  height: 30px;
}

table tr:first-of-type td {
  background: #f5f5f5;
}

table tr td.zdName {

  font-weight: 600;
  text-align: center;
  padding: 5px;
}

div.el-card__body {
  padding: 0
}
</style>
