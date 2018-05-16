<template>

	<div id="se-apply-box" class="se-apply-box1">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>认证清单</span>
			</div>
		<div class="grid-content bg-purple-dark">
			<el-table :data="authTable" border style="width:80%;margin:0 auto;" cell-class-name="cell-class">
				<el-table-column label="认证名称">
					<template slot-scope="scope">
							<div class="title-box" v-if="scope.row.auKey === 'creditInvestigation'">
								<span>{{scope.row.auName}}</span>
							  <a type="primary" style="padding: 3px 5px;cursor:pointer;color:#409EFF;" class="el-icon-share" v-bind:href="'/sys/pbccrc/html.do?applyId='+applyId" target="_blank"></a>
							</div>
							<div class="title-box" v-else>
								<span>{{scope.row.auName}}</span>
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
		</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>备注信息</span>
			</div>
			<div class="Note-information">
				<el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}"  v-model="submitTypeText" :disabled="true">
				</el-input>
				<div class="btn">
					<!--			    <el-button @click="handleQcCheckPass" type="success" size="mini" :disabled="true">{{applyModel.handleOpinionVal}}</el-button>
-->
					<el-button @click="gotoListView" type="primary" size="mini">返回门店列表</el-button>
				</div>
			</div>
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
				authTable: null
			}
		},
		created() {
			const applyId = this.applyId
			//console.log("applyId" + applyId);
			this.handleQcCheckPass(applyId);
			var url = "/sys/userallauthinfo/selectallauthbyapplyid.do?applyId=" + applyId;
			findById(url).then(response => {
				this.authTable = response.data;
			})
		},
		methods: {
			handleQcCheckPass() {
				const applyId = this.applyId;
				var url = "/sys/applymodel/submitfindbyid.do?applyId=" + applyId
				findById(url).then(response => {
					if(response.data.submitTypeText != null) {
						this.submitTypeText = response.data.submitTypeText;
					}
				})

			},
			gotoListView() {
				this.$router.push({
					path: "/apply"
				});
			}
		}
	}
</script>

<style scoped>
	.title-box span{
		font-size: 14px !important;
	}
	.btn {
		margin-left: 42%;
		margin-top: 10px;
	}
	.btn .el-button{
		font-size:15px;
	}
	.Note-information{
		width: 80%;
		margin: 0 auto;
		padding: 15px;
	}
	.clearfix span{
		font-size:18px;
		font-weight: bold;
	}
	.box-card{margin-bottom:15px;}
</style>
