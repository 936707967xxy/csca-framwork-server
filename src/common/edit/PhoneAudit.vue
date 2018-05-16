<template>
<!--通话详单-->
<div class="container-fluid">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>联系人</span>
    </div>
    <el-table :data="phoneModel.contacts" border style="width: 100%">
      <el-table-column prop="name" label="姓名" min-width="60px"></el-table-column>
      <el-table-column prop="relationshipVal" label="关系" min-width="50px"></el-table-column>
      <el-table-column prop="phone" label="电话号码" min-width="100px"></el-table-column>
      <el-table-column prop="companyName" label="工作单位" min-width="100px" ></el-table-column>
      <el-table-column prop="contactAddress" label="单位/居住地址" min-width="100px"></el-table-column>
      <el-table-column prop="isKnowVal" label="是否知晓" min-width="80px;"></el-table-column>
      <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleAudit(scope.row)" type="text" size="mini">审核</el-button>
      </template>
    </el-table-column>
    </el-table>
  </el-card>

  <el-form ref="phoneVerify" :model="phoneVerify" :rules="rules" label-width="80px" size="small" v-show="showAudit">
    <el-card class="box-card" style="padding:30px 20px">
      <el-form-item label="称呼" prop="relationName">
        <el-input v-model="phoneVerify.relationName" style="width:140px;"></el-input>
      </el-form-item>
    <el-form-item label="电话号码" prop="telNumber">
      <el-input v-model="phoneVerify.telNumber" style="width:160px;"></el-input>
    </el-form-item>
    <el-form-item label="是否知晓" prop="knowVal">
      <el-tooltip :content="phoneVerify.knowVal == 1 ? '知道':'不知道'" placement="top">
        <el-switch
          v-model="phoneVerify.knowVal"
          active-color="#13ce66"
          inactive-color="#ff4949" active-value="1" inactive-value="0">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="电话状态">
      <el-radio-group v-model="phoneVerify.telStatus" prop="telStatus">
        <el-radio border :label="0">空号</el-radio>
        <el-radio border :label="1">停机</el-radio>
        <el-radio border :label="2">无人接听</el-radio>
        <el-radio border :label="3">无法接通</el-radio>
        <el-radio border :label="4">关机</el-radio>
        <el-radio border :label="5">正常</el-radio>
        <el-radio border :label="6">其他</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="核查状态">
      <el-radio-group v-model="phoneVerify.ckStatus" prop="telStatus">
        <el-radio border :label="0">异常</el-radio>
        <el-radio border :label="1">未知</el-radio>
        <el-radio border :label="2">待核</el-radio>
        <el-radio border :label="3">正常</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="关系">
      <el-radio-group v-model="phoneVerify.relation" prop="telStatus">
        <el-radio border :label="0">本人</el-radio>
        <el-radio border :label="1">配偶</el-radio>
        <el-radio border :label="2">父母</el-radio>
        <el-radio border :label="3">子女</el-radio>
        <el-radio border :label="4">同事</el-radio>
        <el-radio border :label="5">朋友</el-radio>
        <el-radio border :label="6">其他</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="审核备注" prop="remark">
      <el-input type="textarea" v-model="phoneVerify.remark" style="width:600px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="savePhoneAudit('phoneVerify')">立即创建</el-button>
    </el-form-item>
    </el-card>
  </el-form>

  <el-card class="box-card" style="margin-top:20px;">
    <div slot="header" class="clearfix">
      <span>审核信息</span>
    </div>
    <el-table :data="phoneModel.phoneVerifies" border style="width: 100%">
      <el-table-column prop="relationName" label="称呼"></el-table-column>
      <el-table-column prop="telNumber" label="电话号码"></el-table-column>
      <el-table-column prop="relationVal" label="关系"></el-table-column>
      <el-table-column prop="knowStr" label="是否知晓"></el-table-column>
      <el-table-column prop="ckStatusVal" label="核查状态"></el-table-column>
      <el-table-column prop="telStatusval" label="电话状态"></el-table-column>
      <el-table-column prop="remark" label="审核信息"></el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" type="text" size="mini">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>通话详单</span>
    </div>
    <el-table :data="phoneModel.cellBills" border style="width: 100%">
      <el-table-column type="expand" >
        <template slot-scope="props">
							<el-table :data="props.row.callDetails" border style="width: 90%">
								<el-table-column prop="calladdress" label="通话地址"></el-table-column>
								<el-table-column prop="callway" label="通话类型"></el-table-column>
								<el-table-column prop="calltime" label="通话时间"></el-table-column>
								<el-table-column prop="callduration" label="通话时长"></el-table-column>
								<el-table-column prop="callmoney" label="话费"></el-table-column>
								<el-table-column prop="calltype" label="通话方式"></el-table-column>
							</el-table>
						</template>
      </el-table-column>
      <el-table-column prop="name" label="称呼"></el-table-column>
      <el-table-column prop="phone" label="电话号码"></el-table-column>
      <el-table-column prop="mobileaddress" label="归属地"></el-table-column>
      <el-table-column prop="callcounts" label="累计通话频次(3月)"></el-table-column>
      <el-table-column prop="callTime" label="累计通话时长(3月)"></el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
import { mapState } from 'vuex'
import {
  findById,
  fetchData
} from '@/apis/httpapis'

export default {
  name: 'phoneAudit',
  props: {
    applyId: String
  },
  data() {
    return {
      showAudit:false,
      phoneVerify:{
        pvId:"",
        telNumber:"",
        relationName:"",
        knowVal:0,
        knowStr:"",
        telStatus:"0",
        telStatusval:"空号",
        consId:"",
        remark:"",
        applyId:"",
        relation:"",
        relationVal:"",
        ckStatus:0,
        ckStatusVal:""
      },
      rules:{
        relationName:[{ required: true, message: '请输入称呼', trigger: 'blur' }],
        telNumber:[{ required: true, message: '请输入审核电话', trigger: 'blur' }],
        knowVal:[{ required: true, message: '必填项', trigger: 'blur' }],
        telStatus:[{ required: true, message: '必填项', trigger: 'change' }],
        remark:[{ required: true, message: '请输入核查信息', trigger: 'blur' }],
        ckStatus:[{ required: true, message: '必填项', trigger: 'change' }],
        relation:[{ required: true, message: '必填项', trigger: 'change' }],
      }
    }
  },
  created() {
    const applyId = this.applyId
    this.$store.dispatch('LoadCallBills', applyId)
  },
  computed: mapState({
    phoneModel: state => state.audit.phoneModel
  }),
  methods: {
    handleAudit(row) {
      if(null === row || "" === row || undefined === row){
        this.$message({
          message: '参数异常!',
          type: 'warning'
        });
        return;
      }

      //获取数据  根据联系人获取数据
      const consId = row.contId;
      let url = "/sys/phoneverify/querybycons.do?consId=" + consId;
      findById(url).then(res => {
        //console.info("#####:" + JSON.stringify(res.data))
        var obj = res.data;
        this.showAudit=true;
        if(obj == null || obj == ""){
          this.phoneVerify={
            pvId:"",
            telNumber:row.phone,
            knowVal:0,
            knowStr:"",
            telStatus:"0",
            telStatusval:"空号",
            consId:consId,
            remark:"",
            applyId:this.applyId
          }
        }else{
          this.phoneVerify = res.data;
          this.phoneVerify.applyId = this.applyId;
        }
      }).catch(error => {
        this.$message({
          message: '数据获取异常!',
          type: 'warning'
        });
      })
    },
    handleUpdate(row){
      if(null === row || "" === row || undefined === row){
        this.$message({
          message: '参数异常!',
          type: 'warning'
        });
        return;
      }

      //获取数据
      const pvId = row.pvId;
      let url = "/sys/phoneverify/querybyid.do?id=" + pvId;
      findById(url).then(res => {
        this.phoneVerify = res.data;
        this.showAudit=true;
      }).catch(error => {
        this.$message({
          message: '数据获取异常!',
          type: 'warning'
        });
      })
    },
    savePhoneAudit(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = "/sys/phoneverify/save.do";
            fetchData(url,this.phoneVerify).then(res => {
              const result = res.data;
              if (result.success) {
                //拉取审核数据 phoneModel.phoneVerifies
                findById('/sys/phoneverify/querybyapply.do?applyId=' + this.applyId).then(res => {
                  if(res.data == null || res.data == ""){
                    return;
                  }
                  this.phoneModel.phoneVerifies = res.data
                })

                this.$message({
                  message: '审核存储成功!',
                  type: 'success'
                });
              }else{
                this.$message({
                  message: '审核存储失败!',
                  type: 'warning'
                });
              }
            }).catch(error => {
              this.$message({
                message: '审核存储异常!',
                type: 'error'
              });
            })
            this.showAudit=false;
          } else {
            return false;
          }
      });
    }
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row-mar {
  margin-bottom: 12px;
}
</style>
