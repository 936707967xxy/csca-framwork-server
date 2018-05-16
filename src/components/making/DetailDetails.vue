<template>
	<div id="making-detail-box" style="overflow-y: hidden">
		<el-form ref="contractModel" :model="contractModel" label-width="140px" size="mini" :inline="true">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span style="font-weight: bold;">借款需求</span>
				</div>
				<div class="text item contract1-information">
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
					<el-form-item label="开户行名称">
						<el-input v-model="contractModel.bank" disabled></el-input>
					</el-form-item>
					<el-form-item label="支行名称">
						<el-input v-model="contractModel.backBranch" disabled></el-input>
					</el-form-item>
					<div>
					<el-form-item label="支行详细地址" style="width:603px;">
						<el-input v-model="contractModel.proName+contractModel.cityName+contractModel.backBranchAddr" style="min-width:400px" disabled></el-input>
					</el-form-item>
					</div>
					<el-form-item label="账户户名">
						<el-input v-model="contractModel.custName" disabled></el-input>
					</el-form-item>
					<el-form-item label="银行卡卡号">
						<el-input v-model="contractModel.bankNo" disabled></el-input>
					</el-form-item>
					<el-form-item label="银行卡预留手机号">
						<el-input v-model="contractModel.bankPhoneNo" disabled></el-input>
					</el-form-item>
					<el-form-item label="签约日期">
						<el-input v-model="contractModel.signTime" disabled></el-input>
					</el-form-item>
					<el-form-item label="每月还款日">
						<el-input v-model="contractModel.payDate" disabled></el-input>
					</el-form-item>
					<el-form-item label="起息日期">
						<el-input v-model="contractModel.startTime" disabled></el-input>
					</el-form-item>
					<el-form-item label="到期日期">
						<el-input v-model="contractModel.endTime" disabled></el-input>
					</el-form-item>
				</div>
			</el-card>
			<el-card class="box-card box-card-body">
				<div slot="header" class="clearfix">
					<span style="font-weight: bold;">处理意见</span>
				</div>
				<div class="text item Handling-opinions" style="width:90%;margin: auto;">
					<el-form-item label="备注" style="width:100%;">
						<el-input type="textarea" size="medium" style="width:87%;" :autosize="{ minRows: 4, maxRows: 6}" v-model="remarks" disabled></el-input>
					</el-form-item>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span style="font-weight: bold;">审核意见</span>
				</div>
				<el-table :data="listRemarks" border style="width: 100%" cell-class-name="cell-class">
					<el-table-column prop="taskId" label="审核节点" min-width="80"></el-table-column>
					<el-table-column prop="handleRemarks" label="备注" min-width="80"></el-table-column>
					<el-table-column prop="checkDate" label="审核时间" min-width="80"></el-table-column>
				</el-table>
			</el-card>

			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span style="font-weight: bold;">还款计划</span>
				</div>
				<el-table :data="contractModel.repaymentPlans" border style="width: 100%" cell-class-name="cell-class">
					<el-table-column prop="shouldTerm" label="期数" min-width="30"></el-table-column>
					<el-table-column prop="strShouldDate" label="应还日期" min-width="90"></el-table-column>
					<el-table-column prop="shouldInte" label="月还利息" min-width="70"></el-table-column>
					<el-table-column prop="shouldCapi" label="月还本金" min-width="70"></el-table-column>
					<el-table-column prop="shouldAmt" label="月还金额" min-width="70"></el-table-column>
					<el-table-column prop="endBal" label="剩余本金" min-width="80"></el-table-column>
					<el-table-column prop="advanceMoney" label="提前还款额" min-width="80"></el-table-column>
				</el-table>
			</el-card>
		</el-form>
	</div>
</template>

<script>
	import { fetchData, findById, updateData, createDataJson } from '@/apis/httpapis'
	export default {
		name: 'DetailCon',
		data() {
			return {
				contact: false,
				//detail:"",
				showFileList: true,
				remarks: "",
				//handleRemarks: "",
				applyId: "",
				listRemarks: [],
				fileList: []

			}
		},
		computed: {
			contractModel: {
				get() {
					return this.$store.getters.contractModel;
				},
				set(value) {
					this.$store.contract.commit('SET_CONTRACT', value)
				}
			}
		},
		created() {

			const applyId = this.$route.params.applyId;
			this.applyId = applyId;
			findById("/sys/opinion/remark.do?applyId=" + this.applyId)
				.then(response => {
					this.remarks = response.data;
				});
			/*	findById("/sys/rollback/handleRemarks.do?applyId=" + this.applyId)
					.then(response => {
						this.handleRemarks = response.data;
					});*/
			findById("/sys/rollback/listremarks.do?applyId=" + this.applyId)
				.then(response => {
					this.listRemarks = response.data;
				});
			this.$store.dispatch('LoadContractApp', applyId);
		},
		methods: {
			//取消
			backApply() {
				this.gotoListView();
			},
			gotoListView() {
				this.$router.push({
					path: '/making'
				});
			},
			dateFor(row, column, cellValue) {
				if(typeof(cellValue) != "undefined") {
					return formatDate(new Date(cellValue), 'yyyy-MM-dd');
				}

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

	.making-detail-box .box-card {
		margin-bottom: 20px;
		font-weight: normal;
	}

	.clearfix span {
		font-size: 18px;
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

	.contract1-information .el-form-item {
		width: 380px;
		text-align: center;
	}
	.box-card{margin-bottom: 15px;}
</style>
<style>
	@media only screen and (max-width:1366px) {
		.contract1-information .el-form-item--mini .el-form-item__content,
		.contract1-information .el-form-item--mini .el-form-item__label {
			width: 125px !important;
		}
		.contract1-information .el-form-item {
			width: 250px !important;
			text-align: center !important;
		}
		.Handling-opinions .el-textarea__inner {
			width: 80% !important;
		}
	}

	.box-card-body .el-form-item .el-form-item--mini {
		width: 100%;
	}

	.box-card-body .el-form-item__content {
		width: 90%;

	}

	.box-card-body .el-form-item__label {
		width: 80px !important;
	}
</style>
