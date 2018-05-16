<template>

	<div id="qc-remark-box">
		<el-card class="box-card" v-show="showProRollBackInfo">
			<div slot="header"  class="clearfix">
				<span>初审退回</span>
			</div>
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark">
						<el-table ref="preRollBacktableData" :data="preRollBacktableData" border style="width: 100%" cell-class-name="cell-class" highlight-current-row>
							<el-table-column type="index" width="50"></el-table-column>
							<el-table-column prop="handleTime" label="退回时间" min-width="150" :formatter="dateFor"></el-table-column>
							<el-table-column prop="handleRemark" label="退回原因" min-width="180"></el-table-column>
						</el-table>
					</div>
				</el-col>
			</el-row>
		</el-card>

		<el-card class="box-card" style="margin-top:10px;">
			<div slot="header" class="clearfix">
				<span>认证清单</span>
			</div>
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
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>质检意见</span>
			</div>
			<el-row >
				<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="applyModel.remarks" :disabled="true">
				</el-input>
			</el-row>
			<el-row style="text-align:center;margin-top:20px;">
				<!-- <el-button @click="handleQcCheckPass()" type="success" size="mini" disabled>{{applyModel.handleOpinionVal}}</el-button> -->
				<el-button @click="gotoListView()" type="warning" size="mini">返回</el-button>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	import {
		findById,
		fetchData
	} from '@/apis/httpapis'

	import {
		formatDate
	} from '@/utils/date'

	export default {
		name: 'applyInfo',
		props: {
			applyId: String
		},
		data() {
			return {
				showProRollBackInfo: false,
				preRollBacktableData: [],
				authTable: null,
				applyModel: {
					remarks: '',
					handleOpinionVal: '通过'
				}
			}
		},
		created() {
			const applyId = this.applyId

			this.handleQcCheckPass(applyId);
			this.getPreRollBackInfo(applyId);

			var url = "/sys/userallauthinfo/selectallauthbyapplyid.do?applyId=" + applyId;
			findById(url).then(response => {
				this.authTable = response.data;
			})
		},
		methods: {
			handleQcCheckPass(applyId) {
				var url = "/sys/qccheck/qccheckinfo.do?applyId=" + applyId;
				findById(url).then(response => {
					//console.log("值:" + JSON.stringify(response.data));
					this.applyModel = response.data;
				});
			},
			gotoListView() {
				this.$router.push({
					path: "/qccheck"
				});
			},
			getPreRollBackInfo(applyId) {
				var url = '/sys/qccheck/prerollbackhis.do?applyId=' + applyId;
				findById(url).then(response => {
					this.preRollBacktableData = response.data;
					if(this.preRollBacktableData.length > 0) {
						this.showProRollBackInfo = true;
					}
				})
			},
			dateFor(row, column, cellValue) {
				console.log("cellValue..." + cellValue);
				return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss');
			},
		}
	}
</script>
<style scoped>
	.clearfix {
		font-size: 18px;
		font-weight: 600;
	}
	.box-card {
		margin-bottom: 15px;
	}
</style>
