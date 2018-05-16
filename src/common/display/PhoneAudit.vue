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
        knowVal:0,
        knowStr:"",
        telStatus:"0",
        telStatusval:"空号",
        consId:"",
        remark:"",
        applyId:""
      },
      rules:{
        telNumber:[{ required: true, message: '请输入审核电话', trigger: 'blur' }],
        knowVal:[{ required: true, message: '必填项', trigger: 'blur' }],
        telStatus:[{ required: true, message: '必填项', trigger: 'change' }],
        remark:[{ required: true, message: '请输入核查信息', trigger: 'blur' }]
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

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row-mar {
  margin-bottom: 12px;
}
.container-fluid .box-card{margin-bottom:15px;}
.clearfix span{font-size:18px;font-weight: bold;}
</style>
