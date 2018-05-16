<template>
	
	<div id="final-remark-box">
	
		<el-card class="box-card">
		    <div slot="header" class="clearfix">
		      <span>初审意见</span>
		    </div>
		    <el-form :model="preAuditModel" ref="preAuditModel"  label-width="120px"  size="mini" :inline="true">
				<el-row :gutter="5">
			      	<el-col :span="12">
						<el-form-item label="审核意见">
							<el-input v-model.number="preAuditModel.trialOptionval" :disabled="true" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="12">
						<el-form-item label="批核产品">
							<el-input v-model.number="preAuditModel.productName" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="24">
						<el-form-item label="批核金额" prop="trialMoney">
							<el-input v-model.number="preAuditModel.trialMoney" :disabled="true" style="width:160px;"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="24">
						<el-form-item label="处理备注" prop="remark">
							<el-input v-model="preAuditModel.remark" type="textarea" :disabled="true"  style="width:360px;"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		
		<el-card class="box-card">
		    <div slot="header" class="clearfix">
		      <span>终审意见</span>
		    </div>
			<el-form :model="finalAuditModel" ref="finalAuditModel"  label-width="120px"  size="mini" :inline="true">
				<el-row :gutter="5">
			      	<el-col :span="12">
						<el-form-item label="审核意见">
							<el-input v-model.number="finalAuditModel.handleOpinion" :disabled="true" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="12">
						<el-form-item label="批核产品">
							<el-input v-model.number="finalAuditModel.productName" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="24">
						<el-form-item label="批核金额" prop="trialMoney">
							<el-input v-model.number="finalAuditModel.approvedAmount" :disabled="true" style="width:160px;"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="24">
						<el-form-item label="处理备注" prop="remark">
							<el-input v-model="finalAuditModel.inHandleOpinion" type="textarea" :disabled="true"  style="width:360px;"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div style="text-align:left">
					<el-form-item>
						<el-button type="primary" @click="gotoListView()">返回审核列表</el-button>
					</el-form-item>
				</div>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import {
  		createData, findById
	} from '@/apis/httpapis'
	export default {
  		name: 'applyInfo',
  		props:{
    		applyId:String
  		},
	  	data() {
	    	return {
	    		preAuditModel: {
			        productName: "极速秒贷B24",
			        trialMoney: "20000",
			        trialOptionval: "通过",
			        remark: "同意贷款",
			    },
	      		finalAuditModel: {
	        		productName : '',
	        		approvedAmount : '',
	        		handleOpinionVal : '',
	        		inHandleOpinion : '',
	        	},
	      	}
	   },
  		created() {
	    	const applyId = this.applyId
		    //this.getgetPreAuditInfo(applyId); 获取初审信息
		    this.getFinalAuditInfo(applyId);
  		},
	  	methods: {
	  		getPreAuditInfo(applyId){
	  			findById('/sys/preaudit/queryalltype.do?applyId=' + applyId)
			      .then(response => {
			         console.info("^^^^^ :" + JSON.stringify(response));
			         //console.log(response.data)
			         this.preAuditModel = response.data;
			    });
	  		},
	  		getFinalAuditInfo(applyId){
	  			console.log("applyId::::" + applyId)
	  			findById('/sys/finalaudit/finalinfo.do?applyId='+applyId)
			      .then(response => {
			         //console.info("^^^^^ :" + JSON.stringify(response));
			         //console.log(response.data)
			         this.finalAuditModel = response.data;
			    });
	  		},
	  		gotoListView(){
	      		this.$router.push({path:"/finalaudit"});
	      	}
	  	}
	}
  	
</script>

</script>
<style scoped>
.el-card__body{
  padding: 0;
}

label {
  font-size: 12px;
}

.el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
  font-size: 12px;
}
.el-form--inline .el-form-item__label{
  font-size: 12px;
}
.table>tr>td{
    padding: 5px;
    vertical-align: top;
    border-top: 1px solid #ddd;
}
table tr, td{
    border:1px solid #ccc;
    font-size: 13px;
    height:30px;
}
table tr:first-of-type td{
    background: #f5f5f5;
}
table tr td.zdName{

  font-weight: 600;
  text-align:center;
  padding:5px;
}
div.el-card__body{
  padding:0
}
</style>