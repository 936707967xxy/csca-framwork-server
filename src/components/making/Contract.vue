<template>
	<div id="contract-box">
		<el-form ref="contractModel" :rules="rules" :model="contractModel" label-width="140px" size="mini" :inline="true">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>基本信息</span>
				</div>
				<div class="text item">
					<el-form-item label="申请金额">
						<el-input v-model="contractModel.applyMoney" disabled></el-input>
					</el-form-item>
					<el-form-item label="客户姓名">
						<el-input v-model="contractModel.custName" disabled></el-input>
					</el-form-item>
					<el-form-item label="身份证号">
						<el-input v-model="contractModel.idNumber" disabled></el-input>
					</el-form-item>
					<el-form-item label="产品">
						<el-input v-model="contractModel.productName" disabled></el-input>
					</el-form-item>
					<el-form-item label="批核期限">
						<el-input v-model="contractModel.productPeriod" disabled></el-input>
					</el-form-item>
					<el-form-item label="综合年化成本">
						<el-input v-model="contractModel.irrVal" disabled></el-input>
					</el-form-item>
					<el-form-item label="批核金额">
						<el-input v-model="contractModel.loanAmount" disabled></el-input>
					</el-form-item>
					<el-form-item label="批核费率">
						<el-input v-model="contractModel.realRate" disabled></el-input>
					</el-form-item>
					<el-form-item label="合同金额">
						<el-input v-model="contractModel.conAmount" disabled></el-input>
					</el-form-item>

					<el-form-item label="开户行名称" prop="bankId">
						<el-select placeholder="请选择" v-model="contractModel.bankId" @change="bankchange" style="width: 178px;">
							<el-option v-for="item in productTypes" :key="item.pid" :label="item.bankname" :value="item.pid">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="支行名称" prop="backBranch">
						<el-input v-model="contractModel.backBranch"></el-input>
					</el-form-item>
				<span style="display:inline-block;width:663px;">
							<el-form-item label="支行地址" prop="proId">
								<el-select v-model="contractModel.proId" placeholder="请选择省" @change="rresidencePchange" style="width:125px;">
									<el-option v-for="item in rresidenceP" :key="item.PROVINCEID" :label="item.PROVINCE" :value="item.PROVINCEID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="cityId" class="pro-width">
								<el-select v-model="contractModel.cityId" placeholder="请选择市" @change="rresidenceCchange" style="width:125px;">
									<el-option v-for="item in rresidenceC" :key="item.CITYID" :label="item.CITY" :value="item.CITYID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="backBranchAddr" class="pro-width">
								<el-input v-model="contractModel.backBranchAddr" placeholder="支行详细地址" style="min-width:220px;"></el-input>
							</el-form-item>
			</span>
					<el-form-item label="账户户名">
						<el-input v-model="contractModel.custName" disabled></el-input>
					</el-form-item>
					<el-form-item label="银行卡卡号" prop="bankNo">
						<el-input v-model="contractModel.bankNo" @blur="getBank"></el-input>
					</el-form-item>
					<el-form-item label="银行卡预留手机号" prop="bankPhoneNo">
						<el-input v-model="contractModel.bankPhoneNo"></el-input>
					</el-form-item>
					<el-form-item label="签约日期" :rules="[{type: 'date', required: true, message: '请选择签约日期', trigger: 'change'}]">
						<el-date-picker type="date" class="date-signtime" style="width: 178px;" :clearable="false" :editable="false" placeholder="选择日期" v-model="contractModel.signTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" disabled>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="每月还款日">
						<el-input v-model="contractModel.payDate" disabled></el-input>
					</el-form-item>
					<el-form-item label="起息日期">
						<el-input v-model="contractModel.strStartDate" disabled></el-input>
					</el-form-item>
					<el-form-item label="到期日期">
						<el-input v-model="contractModel.strEndDate" disabled></el-input>
					</el-form-item>
				</div>

				<div style="text-align:center">
					<el-button type="success" size="small" @click="onSubmit('contractModel')" v-loading.fullscreen.lock="fullscreenLoading" v-show="contact">确定</el-button>
					<el-button @click="createCon" size="small" type="success" v-show="!contact">拟制</el-button>
					<el-button @click="backApply" size="small" type="warning">取消</el-button>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>审核意见</span>
				</div>
				<el-table :data="listRemarks" border style="width: 100%" cell-class-name="cell-class">
					<el-table-column prop="taskId" label="审核节点" min-width="80"></el-table-column> 
					<el-table-column prop="handleRemarks" label="备注" min-width="80"></el-table-column>
					<el-table-column prop="checkDate" label="审核时间" min-width="80"></el-table-column>
				</el-table>
			</el-card>

			<div v-show="contact">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>还款计划</span>
					</div>
					<el-table :data="contractModel.repaymentPlans" border style="width: 100%" cell-class-name="cell-class">
						<el-table-column prop="shouldTerm" label="期数"></el-table-column>
						<el-table-column prop="strShouldDate" label="应还日期"></el-table-column>
						<el-table-column prop="shouldInte" label="月还利息"></el-table-column>
						<el-table-column prop="shouldCapi" label="月还本金"></el-table-column>
						<el-table-column prop="shouldAmt" label="月还金额"></el-table-column>
						<el-table-column prop="endBal" label="剩余本金"></el-table-column>
						<el-table-column prop="advanceMoney" label="提前还款额"></el-table-column>
					</el-table>

				</el-card>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {
		fetchData,
		findById,
		updateData,
		createDataJson
	} from '@/apis/httpapis'
	export default {
		name: 'createCon',
		data() {
			return {
				applyId: "",
				proId: '',
				remarks: "",
				contact: false,
				fullscreenLoading: false,
				listRemarks:[],
				rresidenceP: [], //省下拉列表
				rresidenceC: [], //市下拉列表
				productTypes: [],
				rules: {
					bank: [{
							required: true,
							message: '请输入开户行名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在3到20个字符',
							trigger: 'blur'
						}
					],
					bankId: [{
						required: true,
						message: "请选择开户行",
						trigger: "change"
					}],
					proId: [{
						required: true,
						message: "请选择省份",
						trigger: "change"
					}],
					cityId: [{
						required: true,
						message: "请选择市",
						trigger: "change"
					}],
					backBranch: [{
						required: true,
						message: '请输入支行名称',
						trigger: 'blur'
					}],
					backBranchAddr: [{
						required: true,
						message: '请输入支行详细地址',
						trigger: 'blur'
					}],
					bankNo: [{
							required: true,
							message: '请输入银行卡号',
							trigger: 'blur'
						},
						{
							pattern: /^\d{15,19}$/,
							message: '请输入正确的银行卡号',
							trigger: 'blur'
						}
					],
					signTime: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}],
					bankPhoneNo: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							pattern: /^1[34578]\d{9}$/,
							message: '请输入正确的手机号',
							trigger: 'blur'
						}
					]
				}

			}
		},
		computed: {
			contractModel: {
				get() {
					//console.info("#####" + JSON.stringify(this.$store.getters.contractModel))
					return this.$store.getters.contractModel;
				},
				set(value) {
					this.$store.commit('SET_CONTRACT', value)
				}
			}
		},
		created() {
			const applyId = this.$route.params.applyId;
			this.applyId = applyId;
			this.$store.dispatch('InitContractData', applyId).then(res => {
				this.proId = res.data.proId;
				findById("/sys/applymodel/findallprovinces.do") //初始化省市联动
					.then(response => {
						this.rresidenceP = response.data;
					});
				findById("/sys/rollback/listremarks.do?applyId=" + this.applyId) //初始化省市联动
				.then(response => {
					this.listRemarks = response.data;
				});

				var proIds = this.proId;
				if(proIds != null && proIds != undefined && proIds != '') {
					findById("/sys/applymodel/findcitiebypro.do?provinceId=" + proIds)
						.then(response => {
							this.rresidenceC = response.data;
						});
				}
			});
			// var url = "/sys/making/selectByApplyId.do?applyId="+applyId;
			// findById(url).then(response => {
			//   this.contractModel = response.data;
			// })
			findById('/sys/bank/banks.do')
				.then(response => {
					this.productTypes = response.data;
				});

		},
		mounted() {

		},
		methods: {
			getBank() {
				var bankId = this.contractModel.bankId;
				if(bankId == null || bankId == undefined || bankId == '') {
					this.$message({
						type: 'error',
						message: '请选择开户行!'
					});
					return;
				} else {
					var url = "/sys/making/tianxing.do";
					fetchData(url, {
						bankId: this.contractModel.bankId,
						bankNo: this.contractModel.bankNo
					}).then(response => {
						if(response.data.success) {
							this.$message({
								type: 'success',
								message: response.data.msg
							});
						} else {
							this.$message({
								type: 'error',
								message: response.data.msg
							});
						}
					});
				}
			},
			createCon() {
				var bankId = this.contractModel.bankId;
				if(bankId == null || bankId == 'undefined' || bankId == '') {
					this.$message({
						type: 'error',
						message: '请选择开户行!'
					});
					return;
				}
				const applyId = this.applyId;

				this.$confirm('你确定数据无误，并生成合同数据?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.fullscreenLoading = true;
					var url = "/sys/making/repayment.do";
					fetchData(url, {
						proId: this.contractModel.proId,
						proName: this.contractModel.proName,
						cityId: this.contractModel.cityId,
						cityName: this.contractModel.cityName,
						bankId: this.contractModel.bankId,
						backBranch: this.contractModel.backBranch,
						backBranchAddr: this.contractModel.backBranchAddr,
						bankNo: this.contractModel.bankNo,
						bankPhoneNo: this.contractModel.bankPhoneNo,
						applyId: applyId
					}).then(response => {
						this.contact = true;
						//console.info(JSON.stringify(response.data)); dates: null
						this.contractModel = response.data;
					});
					this.fullscreenLoading = false;
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消协议创建!'
					});
				});
			},
			bankchange(value) {
				for(var i = 0; i < this.productTypes.length; i++) {
					if(value == this.productTypes[i].bankid) {
						this.contractModel.bank = this.productTypes[i].bankname;
					}
				}
			},
			rresidencePchange(value) {
				//console.log("选中省获取下级市 :  "+value);
				this.contractModel.cityId = "";

				this.rresidenceC = "";

				findById(
					"/sys/applymodel/findcitiebypro.do?provinceId=" + value
				).then(response => {
					this.rresidenceC = response.data;
				});
				//获取省名称---赋值给对象
				for(var i = 0; i < this.rresidenceP.length; i++) {
					if(value == this.rresidenceP[i].PROVINCEID) {
						this.contractModel.proName = this.rresidenceP[i].PROVINCE;
					}
				}
			},
			rresidenceCchange(value) {

				//获取市名称---赋值给对象
				for(var i = 0; i < this.rresidenceC.length; i++) {
					if(value == this.rresidenceC[i].CITYID) {
						this.contractModel.cityName = this.rresidenceC[i].CITY;
					}
				}
			},
			//提交
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$confirm('你确定合同数据生成无误?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.fullscreenLoading = true;
							var url = "/sys/making/create.do";
							createDataJson(url, this.contractModel).then(res => {
								if(res.data.success) {
									this.$message({
										type: 'success',
										message: res.data.msg
									});
									this.gotoListView();
								} else {
									this.$message({
										type: 'info',
										message: res.data.msg
									});
								}
							});
							this.fullscreenLoading = false;

						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消协议创建!'
							});
							this.gotoListView();
						});
					} else {
						this.$message({
							type: 'info',
							message: '数据填写格式有误!'
						});
						return false;
					}
				})
			},
			//取消
			backApply() {
				this.gotoListView();
			},
			gotoListView() {
				this.$router.push({
					path: '/making'
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#id {
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		font-size: 14px;
	}
	
	.el-form-item--mini .el-form-item__content,
	.el-form-item--mini .el-form-item__label {
		font-weight: 600;
		color: #2D2F33;
		font-size: 16px;
	}
	
	.box-card {
		margin-bottom: 20px;
	}
	
	.clearfix span {
		font-size: 18px;
		font-weight: 600;
	}
	
	.clearfix i {
		color: #409EFF;
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
		margin-left: 15px;
	}
	
	.icon-minus {
		color: #409EFF;
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
		margin-left: 15px;
	}
	
</style>
<style>
	#contract-box .el-form-item__label{font-weight:500 !important;}
	@media screen and (max-width: 1366px) {
		#create-contract-box .el-form-item--mini .el-form-item__label {
			width: 180px !important;
		}
		#create-contract-box .el-form-item--mini .el-form-item__content {
			width: 160px !important;
		}
		#create-contract-box .date-signtime {
			width: 160px !important;
		}
		.pro-width {
			margin-left: 5px;
		}
	}
</style>