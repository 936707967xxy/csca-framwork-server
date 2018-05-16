<template>
	<div id="credit-box" class="Credit-information">
		<!-- 信用信息 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>个人征信</span>
				<a type="primary" style="padding: 3px 5px;cursor:pointer;color:#409EFF;" class="el-icon-share" v-bind:href="htmlurl" target="_blank"></a>
			</div>
			<el-form ref="creditModel" :model="creditModel" label-width="220px" size="mini" :inline="true" class="a">

				<el-form-item label="未结清/销户账户（购房贷款）">
					<el-input v-model="creditModel.pbccre.wjqzh" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="发生过逾期的贷款账户数">
					<el-input v-model="creditModel.pbccre.yqzhs" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="逾期>90天贷款账户数">
					<el-input v-model="creditModel.pbccre.jstysyqzh" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="为他人担保笔数">
					<el-input v-model="creditModel.pbccre.wtrdbbs" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="授信时长">
					<el-input v-model="creditModel.pbccre.sxsc" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="信用卡授信总额">
					<el-input v-model="creditModel.pbccre.xyksxze" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="单张信用卡最高额度">
					<el-input v-model="creditModel.pbccre.dzxykzged" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="信用卡已使用额度占比">
					<el-input v-model="creditModel.pbccre.xyksyzb" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="近2年内信用卡逾期总月数">
					<el-input v-model="creditModel.pbccre.lnxykyqzys" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="2年内信用卡逾期>90天总次数">
					<el-input v-model="creditModel.pbccre.lnxykyjstqzys" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="信用卡当前逾期金额">
					<el-input v-model="creditModel.pbccre.zykdqyqje" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="房贷发放总额">
					<el-input v-model="creditModel.pbccre.fdze" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="房贷月还款总额">
					<el-input v-model="creditModel.pbccre.fdyh" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="房贷已还期数">
					<el-input v-model="creditModel.pbccre.fdyhqs" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="近3个月新增其他贷款笔数">
					<el-input v-model="creditModel.pbccre.jsyxzdkbs" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="非银行贷款占比">
					<el-input v-model="creditModel.pbccre.fyhdkzb" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="其他贷款月还款总额">
					<el-input v-model="creditModel.pbccre.qtdkyh" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="信用负债率">
					<el-input v-model="creditModel.pbccre.xyfzb" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="2年内贷款逾期总月数">
					<el-input v-model="creditModel.pbccre.lndkyqys" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="2年内贷款>90天逾期次数">
					<el-input v-model="creditModel.pbccre.lndkjstyqcs" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="贷款当前逾期金额">
					<el-input v-model="creditModel.pbccre.dkdqyqje" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="征信近1月内机构查询次数(不含贷后)">
					<el-input v-model="creditModel.pbccre.zxyycxcs" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="征信近1月内个人查询次数">
					<el-input v-model="creditModel.pbccre.zxyycxcssy" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="征信近3月内查询次数">
					<el-input v-model="creditModel.pbccre.zxsycxcs" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="近6个月个人查询次数(不含临柜)">
					<el-input v-model="creditModel.pbccre.jlycxchgrcx" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="近6个月保前审查次数">
					<el-input v-model="creditModel.pbccre.jlycxchbqsc" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="征信近3个月内查询次数(不含贷后管理)">
					<el-input v-model="creditModel.pbccre.jsycxchoutdh" :disabled="true"></el-input>
				</el-form-item>

			</el-form>
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>上海资信</span>
			</div>

			<div class="table-responsive">
				<el-form ref="creditModel" :model="creditModel" label-width="200px" size="mini" :inline="true">

					<el-form-item label="未结清贷款笔数">
						<el-input :disabled="true" type="mini" v-model="creditModel.userCis.wjqbs"></el-input>
					</el-form-item>

					<el-form-item label="贷款余额">
						<el-input :disabled="true" type="mini" v-model="creditModel.userCis.dkye"></el-input>
					</el-form-item>

					<el-form-item label="当前逾期总额">
						<el-input :disabled="true" type="mini" v-model="creditModel.userCis.dqyqZe"></el-input>
					</el-form-item>

					<el-form-item label="最高逾期金额">
						<el-input :disabled="true" type="mini" v-model="creditModel.userCis.zgyqJe"></el-input>
					</el-form-item>

					<el-form-item label="最高逾期期数">
						<el-input :disabled="true" type="mini" v-model="creditModel.userCis.zgyqQs"></el-input>
					</el-form-item>

					<el-form-item label="6月内查询次数">
						<el-input :disabled="true" type="mini" v-model="creditModel.userCis.lynzxcxs"></el-input>
					</el-form-item>

				</el-form>
			</div>
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>人法</span>
			</div>

		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>企业信用</span>
			</div>

		</el-card>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'credit',
		props: {
			applyId: String
		},
		data() {
			return {
				activeNames: ['1']
			}
		},
		created() {
			const applyId = this.applyId
			this.$store.dispatch('LoadCredit', applyId)
		},
		computed: {
			creditModel: {
				get() {
					return this.$store.state.audit.creditModel;
				},
				set(value) {
					this.editCredit = false
					this.$store.audit.commit('UPDATE_CREDIT', value)
				}
			},
			htmlurl: function() {
				return "/sys/pbccrc/html.do?applyId=" + this.applyId;
			}
		},
		methods: {

		}
	}
</script>
<style scoped>
	.el-card__body {
		padding: 0;
	}
	
	.el-form-item__label {
		min-width: 60px;
		text-align: right;
		padding-right: 8px;
		font-size: 12px;
	}
	
	.el-form--inline .el-form-item {
		display: inline-block;
	}
	
	.el-input.is-disabled .el-input__inner {
		width: 100px;
	}
	
	.clearfix span {
		font-size: 18px;
		font-weight: bold;
	}
	.box-card{margin-bottom: 15px;}
</style>
<style>
	@media screen and (max-width: 1366px) {
		.Credit-information .el-form-item--mini .el-form-item__label {
			width: 180px !important;
		}
		.Credit-information .el-form-item--mini .el-form-item__content {
			width: 90px !important;
		}
	}
</style>