<template>
	<div id="making-detail-box">
		<el-form ref="contractModel" :model="contractModel" label-width="140px" size="mini" :inline="true">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>借款需求</span>
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
					<el-form-item label="批准期限">
						<el-input v-model="contractModel.productPeriod" disabled></el-input>
					</el-form-item>
					<el-form-item label="批准金额">
						<el-input v-model="contractModel.loanAmount" disabled></el-input>
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
					<el-form-item label="支行详细地址">
						<el-input v-model="detail" disabled></el-input>
					</el-form-item>
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
			<el-card class="box-card el-card-box">
				<div slot="header" class="clearfix">
					<span>处理意见</span>
				</div>
				<!--<el-upload :action="uploadUrl"
		          list-type="picture-card"
		          :show-file-list="showFileList"
		          :file-list="fileList"
		          accept="image/*"
		          style="margin-bottom:20px;" disabled>
		       </el-upload>-->
				<div class="text item Handling-opinions" style="width:100%;">
					<el-form-item label="备注" prop="remarks" style="width:80%;margin-left:10%;">
						<el-input type="textarea" size="medium" :autosize="{ minRows: 4, maxRows: 6}" v-model="contractModel.remarks" disabled></el-input>
					</el-form-item>
				</div>
			</el-card>
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
					<el-table-column prop="bal" label="剩余本金"></el-table-column>
					<el-table-column prop="advanceShould" label="提前还款额"></el-table-column>
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
				detail: "",
				showFileList: true,
				remarks: "",
				applyId: "",
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
			},
			uploadUrl: function() {
				return "/sys/making/upload.do?applyId=" + this.applyId;
			}
		},
		created() {
			const applyId = this.$route.params.applyId;
			this.applyId = applyId;
			this.$store.dispatch('LoadContractApp', applyId);
			this.detail = this.contractModel.proName + this.contractModel.cityName + this.contractModel.backBranchAddr;
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
	.el-card-box .el-form-item__content {
		width: 80%;
	}
	
	.el-card-box .el-form-item__label {
		width: 90px !important;
	}
</style>