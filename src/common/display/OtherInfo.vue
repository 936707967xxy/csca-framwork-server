<template>
<div class="other-info" id="other-info">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>学信网</span>
    </div>
    <el-form ref="otherInfoModel" :model="otherInfoModel" label-width="160px" size="mini" :inline="true">
          <el-form-item label="毕业年份">
            <el-input v-model="otherInfoModel.userChsi.graduation" :disabled="true"></el-input>
          </el-form-item>
      
          <el-form-item label="专业">
            <el-input v-model="otherInfoModel.userChsi.major" :disabled="true"></el-input>
          </el-form-item>
        
          <el-form-item label="学籍状态">
            <el-input v-model="otherInfoModel.userChsi.status" :disabled="true"></el-input>
          </el-form-item>
        
          <el-form-item label="院校">
            <el-input v-model="otherInfoModel.userChsi.shool" :disabled="true"></el-input>
          </el-form-item>
       
          <el-form-item label="最高学历">
            <el-input v-model="otherInfoModel.userChsi.maxEdu" :disabled="true"></el-input>
          </el-form-item>
       
          <el-form-item label="姓名">
            <el-input v-model="otherInfoModel.userChsi.userName" :disabled="true"></el-input>
          </el-form-item>
   
          <el-form-item label="性别">
            <el-input v-model="otherInfoModel.userChsi.userSex" :disabled="true"></el-input>
          </el-form-item>
       
          <el-form-item label="出生日期">
            <el-input v-model="otherInfoModel.userChsi.birthdayTime" :disabled="true"></el-input>
          </el-form-item>
      
          <el-form-item label="民族">
            <el-input v-model="otherInfoModel.userChsi.nationality" :disabled="true"></el-input>
          </el-form-item>
       
          <el-form-item label="身份证">
            <el-input v-model="otherInfoModel.userChsi.cardNumber" :disabled="true"></el-input>
          </el-form-item>
     
          <el-form-item label="学历类别">
            <el-input v-model="otherInfoModel.userChsi.qualificationType" :disabled="true"></el-input>
          </el-form-item>
      
          <el-form-item label="学习形式">
            <el-input v-model="otherInfoModel.userChsi.learningType" :disabled="true"></el-input>
          </el-form-item>
       
          <el-form-item label="班级">
            <el-input v-model="otherInfoModel.userChsi.classGrade" :disabled="true"></el-input>
          </el-form-item>
       
          <el-form-item label="学号">
            <el-input v-model="otherInfoModel.userChsi.studentNumber" :disabled="true"></el-input>
          </el-form-item>
      
          <el-form-item label="入学时间">
            <el-input v-model="otherInfoModel.userChsi.jsonTime" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="分院">
            <el-input v-model="otherInfoModel.userChsi.branchCourts" :disabled="true"></el-input>
          </el-form-item>
      
		</el-form>
  </el-card>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>社保</span>
    </div>
        <el-form ref="otherInfoModel" :model="otherInfoModel" label-width="160px" size="mini" :inline="true">
     
          <el-form-item label="是否查询成功">
            <el-input v-model="otherInfoModel.socialsecurity.queryStatus" :disabled="true"></el-input>
          </el-form-item>
        
          <el-form-item label="缴费状态">
            <el-input v-model="otherInfoModel.socialsecurity.siStatus" :disabled="true"></el-input>
          </el-form-item>
      
          <el-form-item label="社保缴纳总月数">
            <el-input v-model="otherInfoModel.socialsecurity.siMonths" :disabled="true"></el-input>
          </el-form-item>
      
          <el-form-item label="社保断缴累计月数">
            <el-input v-model="otherInfoModel.socialsecurity.siSumMonths" :disabled="true"></el-input>
          </el-form-item>
     
          <el-form-item label="当前个人账户累积存储额">
            <el-input v-model="otherInfoModel.socialsecurity.siSumAmount" :disabled="true"></el-input>
          </el-form-item>
       
          <el-form-item label="当年缴费基数">
            <el-input v-model="otherInfoModel.socialsecurity.siBase" :disabled="true"></el-input>
          </el-form-item>
     
          <el-form-item label="缴费单位">
            <el-input v-model="otherInfoModel.socialsecurity.siCom" :disabled="true"></el-input>
          </el-form-item>
       
		</el-form>
  </el-card>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>公积金</span>
    </div>
		<el-form ref="otherInfoModel" :model="otherInfoModel" label-width="160px" size="mini" :inline="true">
			
					<el-form-item label="是否查询成功">
						<el-input v-model="otherInfoModel.houseFund.queryStatus" :disabled="true"></el-input>
					</el-form-item>
				
					<el-form-item label="当前缴费状态">
						<el-input v-model="otherInfoModel.houseFund.hsStatus" :disabled="true"></el-input>
					</el-form-item>
				
			
					<el-form-item label="公积金实际缴纳月数">
						<el-input v-model="otherInfoModel.houseFund.hfMonths" :disabled="true"></el-input>
					</el-form-item>
			
					<el-form-item label="公积金断缴累计月数">
						<el-input v-model="otherInfoModel.houseFund.hfSumMonths" :disabled="true"></el-input>
					</el-form-item>
				
					<el-form-item label="月缴基数">
						<el-input v-model="otherInfoModel.houseFund.siBase" :disabled="true"></el-input>
					</el-form-item>
				
					<el-form-item label="缴纳总金额">
						<el-input v-model="otherInfoModel.houseFund.siSumAmount" :disabled="true"></el-input>
					</el-form-item>
				
					<el-form-item label="余额">
						<el-input v-model="otherInfoModel.houseFund.siBalance" :disabled="true"></el-input>
					</el-form-item>
			
					<el-form-item label="缴纳单位是否为第三方机构">
						<el-input v-model="otherInfoModel.houseFund.siComType" :disabled="true"></el-input>
					</el-form-item>
			
					<el-form-item label="缴纳单位">
						<el-input v-model="otherInfoModel.houseFund.siCom" :disabled="true"></el-input>
					</el-form-item>
			
		</el-form>
  </el-card>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>淘宝</span>
    </div>
		<el-form ref="otherInfoModel" :model="otherInfoModel" label-width="160px" size="mini" :inline="true">
			
					<el-form-item label="花呗可用额度">
						<el-input v-model="otherInfoModel.taobao.hbed" :disabled="true"></el-input>
					</el-form-item>
				
					<el-form-item label="支付宝账户余额">
						<el-input v-model="otherInfoModel.taobao.zfbzhye" :disabled="true"></el-input>
					</el-form-item>
				
					<el-form-item label="余额宝累计6月收益">
						<el-input v-model="otherInfoModel.taobao.bnyebljsy" :disabled="true"></el-input>
					</el-form-item>
				
					<el-form-item label="近3个月消费占比">
						<el-input v-model="otherInfoModel.taobao.jsyxfzb" :disabled="true"></el-input>
					</el-form-item>
			
					<el-form-item label="近3个月转入金额">
						<el-input v-model="otherInfoModel.taobao.jsyzrje" :disabled="true"></el-input>
					</el-form-item>
			
					<el-form-item label="近3个月支出金额">
						<el-input v-model="otherInfoModel.taobao.jsyzcje" :disabled="true"></el-input>
					</el-form-item>
			
					<el-form-item label="近3个月平均还款金额">
						<el-input v-model="otherInfoModel.taobao.jsypjhk" :disabled="true"></el-input>
					</el-form-item>
			
					<el-form-item label="收货地址总数">
						<el-input v-model="otherInfoModel.taobao.shdzzs" :disabled="true"></el-input>
					</el-form-item>
				

      <el-row>
        <el-table :data="otherInfoModel.taobao.addresses" border style="width: 100%">
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="location" label="地址"></el-table-column>
          <el-table-column prop="takeman" label="收货人"></el-table-column>
          <el-table-column prop="detailedaddress" label="详细地址"></el-table-column>
          <el-table-column prop="postcode" label="邮政编码"></el-table-column>
        </el-table>
      </el-row>
		</el-form>


  </el-card>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "otherInfo",
  props: {
    applyId: String
  },
  data() {
    return {

    }
  },
  created() {
    const applyId = this.applyId
    this.$store.dispatch('LoadOther', applyId)
  },
  computed: mapState({
    otherInfoModel: state => state.audit.otherInfoModel
  }),
  methods: {
		onSubmit() {
        console.log('submit!');
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row-mar {
  margin-bottom: 12px;
}
.clearfix span{
	font-size: 18px;
	font-weight:bold;
}
.box-card{margin-bottom:15px;}
</style>
<style>
	#other-info .el-form--inline .el-form-item__label{width:175px !important;}
	@media only screen and (max-width:1366px) {
		#other-info .el-input.is-disabled .el-input__inner{width:100px !important;}
	}
</style>

