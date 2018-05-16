<template>
<div id="au-apply-box">
	<el-form label-width="100px" class="sub-form" :model="applyModel" ref="applyModel">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="font-weight: bold;">认证清单</span>
			</div>
			<div class="grid-content bg-purple-dark">
				<el-table :data="authTable" border style="width:80%;margin:0 auto;" cell-class-name="cell-class">
					<el-table-column label="认证名称">
						<template slot-scope="scope">
								<div class="title-box" v-if="scope.row.auKey === 'creditInvestigation'">
									<span style="font-weight: bold;">{{scope.row.auName}}</span>
								  <a type="primary" style="padding: 4px 5px;cursor:pointer;color:#409EFF;" class="el-icon-share" v-bind:href="'/sys/pbccrc/html.do?applyId='+applyId" target="_blank"></a>
								</div>
								<div class="title-box" v-else>
									<span style="font-weight: bold;">{{scope.row.auName}}</span>
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
			</div>
		</el-card>

		<el-card class="box-card" style="margin-top:15px;">
			<div slot="header" class="clearfix">
				<span style="font-weight: bold;">备注信息</span>
			</div>
			<div style="width: 80%;margin: 0 auto;">
				<el-form-item prop="remarks" label="备注信息" :rules="[
			      { required: true, message: '请填写备注信息', trigger: 'blur' },{max:500, message: '备注信息不能超过500字',trigger: 'blur'}
			    ]">
					<el-input v-model="applyModel.remarks" type="textarea" placeholder="请输入内容" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
				</el-form-item>

				<div class="btn">
					<el-button @click="handleSubmit('applyModel')" type="success" size="mini">{{applyModel.handleOpinionVal}}</el-button>
					<el-button @click="handleClickDel" type="danger" size="mini">拒贷</el-button>
					<el-button @click="gotoListView" type="warning" size="mini">返回列表</el-button>
				</div>
			</div>
		</el-card>
	</el-form>
</div>
</template>

<script>
import {
	findById,
	fetchData,
	removeData
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
			authTable: null,
		}
	},
	created() {
		const applyId = this.applyId
		var url = "/sys/userallauthinfo/selectallauthbyapplyid.do?applyId=" + applyId;
		findById(url).then(response => {
			this.authTable = response.data;
		})
	},
	methods: {
		handleClickDel(){
					const applyId = this.applyId;
					this.$confirm('确定要取消此申请?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '返回',
						type: 'warning'
					}).then(() => {
					findById('sys/blackinfo/lduinterceptor.do?applyId=' + applyId) //判断节点+登录、录单是否一致规则
					.then(response => {
						var result = response.data
						if(result.success) {
							var url = "/sys/applymodel/refuseapply.do?applyId=" + applyId;
							removeData(url).then(response => {
									var result = response.data
									if(result.success) {
										this.$message({
											message: '拒贷成功',
											type: 'success' //success/warning/info/error
										});
										this.gotoListView();
									} else {
										this.$message({
											message: '拒贷失败',
											type: 'warning'
										});
									}
								})
						} else {
							this.$message({
								message: result.msg,
								type: 'warning'
							});
						}
					});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已返回操作!'
						});
					});
		},
		handleSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const applyId = this.applyId;
					this.$confirm('确认申请数据无误, 并提交申请?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						const url = "/sys/apply/start.do";
						fetchData(url, {
							applyId: applyId,
							submitTypeText: this.applyModel.remarks
						}).then(response => {
							const result = response.data;
							if (result.success) {
								this.$message({
									type: 'success',
									message: result.msg
								});
								this.$router.push({
									path: '/apply'
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
				path: "/apply"
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
	margin-left: 38%;
	margin-top: 10px;
}

.btn .el-button {
	font-size: 14px;
}

.el-tabs__content {
	height: 75vh;
	overflow: auto;
}

#au-apply-box {
	padding-bottom: 20px;
}
</style>
