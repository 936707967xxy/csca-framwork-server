<template>
	<div id="apply-info-box">

		<!-- 借款需求 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="header-Title" style="font-weight:bold;">借款需求{{applyModel.loanId}}</span>
			</div>
			<span class="content-body">
					<label class="lable-tit">申请门店</label>
					<span class="data-span">{{applyModel.storeName}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">销售团队</label>
					<span class="data-span">{{applyModel.salesEmpDeptName}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">客户经理</label>
					<span class="data-span">{{applyModel.salesEmpName}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">申请金额</label>
					<span class="data-span">{{applyModel.applyAmount}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">申请产品</label>
					<span class="data-span">{{applyModel.productName}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">申请期数</label>
					<span class="data-span">{{applyModel.applyPeriod}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">借款用途</label>
					<span class="data-span">{{applyModel.loanUseVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">客户来源</label>
					<span class="data-span">{{applyModel.sourcesValue}}</span>
			</span>
			<div style="color: red;">
				<span class="content-body">
					<label class="lable-tit">建议结果</label>
					<span class="data-span">{{applyModel.suggestResultVal}}</span>
				</span>
				<span class="content-body">
						<label class="lable-tit">建议原因</label>
						<span class="data-span">{{applyModel.suggestResultCause}}</span>
				</span>
			</div>	
		</el-card>

		<!-- 客户信息 -->
		<el-card class="box-card userimage">
			<div slot="header" class="clearfix">
				<span class="header-Title" style="font-weight:bold;">个人信息</span>
			</div>
			<span class="content-body">
					<label class="lable-tit">姓名</label>
					<span class="data-span">{{applyModel.custName}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">曾用名</label>
					<span class="data-span">{{applyModel.nameBefore}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">证件号</label>
					<span class="data-span">{{applyModel.idNumber}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">性别</label>
					<span class="data-span">{{applyModel.custSex}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">学历</label>
					<span class="data-span">{{applyModel.eduBackgroundVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">毕业院校</label>
					<span class="data-span">{{applyModel.graduateInstitutions}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">婚姻状况</label>
					<span class="data-span">{{applyModel.maritalStatusVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">移动电话</label>
					<span class="data-span">{{applyModel.custMobile}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">QQ/微信</label>
					<span class="data-span">{{applyModel.qqWechat}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">住宅电话</label>
					<span class="data-span">{{applyModel.houseTel}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">电子邮箱</label>
					<span class="data-span">{{applyModel.email}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">供养人数</label>
					<span class="data-span">{{applyModel.raisePerson}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">子女人数</label>
					<span class="data-span">{{applyModel.childNumber}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">现居状况</label>
					<span class="data-span">{{applyModel.liveConditionsVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">月租金</label>
					<span class="data-span">{{applyModel.rentMonthlyPay}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">来申请地时间</label>
					<span class="data-span">{{applyModel.startResidenceDate}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">现居住地居住时间</label>
					<span class="data-span">{{applyModel.comeHereDate}}</span>
			</span>
			<span class="content-body" style="min-width:680px;">
					<label class="lable-tit">户口所在地</label>
					<span class="data-span">{{applyModel.rresidenceAddress}}</span>
			</span>
			<span class="content-body" style="min-width:600px;">
					<label class="lable-tit">现居住地</label>
					<span class="data-span">{{applyModel.houseAddress}}</span>
			</span>
			<span class="content-body data-inner1" style="min-width:600px;">
					<label class="lable-tit">邮寄地址</label>
					<span class="data-span">{{applyModel.validMailAddrVal}}</span>
			<span class="data-span data-span-inner">{{applyModel.validMailAddrTxt}}</span>
			</span>
		</el-card>

		<!-- 资产信息 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="header-Title" style="font-weight:bold;">资产信息</span>
			</div>
			<span class="content-body">
					<label class="lable-tit">房产类型</label>
					<span class="data-span">{{applyModel.assetInfo.propertyTypeVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">房产建筑面积</label>
					<span class="data-span">{{applyModel.assetInfo.gfa}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">购买/建造总价</label>
					<span class="data-span">{{applyModel.assetInfo.proBuyPrice}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">借款余额</label>
					<span class="data-span">{{applyModel.assetInfo.proLoans}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">借款年限</label>
					<span class="data-span">{{applyModel.assetInfo.proLoanLife}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">月还款金额</label>
					<span class="data-span">{{applyModel.assetInfo.proMortgageMonthly}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">房产取得时间</label>
					<span class="data-span">{{applyModel.assetInfo.proBuyTime}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">剩余期限</label>
					<span class="data-span">{{applyModel.assetInfo.proCreditPeriod}}</span>
			</span>
			<span class="content-body" style="min-width:680px;">
					<label class="lable-tit">房产地址</label>
					<span class="data-span">{{applyModel.assetInfo.propertyAddress}}</span>
			<!-- propertyAddress-->
			</span>
			<div>
				<span class="content-body">
					<label class="lable-tit">拥有车辆</label>
					<span class="data-span">{{applyModel.assetInfo.carHavaVal}}</span>
				</span>
				<span class="content-body">
					<label class="lable-tit">购买价</label>
					<span class="data-span">{{applyModel.assetInfo.priceCar}}</span>
				</span>
				<span class="content-body">
					<label class="lable-tit">车龄</label>
					<span class="data-span">{{applyModel.assetInfo.carAge}}</span>
				</span>
				<span class="content-body">
					<label class="lable-tit">贷款发放日期</label>
					<span class="data-span">{{applyModel.assetInfo.carLoanDate}}</span>
				</span>
				<span class="content-body">
					<label class="lable-tit">按揭月供</label>
					<span class="data-span">{{applyModel.assetInfo.carMortgageMonthly}}</span>
				</span>
				<span class="content-body">
					<label class="lable-tit">贷款总额</label>
					<span class="data-span">{{applyModel.assetInfo.carLoanCeiling}}</span>
				</span>
				<span class="content-body">
					<label class="lable-tit">借款余额</label>
					<span class="data-span">{{applyModel.assetInfo.carBanlanceVal}}</span>
				</span>
				<span class="content-body">
					<label class="lable-tit">剩余期限</label>
					<span class="data-span">{{applyModel.assetInfo.carPeriodVal}}</span>
				</span>
			</div>
		</el-card>

		<!-- 职业信息 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="header-Title" style="font-weight:bold;">职业信息</span>
			</div>
			<span class="content-body">
					<label class="lable-tit">工作单位</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.fullWorkName}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">所属行业</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.industryVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">单位电话</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.companyTel}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">单位性质</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.companyKindVa}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">职级</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.positionVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">所在部门</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.workDept}}</span>
			</span>
			<span class="content-body" style="min-width:610px;">
					<label class="lable-tit">单位地址</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.companyAddress}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">公司规模</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.companySizeVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">邮编</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.companyZipCode}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">每月发薪日</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.payDayMonthlyVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">社保情况</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.socialSecurityVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">职务名称</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.jobTitle}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">其他收入(月均)</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.othterIncomeMonthly}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">每月薪金</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.salaryMonthly}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">发薪方式</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.payMethodVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">进入单位时间</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.startWorkTime}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">私营企业类型</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.privateTypeVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">员工人数</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.employeesNum}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">经营场所</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.premisesVal}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">成立时间</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.companyRegtime}}</span>
			</span>
			<span class="content-body">
					<label class="lable-tit">股份占比</label>
					<span class="data-span">{{applyModel.userOccupationalInfo.percentageShares}}</span>
			</span>
		</el-card>
		<!-- 联系人信息 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="header-Title" style="font-weight:bold;">联系人信息</span>
			</div>
			<el-table ref="singleTable" :data="applyModel.userContacts" style="width: 100%">
				<el-table-column type="index" min-width="10px">
				</el-table-column>
				<el-table-column property="name" label="姓名" min-width="120px">
				</el-table-column>
				<el-table-column property="relationshipVal" label="关系" min-width="100px">
				</el-table-column>
				<el-table-column property="phone" label="联系方式" min-width="150px">
				</el-table-column>
				<el-table-column property="companyName" label="工作单位" min-width="300px">
				</el-table-column>
				<el-table-column property="contactAddress" label="单位/居住地址" min-width="300px">
				</el-table-column>
				<el-table-column property="isKnowVal" label="是否知晓" min-width="120px" fixed="right">
				</el-table-column>
			</el-table>
		</el-card>
		</el-card>
				<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="header-Title" style="font-weight:bold;">备注信息</span>
			</div>
			<div class="Note-information">
				<el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="submitTypeText" :disabled="true">
				</el-input>
			</div>
		</el-card>
	</div>
</template>

<script>
	//mapState，mapGetters,mapMutations,mapActions
	import {
		mapState
	} from 'vuex'
	import {
		findById
	} from '@/apis/httpapis'

	export default {

		name: 'applyInfo',
		props: {
			applyId: String
		},
		data() {
			return {
				submitTypeText:''
			}
		},
		computed: mapState({
			applyModel: state => state.audit.applyModel
		}),
		created() {
			const applyId = this.applyId
			this.$store.dispatch('LoadApplyInfo', applyId).then(() => {

			}).catch(() => {

			})
			var url = "/sys/applymodel/submitfindbyid.do?applyId=" + applyId
			findById(url).then(response => {
				if(response.data.submitTypeText != null) {
					this.submitTypeText = response.data.submitTypeText;
				}
			})
		},
		methods: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#apply-info-box {
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		font-size: 12px;
	}
	
	.lable-tit {
		font-size: 14px;
		display: inline-block;
		min-width:120px;
		float: left;
		text-align: right;
		box-sizing: border-box;
		padding-right: 8px;
		font-weight: 400;
		padding-bottom:5px;
	}
	.data-span {
		float: left;
		font-size: 12px;
		display: inline-block;
		height: 28px;
		width: auto;
		min-width: 70px;
		border: 1px solid #d8dce5;
		border-radius: 4px;
		line-height: 28px;
		color: #5a5e66;
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		background-color: #f5f7fa;
		cursor: not-allowed;
		padding: 0 6px;
		font-weight: 400;
		max-width:100%;
		overflow: hidden;
	}
	
	.data-span-inner {
		position: absolute;
		margin-left:8px;
	}
	

	.data-span {
		margin: 0;
	}
	
	.clearfix i {
		color: #409EFF;
		font-size: 14px;
		cursor: pointer;
		margin-left: 15px;
	}
	
	.icon-minus {
		color: #409EFF;
		font-size: 18px;
		cursor: pointer;
		margin-left: 15px;
	}
	.data-inner1 {
		position: relative;
	}
	
	.content-body {
		height:25px;
		line-height:30px;
		display: inline-block;
		min-width:300px;
		margin: 10px 0 10px 10px;
	}
	
	.header-Title {
		font-size: 18px;
	}
	
	.el-card__body {
		padding: 0;
	}
	
	.grid-content {
		font-size: 14px;
	}	
	.box-card {
		margin-bottom: 15px;
	}
</style>