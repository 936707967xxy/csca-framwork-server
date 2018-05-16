<template>
<div id="qc-remark-box">
	<el-card class="box-card"  v-show="showProRollBackInfo">
		<div slot="header" class="clearfix">
			<span>退回信息</span>
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
							<span style="font-weight:bold;">{{scope.row.auName}}</span>
							<a type="primary" style="padding: 3px 5px;cursor:pointer;color:#409EFF;" class="el-icon-share" v-bind:href="'/sys/pbccrc/html.do?applyId='+applyId" target="_blank"></a>
						</div>
						<div class="title-box" v-else>
							<span style="font-weight:bold;">{{scope.row.auName}}</span>
						</div>
					</template>
			</el-table-column>
			<el-table-column label="认证结果">
				<template slot-scope="scope">
						<span v-show="scope.row.auValue==0"><img src="@/assets/image/yrz.png"  title="已认证" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==1"><img src="@/assets/image/wrz.png"  title="未认证" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==2"><img src="@/assets/image/rzsb.png" title="认证失败" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==3"><img src="@/assets/image/rzz.png"  title="认证中" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==4"><img src="@/assets/image/rzgq.jpg" title="认证过期" style="width: 24px;height: 24px"></span>
				</template>
			</el-table-column>
		</el-table>
	</el-card>


	<el-form :model="applyModel" :rules="rules" ref="applyModel" label-width="200px" size="mini" :inline="true">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>质检意见</span>
			</div>
			<el-row>
				<el-form-item prop="remarks" style="width:100%">
					<el-input type="textarea" :autosize="{ minRows: 4, maxRows:6}" placeholder="请输入质检意见" v-model="applyModel.remarks" style="width:80%;">
					</el-input>
				</el-form-item>
				<el-row style="text-align:center;">
					<el-button @click="handleQcCheckPass('applyModel')" type="success" size="mini">通过</el-button>
					<el-button @click="handleQcCheckRollback('applyModel')" type="warning" size="mini">退回</el-button>
					<el-button @click="handleQcCheckReject('applyModel')" type="danger" size="mini">拒贷</el-button>
					<el-button @click="handleQcCheckWaiver()" type="primary" size="mini">客户放弃</el-button>
					<el-button @click="gotoListView()" size="mini">取消</el-button>
				</el-row>
			</el-row>
		</el-card>
	</el-form>
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
			applyModel: {
				remarks: '',
				applyId: '',
			},
			authTable: null,
			rules: {
				remarks: [{
					required: true,
					message: '请输入质检复核意见',
					trigger: 'blur'
				}],
			},
		}
	},
	created() {
		const applyId = this.applyId
		this.applyModel.applyId = applyId;
		this.getPreRollBackInfo(applyId);

		var url = "/sys/userallauthinfo/selectallauthbyapplyid.do?applyId=" + applyId;
		findById(url).then(response => {
			this.authTable = response.data;
		})
	},
	methods: {
		handleQcCheckPass(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('确认客户资料无误，并提交初审审核?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						var url = "/sys/qccheck/createsubmit.do";
						fetchData(url, this.applyModel).then(response => {
							this.showInfo(response.data);
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消提交！'
						});
					});
				} else {
					console.log('数据格式错误或者未填写必要信息');
					return false;
				}
			});
		},
		handleQcCheckRollback(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('你确定退回客户的申请?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						var url = "/sys/qccheck/rollback.do";
						fetchData(url, this.applyModel).then(response => {
							this.showInfo(response.data);
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消退回！'
						});
					});
				} else {
					console.log('数据格式错误或者未填写必要信息');
					return false;
				}
			});
		},
		handleQcCheckReject(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('你确定拒绝客户的申请?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						var url = "/sys/qccheck/reject.do";
						fetchData(url, this.applyModel).then(response => {
							this.showInfo(response.data);
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消拒绝操作!'
						});
					});
				} else {
					console.log('数据格式错误或者未填写必要信息');
					return false;
				}
			});
		},
		handleQcCheckWaiver() {
			this.$confirm('客户确定放弃申请?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				var url = "/sys/qccheck/waiver.do";
				fetchData(url, this.applyModel).then(response => {
					this.showInfo(response.data);
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消拒绝操作!'
				});
			});
		},
		gotoListView() {
			this.$router.push({
				path: '/qccheck'
			});
		},
		showInfo(result) {
			if (result.success) {
				this.$message({
					message: result.msg,
					type: 'success' //success/warning/info/error
				});
				this.gotoListView();
				// this.getPager();
			} else {
				this.$message({
					message: result.msg,
					type: 'warning'
				});
			}
		},
		getPreRollBackInfo(applyId) {
			var url = '/sys/qccheck/prerollbackhis.do?applyId=' + applyId;
			findById(url).then(response => {
				this.preRollBacktableData = response.data;
				if (this.preRollBacktableData.length > 0) {
					this.showProRollBackInfo = true;
				}
			})
		},
		dateFor(row, column, cellValue) {
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
<style>
	#qc-remark-box .el-form-item__content{
		width: 100%;
		text-align: center;
	}
	#qc-remark-box .el-form-item__error{padding: 3px 10%;}
</style>
