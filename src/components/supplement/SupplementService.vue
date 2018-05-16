<template>

	<div id="ed-supplment-box">
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
						<span v-show="scope.row.auValue==0"><img src="@/assets/image/yrz.png"  title="已认证" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==1"><img src="@/assets/image/wrz.png"  title="未认证" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==2"><img src="@/assets/image/rzsb.png" title="认证失败" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==3"><img src="@/assets/image/rzz.png"  title="认证中" style="width: 24px;height: 24px"></span>
	        			<span v-show="scope.row.auValue==4"><img src="@/assets/image/rzgq.jpg" title="认证过期" style="width: 24px;height: 24px"></span>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		
		
		<el-form label-width="100px" class="sub-form" :model="applyModel" ref="applyModel">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>备注信息</span>
				</div>
				<el-row style="width:80%;padding-top:10px;margin: 0 auto;">
					<el-form-item prop="submitTypeText" label="备注信息" :rules="[
			      { required: true, message: '请填写备注信息', trigger: 'blur' },{max:500, message: '备注信息不能超过500字',trigger: 'blur'}
			    ]">
						<el-input v-model="applyModel.submitTypeText" type="textarea" placeholder="请输入内容" :autosize="{ minRows: 4, maxRows: 6}" style="min-width:450px;"></el-input>
					</el-form-item>

					<div class="btn">
						<el-button @click="handleQcCheckPass('applyModel')" type="success" size="mini">{{applyModel.handleOpinionVal}}</el-button>
						<el-button @click="gotoListView" type="warning" size="mini">返回列表</el-button>
						<el-button @click="giveupCustomer" type="primary" size="mini">客户放弃</el-button>
					</div>
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
	export default {
		name: 'applyInfo',
		props: {
			applyId: String
		},
		data() {
			return {
				applyModel: {
					submitTypeText: '',
					handleOpinionVal: '提交',
					applyId: '',
				},
				tableData: null,
				authTable: null
			}
		},
		created() {
			const applyId = this.applyId
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
		},
		methods: {
			giveupCustomer() {
				this.$confirm('客户确定放弃申请?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var url = "/sys/supplement/giveupapply.do";
					fetchData(url, {
						applyId: this.applyModel.applyId
					}).then(response => {
						const result = response.data;
						if(result.success) {
							this.$message({
								type: 'success',
								message: result.msg
							});
							this.$router.push({
								path: '/supplement'
							});
						} else {
							this.$message({
								type: 'error',
								message: result.msg
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消拒绝操作!'
					});
				});

			},
			handleQcCheckPass(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const applyId = this.applyId;
						this.$confirm('确认申请数据无误, 并提交申请?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							const url = "/sys/supplement/nextprocess.do";
							fetchData(url, {
								applyId: applyId,
								submitTypeText: this.applyModel.submitTypeText
							}).then(response => {
								const result = response.data;
								if(result.success) {
									this.$message({
										type: 'success',
										message: result.msg
									});
									this.$router.push({
										path: '/supplement'
									});
								} else {
									this.$message({
										type: 'error',
										message: result.msg
									});
								}
							})
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消提交!'
							});
						});
					} else {
						this.$message({
							type: 'warning',
							message: '请保证数据填写完整!'
						});
						return false;
					}
				});

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
	.sub-form,
	.el-textarea {
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	}

	.clearfix {
		font-size: 18px;
		font-weight: 600;
	}

	.btn {
		margin-left: 42%;
		margin-top: 10px;
	}
	.box-card{margin-bottom:15px;}
</style>
