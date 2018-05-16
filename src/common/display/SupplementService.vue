<template>

	<div id="da-supplemnt-box">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>退回意见</span>
			</div>
			<el-table :data="tableData" border style="width:100%;" cell-class-name="cell-class">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="NAME_" label="来源节点"></el-table-column>
				<el-table-column prop="REMARKS_" label="退回原因"></el-table-column>
				<el-table-column prop="AUDIT_DATE" label="退回时间"></el-table-column>
				<el-table-column prop="EMP_NAME" label="审核员工"></el-table-column>
			</el-table>
		</el-card>
		
		<el-card class="box-card" style="margin-top:10px;">
			<div slot="header" class="clearfix">
				<span>认证清单</span>
			</div>
			<el-table :data="authTable" border style="width:80%;margin:0 auto;" cell-class-name="cell-class">
				<el-table-column label="认证名称">
					<template slot-scope="scope">
						<div class="title-box" v-if="scope.row.auKey === 'creditInvestigation'">
							<span style="font-size:14px;">{{scope.row.auName}}</span>
							<a type="primary" style="padding: 3px 5px;cursor:pointer;color:#409EFF;" class="el-icon-share" v-bind:href="'/sys/pbccrc/html.do?applyId='+applyId" target="_blank"></a>
						</div>
						<div class="title-box" v-else>
							<span style="font-size:14px;">{{scope.row.auName}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="认证结果">
					<template slot-scope="scope">
						<span v-show="scope.row.auValue==0"><img src="/front-design/image/yrz.png"  title="已认证" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==1"><img src="/front-design/image/wrz.png"  title="未认证" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==2"><img src="/front-design/image/rzsb.png" title="认证失败" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==3"><img src="/front-design/image/rzz.png"  title="认证中" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==4"><img src="/front-design/image/rzgq.jpg" title="认证过期" style="width: 24px;height: 24px"></span>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>备注信息</span>
			</div>
			<el-row :gutter="5" class="body-box">
				<el-input type="textarea" style="width:80%;margin-left:10%;" :autosize="{ minRows: 4, maxRows: 6}"  v-model="submitTypeText" :disabled="true">
				</el-input>
				<div class="btn">
					<!--			    <el-button @click="handleQcCheckPass" type="success" size="mini" :disabled="true">{{applyModel.handleOpinionVal}}</el-button>
-->
					<el-button @click="gotoListView" type="primary" size="mini" style="margin-top:15px ;">返回资料列表</el-button>
				</div>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	import {
		findById,
		fetchData
	} from '@/apis/httpapis'
	export default {
		name: 'applyInfo',
		props: {
			applyId: String
		},
		data() {

			return {
				applyModel: {
					remarks: '',
					handleOpinionVal: '提交'
				},
				submitTypeText: '',
				tableData: null,
				authTable: null
			}
		},
		created() {
			const applyId = this.applyId
			//console.log("applyId" + applyId);
			this.applyModel.applyId = applyId;
			var url = "/sys/supplement/beforesubmit.do?applyId=" + applyId;
			findById(url).then(response => {
				this.tableData = response.data;
				//console.log(JSON.stringify(response.data))
			})
			var url = "/sys/userallauthinfo/selectallauthbyapplyid.do?applyId=" + applyId;
			findById(url).then(response => {
				this.authTable = response.data;
				//console.log(JSON.stringify(response.data))
			})
			this.handleQcCheckPass(applyId);
		},
		methods: {
			handleQcCheckPass() {
				const applyId = this.applyId;
				var url = "/sys/supplement/submitfindbyid.do?applyId=" + applyId
				findById(url).then(response => {
					if(response.data.submitTypeText != null) {
						this.submitTypeText = response.data.submitTypeText;
					}
				})

			},
			gotoListView() {
				this.$router.push({
					path: "/supplement"
				});
			}
		}
	}
</script>

<style scoped>
	.btn {
		margin-left: 42%;
		margin-top: 10px;
	}
	
	.clearfix span {
		font-size: 18px;
		font-weight: bold;
	}
	
	.el-card__body {
		width: 100%;
		padding: 0;
	}
	
	.el-textarea__inner {
		width: 95%;
		margin: 0 auto;
	}
	
	.body-box {
		padding: 20px 0;
	}
	
	.el-tabs__content {
		height: 100%;
		height: 73vh;
		overflow: auto;
	}
	.box-card{margin-bottom:15px;}
	.el-table{font-weight: 500;}
</style>