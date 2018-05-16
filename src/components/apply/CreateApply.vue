<template>
	<div id="apply-create-box" class="create-box">
		<el-form ref="applyModel" :model="applyModel" :rules="rulesApplyModel" label-width="140px" size="mini" :inline="true">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>借款需求</span>
				</div>
				<div class="text item firstBox">
					<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="客户经理" prop="salesEmpDeptId">
								<el-select placeholder="请选择" v-model="applyModel.salesEmpDeptId" @change="changeDept" style="width:120px;">
									<el-option v-for="item in department" :key="item.storeId" :label="item.storeName" :value="item.storeId">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="salesEmpId">
								<el-select v-model="applyModel.salesEmpId" placeholder="请选择" style="width:110px;" @change="changeSales">
									<el-option v-for="item in salesSelect" :key="item.empId" :label="item.empName" :value="item.empId">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="申请金额" prop="applyAmount">
							<el-input v-model.number="applyModel.applyAmount"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="申请产品" prop="productTypeId">
								<el-select placeholder="请选择" v-model="applyModel.productTypeId" @change="changeProductType" style="width:100px;">
									<el-option v-for="item in productType" :key="item.prodId" :label="item.prodName" :value="item.prodId">
									</el-option>
								</el-select>						
								</el-form-item>
								<el-form-item  prop="productId">
									<el-select v-model="applyModel.productId" placeholder="请选择" style="width:120px;" @change="changeProduct">
										<el-option v-for="item in product" :key="item.prodId" :label="item.prodName" :value="item.prodId">
										</el-option>
									</el-select> 
								</el-form-item>
						</el-col>
						</el-row>
						<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="申请期限" prop="applyPeriod">
								<el-input v-model="applyModel.applyPeriod" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16" class="applyMoney">
							<el-form-item label="借款用途" prop="loanUse">
								<el-select placeholder="请选择" v-model="applyModel.loanUse" @change="loanUseChange" style="width:178px;">
									<el-option v-for="item in loanUseRadio" :key="item.value" :label="item.text" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="loanUseText">
									<el-input class="explain" size="mini" v-model="applyModel.loanUseText" style="min-width:120px;" placeholder="其他值" :disabled="loanUseFlag"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				<el-row>						
						<el-col :span="24">
							<el-form-item label="客户来源" prop="sources">
								<el-radio-group @change="sourcesChange" v-model="applyModel.sources">
									<el-radio v-for="item in sourcesRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item prop="sourcesText">
								<el-input class="explain" size="mini" v-model="applyModel.sourcesText" placeholder="其他值" style="min-width:120px;" :disabled="sourcesFlag"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-card>
		<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>个人信息</span>
					<i class="el-icon-plus" @click="queryIntention"></i>
				</div>
				<div class="text item">
					<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="姓名" prop="custName">
								<el-input v-model="applyModel.custName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="性别" prop="custSex">
								<el-radio-group v-model="applyModel.custSex">
									<el-radio label="男">男</el-radio>
									<el-radio label="女">女</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="曾用名" prop="nameBefore">
								<el-input v-model="applyModel.nameBefore"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="毕业院校" prop="graduateInstitutions">
								<el-input v-model="applyModel.graduateInstitutions"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="证件号" prop="idNumber">
								<el-input v-model="applyModel.idNumber" placeholder="X字母大写"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="供养人数" prop="raisePerson">
								<el-input v-model="applyModel.raisePerson"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="子女人数" prop="childNumber">
								<el-input v-model="applyModel.childNumber"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="移动电话" prop="custMobile">
								<el-input v-model="applyModel.custMobile"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="住宅电话" prop="houseTel">
								<el-input v-model="applyModel.houseTel"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="电子邮箱" class="email" prop="email">
								<el-input v-model="applyModel.email"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="QQ/微信" class="qqwx" prop="qqWechat">
								<el-input v-model="applyModel.qqWechat"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="来申请地时间" prop="startResidenceDate">
								<el-date-picker v-model="applyModel.startResidenceDate" type="date" placeholder="选择日期" style="width: 178px;" :editable="false">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24"> 
							<el-form-item label="婚姻状况" prop="maritalStatus">
								<el-radio-group @change="maritalStatusChange" v-model="applyModel.maritalStatus">
									<el-radio v-for="item in maritalStatusRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item prop="maritalStatusText">
								<el-input class="explain" size="mini" v-model="applyModel.maritalStatusText" style="min-width:130px;" placeholder="其他值" :disabled="maritalStatusFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="学历" prop="eduBackground">
								<el-radio-group @change="eduBackgroundChange" v-model="applyModel.eduBackground">
									<el-radio v-for="item in eduBackgroundRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="户口所在地" prop="rresidenceProvCode">
								<el-select v-model="applyModel.rresidenceProvCode" placeholder="请选择省" @change="rresidencePchange" style="width:130px;">
									<el-option v-for="item in rresidenceP" :key="item.PROVINCEID" :label="item.PROVINCE" :value="item.PROVINCEID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="rresidenceCityCode">
								<el-select v-model="applyModel.rresidenceCityCode" placeholder="请选择市" @change="rresidenceCchange" style="width:130px;">
									<el-option v-for="item in rresidenceC" :key="item.CITYID" :label="item.CITY" :value="item.CITYID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="rresidenceAreaCode">
								<el-select v-model="applyModel.rresidenceAreaCode" placeholder="请选择区" @change="rresidenceAchange" style="width:130px;">
									<el-option v-for="item in rresidenceA" :key="item.AREAID" :label="item.AREA" :value="item.AREAID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="rresidenceAddressDetail">
								<el-input v-model="applyModel.rresidenceAddressDetail" style="min-width:500px;" placeholder="请填写详细地址"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="现居住地" prop="houseProvCode">
								<el-select v-model="applyModel.houseProvCode" placeholder="请选择省" @change="housePchange" style="width:130px;">
									<el-option v-for="item in houseP" :key="item.PROVINCEID" :label="item.PROVINCE" :value="item.PROVINCEID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="houseCityCode">
								<el-select v-model="applyModel.houseCityCode" placeholder="请选择市" @change="houseCchange" style="width:130px;">
									<el-option v-for="item in houseC" :key="item.CITYID" :label="item.CITY" :value="item.CITYID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="houseAreaCode">
								<el-select v-model="applyModel.houseAreaCode" placeholder="请选择区" @change="houseAchange" style="width:130px;">
									<el-option v-for="item in houseA" :key="item.AREAID" :label="item.AREA" :value="item.AREAID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="houseAddressDetail">
								<el-input v-model="applyModel.houseAddressDetail" style="min-width:500px;" placeholder="请填写详细地址"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xl="14" :lg="24">
							<el-form-item label="现居状况" prop="liveConditions">
								<el-radio-group @change="liveConditionsChange" v-model="applyModel.liveConditions">
									<el-radio v-for="item in liveConditionsRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item prop="rentMonthlyPay">
								<el-input class="explain" size="mini" v-model="applyModel.rentMonthlyPay" style="width:130px;" placeholder="租金值" :disabled="liveConditionsFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="24">
							<el-form-item label="现居住地居住时间" prop="comeHereDate">
								<el-date-picker v-model="applyModel.comeHereDate" type="date" placeholder="选择日期" style="width: 178px;" :editable="false">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="邮寄地址" prop="validMailAddr">
								<el-radio-group @change="validMailAddrChange" v-model="applyModel.validMailAddr">
									<el-radio v-for="item in validMailAddrRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item  prop="validMailAddrTxt">
								<el-input class="explain" size="mini" v-model="applyModel.validMailAddrTxt" style="min-width:440px;" placeholder="其他值" :disabled="validMailAddrFlag"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-card>

			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>资产信息</span>
				</div>
				<div class="text item">
					<el-row>
						<el-col :xl="14" :lg="24">
							<el-form-item label="房产类型" prop="assetInfo.propertyType" :rules="propertyTypeRule">
								<el-radio-group @change="propertyTypeChange" v-model="applyModel.assetInfo.propertyType">
									<el-radio v-for="item in propertyTypeRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="房产取得时间" prop="assetInfo.proBuyTime" :rules="proBuyTimeRule"><!--:rules="proBuyTimeRule"-->
								<el-date-picker @change="propertyTypeChangeUtil" v-model="applyModel.assetInfo.proBuyTime" type="date" placeholder="选择日期" style="width: 178px;" :editable="false" :disabled="proAllBuyFlag">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="购买/建造总价" prop="assetInfo.proBuyPrice" :rules="proBuyPriceRule">
								<el-input @change="propertyTypeChangeUtil" v-model="applyModel.assetInfo.proBuyPrice" placeholder="元" :disabled="proAllBuyFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="房产建筑面积" prop="assetInfo.gfa" :rules="gfaRule">
								<el-input @change="propertyTypeChangeUtil" v-model="applyModel.assetInfo.gfa" placeholder="平方米" :disabled="proAllBuyFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="借款年限" prop="assetInfo.proLoanLife" :rules="proLoanLifeRule">
								<el-input @change="propertyTypeChangeUtil" v-model="applyModel.assetInfo.proLoanLife" placeholder="年" :disabled="proPartBuyFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="月还款金额" prop="assetInfo.proMortgageMonthly" :rules="proMortgageMonthlyRule">
								<el-input @change="propertyTypeChangeUtil" v-model="applyModel.assetInfo.proMortgageMonthly" placeholder="元" :disabled="proPartBuyFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="借款余额" prop="assetInfo.proLoans" :rules="proLoansRule">
								<el-input @change="propertyTypeChangeUtil" v-model="applyModel.assetInfo.proLoans" placeholder="元" :disabled="proPartBuyFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="剩余期限" prop="assetInfo.proCreditPeriod" :rules="proCreditPeriodRule">
								<el-input @change="propertyTypeChangeUtil" v-model="applyModel.assetInfo.proCreditPeriod" placeholder="月" :disabled="proPartBuyFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="房产地址" prop="assetInfo.isHomeAddress" :rules="isHomeAddressRule"><!--:rules="isHomeAddressRule"-->
								<el-radio-group @change="isHomeAddressChange" v-model="applyModel.assetInfo.isHomeAddress" :disabled="proAllBuyFlag">
									<el-radio v-for="item in isHomeAddressRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item prop="assetInfo.propertyProvCode" :rules="addressRule">
								<el-select v-model="applyModel.assetInfo.propertyProvCode" placeholder="请选择" @change="propertyPchange" style="width:130px;" :disabled="proBuyFlag">
									<el-option v-for="item in propertyP" :key="item.PROVINCEID" :label="item.PROVINCE" :value="item.PROVINCEID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="assetInfo.propertyCityCode" :rules="addressRule">
								<el-select v-model="applyModel.assetInfo.propertyCityCode" placeholder="请选择" @change="propertyCchange" style="width:130px;" :disabled="proBuyFlag">
									<el-option v-for="item in propertyC" :key="item.CITYID" :label="item.CITY" :value="item.CITYID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="assetInfo.propertyAreaCode" :rules="addressRule">
								<el-select v-model="applyModel.assetInfo.propertyAreaCode" placeholder="请选择" @change="propertyAchange" style="width:130px;" :disabled="proBuyFlag">
									<el-option v-for="item in propertyA" :key="item.AREAID" :label="item.AREA" :value="item.AREAID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="assetInfo.propertyAddressDetail" :rules="addressRuleDetail">
								<el-input size="mini" @change="propertyTypeChangeUtil" v-model="applyModel.assetInfo.propertyAddressDetail" style="min-width:310px;" placeholder="详细地址值" :disabled="proBuyFlag"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						
						<el-col :xl="8" :lg="9">
							<el-form-item label="拥有车辆" prop="assetInfo.carHava"  :rules="{required: true, message: '请选择拥有车辆', trigger: 'change'}">
								<el-radio-group @change="carHavaChange" v-model="applyModel.assetInfo.carHava">
									<el-radio v-for="item in carHavaRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>


					<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="购买价" prop="assetInfo.priceCar" class="purchasePrice" :rules="purchasePriceRule">
								<el-input v-model="applyModel.assetInfo.priceCar" @change="carHavaChangeUtil" placeholder="元" :disabled="carAllBuyFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="车龄" prop="assetInfo.carAge" :rules="carAgeRule">
								<el-input v-model="applyModel.assetInfo.carAge" @change="carHavaChangeUtil" placeholder="年" :disabled="carAllBuyFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="贷款发放日期" prop="assetInfo.carLoanDate" :rules="carLoanDateRule"><!--:rules="carLoanDateRule"-->
								<el-date-picker v-model="applyModel.assetInfo.carLoanDate" @change="carHavaChangeUtil" type="date" placeholder="选择日期" style="width: 178px;" :editable="false" :disabled="carPartBuyFlag">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="按揭月供" prop="assetInfo.carMortgageMonthly" :rules="carMortgageMonthlyRule">
								<el-input @change="carHavaChangeUtil" v-model="applyModel.assetInfo.carMortgageMonthly" placeholder="元" :disabled="carPartBuyFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="贷款总额" prop="assetInfo.carLoanCeiling" :rules="carLoanCeilingRule">
								<el-input @change="carHavaChangeUtil" v-model="applyModel.assetInfo.carLoanCeiling" placeholder="元" :disabled="carPartBuyFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="借款余额" prop="assetInfo.carBanlanceVal" :rules="carBanlanceValRule">
								<el-input @change="carHavaChangeUtil" v-model="applyModel.assetInfo.carBanlanceVal" placeholder="元" :disabled="carPartBuyFlag"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>

						<el-col :span="8">
							<el-form-item label="剩余期限" prop="assetInfo.carPeriodVal" :rules="carPeriodValRule">
								<el-input @change="carHavaChangeUtil" v-model="applyModel.assetInfo.carPeriodVal" placeholder="月" :disabled="carPartBuyFlag"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-card>







			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>职业信息</span>
				</div>
				<div class="text item">
					<el-row>
					    <el-col :xl="7" :lg="8">
							<el-form-item label="所属行业" prop="userOccupationalInfo.industryIn" :rules="{required: true, message: '请选择所属行业', trigger: 'change' }">
								<el-select v-model="applyModel.userOccupationalInfo.industryIn" placeholder="请选择" style="width:178px;" @change="changeIndustryIn">
									<el-option v-for="item in industryOption" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						
						<el-col :xl="7" :lg="8">
							<el-form-item label="工作单位" prop="userOccupationalInfo.fullWorkName" :rules="{required: true, message: '请填写单位', trigger: 'blur',max:50}">
								<el-input v-model="applyModel.userOccupationalInfo.fullWorkName"></el-input>
							</el-form-item>
						</el-col>
							
						<el-col :xl="7" :lg="8">
							<el-form-item label="单位电话" prop="userOccupationalInfo.companyTel" :rules="{required: true, message: '格式为010-88888888-3', trigger: 'blur',pattern:/^0\d{2,3}-\d{7,8}(-\d{1,6})?$/,max:20}">
								<el-input v-model="applyModel.userOccupationalInfo.companyTel"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="所在部门" prop="userOccupationalInfo.workDept" :rules="{required: true, message: '请填写所在部门', trigger: 'blur',max:20}">
								<el-input v-model="applyModel.userOccupationalInfo.workDept"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="进入单位时间" prop="userOccupationalInfo.startWorkTime" :rules="{required: true, message: '请选择日期', trigger: 'change'}">
								<el-date-picker v-model="applyModel.userOccupationalInfo.startWorkTime" type="date" placeholder="选择日期" style="width: 178px;" :editable="false">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="每月发薪日" prop="userOccupationalInfo.payDayMonthlyVal" :rules="{required: true, message: '请填写数字格式', trigger: 'blur',pattern:'^[0-9]*[1-9][0-9]*$',max:3}">
								<el-input v-model="applyModel.userOccupationalInfo.payDayMonthlyVal" placeholder="号"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="职务名称" prop="userOccupationalInfo.jobTitle" :rules="{required: true, message: '请填写职务名称', max:25}">
								<el-input v-model="applyModel.userOccupationalInfo.jobTitle"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="其他收入(月均)" prop="userOccupationalInfo.othterIncomeMonthly" :rules="{required: true, message:'格式为数字,如没有可填0',trigger: 'blur',pattern: '^(0|[1-9][0-9]*)$',max:20}">
								<el-input v-model="applyModel.userOccupationalInfo.othterIncomeMonthly" placeholder="元"></el-input>
							
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="每月薪金" prop="userOccupationalInfo.salaryMonthly" :rules="{required: true, message: '请填写数字格式', trigger: 'blur',pattern:'^[0-9]*[1-9][0-9]*$',max:20}">
								<el-input v-model="applyModel.userOccupationalInfo.salaryMonthly" placeholder="元"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
					<el-col :xl="7" :lg="8">
							<el-form-item label="邮编" prop="userOccupationalInfo.companyZipCode" :rules="{required: true, message: '邮政编号格式有误', trigger: 'blur',pattern:'^[1-9]\\d{5}$',max:6}">
								<el-input v-model="applyModel.userOccupationalInfo.companyZipCode"></el-input>
							</el-form-item>
						</el-col>
						</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="单位地址" prop="userOccupationalInfo.companyProvCode" :rules="{required: true, message: '请选择', trigger: 'change',}">
								<el-select v-model="applyModel.userOccupationalInfo.companyProvCode" placeholder="请选择" @change="companyPchange" style="width:130px;">
									<el-option v-for="item in companyP" :key="item.PROVINCEID" :label="item.PROVINCE" :value="item.PROVINCEID">
									</el-option>
								</el-select>
								</el-form-item>
								<el-form-item prop="userOccupationalInfo.companyCityCode" :rules="{required: true, message: '请选择', trigger: 'change',}">
									<el-select v-model="applyModel.userOccupationalInfo.companyCityCode" placeholder="请选择" @change="companyCchange" style="width:130px;">
										<el-option v-for="item in companyC" :key="item.CITYID" :label="item.CITY" :value="item.CITYID">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item prop="userOccupationalInfo.companyAreaCode" :rules="{required: true, message: '请选择', trigger: 'change',}">
									<el-select v-model="applyModel.userOccupationalInfo.companyAreaCode" placeholder="请选择" @change="companyAchange" style="width:130px;">
										<el-option v-for="item in companyA" :key="item.AREAID" :label="item.AREA" :value="item.AREAID">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item prop="userOccupationalInfo.companyAddressDetail" :rules="{required: true, message: '请填写详细地址', trigger: 'blur',max:50}">
									<el-input v-model="applyModel.userOccupationalInfo.companyAddressDetail" style="min-width:500px;" placeholder="详细地址值"></el-input>
								</el-form-item>
							
						</el-col>
						<el-col :span="24">
							<el-form-item label="公司规模" prop="userOccupationalInfo.companySize" :rules="{required: true, message: '请选择公司规模', trigger: 'change'}">
								<el-radio-group @change="companySizeChange" v-model="applyModel.userOccupationalInfo.companySize">
									<el-radio v-for="item in companySizeRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="单位性质" prop="userOccupationalInfo.companyKind" :rules="{required: true, message: '请选择单位性质', trigger: 'change'}">
								<el-radio-group @change="companyKindChange" v-model="applyModel.userOccupationalInfo.companyKind">
									<el-radio v-for="item in companyKindRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item  prop="userOccupationalInfo.companyKindTxt" :rules="companyKindTxtRule">
									<el-input class="explain" size="mini" v-model="applyModel.userOccupationalInfo.companyKindTxt" style="width:100px;margin-left:20px;" placeholder="其他值" :disabled="companyKindFlag"></el-input>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="职级" prop="userOccupationalInfo.position" :rules="{required: true, message: '请选择职级 ', trigger: 'change'}">
								<el-radio-group @change="positionChange" v-model="applyModel.userOccupationalInfo.position">
									<el-radio v-for="item in positionRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item  prop="userOccupationalInfo.positionTxt" :rules="positionTxtRule">
									<el-input class="explain" size="mini" v-model="applyModel.userOccupationalInfo.positionTxt" style="width:100px;margin-left:20px;" placeholder="其他值" :disabled="positionFlag"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xl="7" :lg="8">
							<el-form-item label="发薪方式" prop="userOccupationalInfo.payMethod" :rules="{required: true, message: '请选择发薪方式', trigger: 'change'}">
								<el-radio-group @change="payMethodChange" v-model="applyModel.userOccupationalInfo.payMethod">
									<el-radio v-for="item in payMethodRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xl="8" :lg="16">
							<el-form-item label="社保情况" prop="userOccupationalInfo.socialSecurity" :rules="{required: true, message: '请选择社保情况', trigger: 'change'}">
								<el-radio-group @change="socialSecurityChange" v-model="applyModel.userOccupationalInfo.socialSecurity">
									<el-radio v-for="item in socialSecurityRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xl="14" :lg="24">
							<el-form-item label="私营企业类型" prop="userOccupationalInfo.privateType" :rules="privateTypeRule">
								<el-radio-group @change="privateTypeChange" v-model="applyModel.userOccupationalInfo.privateType">
									<el-radio v-for="item in privateTypeRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item prop="userOccupationalInfo.privateTypeText" :rules="privateTypeTextRule">
									<el-input class="explain" size="mini" @change="privateTypeChangeUtil" v-model="applyModel.userOccupationalInfo.privateTypeText" style="width:100px;margin-left:20px;" placeholder="其他值" :disabled="privateOtherFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="员工人数" prop="userOccupationalInfo.employeesNum"  class='memberCount' :rules="employeesNumRule">
								<el-input v-model="applyModel.userOccupationalInfo.employeesNum" @change="privateTypeChangeUtil" :disabled="privateTypeFlag"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="经营场所" prop="userOccupationalInfo.premises" :rules="premisesRule"><!--:rules="premisesRule"-->
								<el-radio-group @change="premisesChange" v-model="applyModel.userOccupationalInfo.premises" :disabled="privateTypeFlag">
									<el-radio v-for="item in premisesRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="成立时间" prop="userOccupationalInfo.companyRegtime"  :rules="companyRegtimeRule"><!--:rules="companyRegtimeRule"-->
								<el-date-picker @change="privateTypeChangeUtil" v-model="applyModel.userOccupationalInfo.companyRegtime" type="date" placeholder="选择日期" style="width: 178px;" :editable="false" :disabled="privateTypeFlag">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :xl="7" :lg="8">
							<el-form-item label="股份占比" prop="userOccupationalInfo.percentageShares" :rules="percentageSharesRule">
								<el-input @change="privateTypeChangeUtil" v-model="applyModel.userOccupationalInfo.percentageShares" placeholder="%" :disabled="privateTypeFlag"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-card>

			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>联系人信息</span>
					<i class="el-icon-plus" @click="addContact"></i>
				</div>
				<div class="text item">

					<el-row style="padding-left:5px; font-size: 14px;">
						<el-col :span="1">
							<div class="grid-content bg-purple">#</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content bg-purple">姓名</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content bg-purple">关系</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content bg-purple">联系方式</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">工作单位</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content bg-purple">单位/居住地址</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">是否知晓</div>
						</el-col>
						<el-col :span="1">
							<div class="grid-content bg-purple">

							</div>
						</el-col>
					</el-row>

					<el-row  style="margin-top:6px;" v-for="(contact, index) in applyModel.userContacts" :key="index">
						<el-col :span="1">
							<div class="grid-content bg-purple">{{index+1}}</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content bg-purple">
								<el-form-item :prop="'userContacts.' + index + '.name'" :rules="[{required: true, message: '姓名不能为空', trigger: 'blur' },{max:20, message: '姓名不能超过20个字', trigger: 'blur'}]">
									<el-input v-model="contact.name" size="mini"></el-input>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content bg-purple">
								<el-form-item :prop="'userContacts.' + index + '.relationship'" :rules="poRelationshipRule">
									<el-select v-model="contact.relationship" placeholder="请选择" @change="poRelationshipChange" size="mini">
										<el-option v-for="item in poRelationshipOptions" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content bg-purple">
								<el-form-item :prop="'userContacts.' + index + '.phone'" :rules="contactPhoneRule">
									<el-input v-model="contact.phone" size="mini"></el-input>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<el-form-item :prop="'userContacts.' + index + '.companyName'" >
									<el-input v-model="contact.companyName" size="mini"></el-input>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content bg-purple">
								<el-form-item :prop="'userContacts.' + index + '.contactAddress'" >
									<el-input v-model="contact.contactAddress" size="mini"></el-input>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<el-form-item :prop="'userContacts.' + index + '.isKnow'" :rules="{required: true, message: '是否知晓', trigger: 'change' }">
									<el-radio-group @change="isFamilyKnowChange" v-model="contact.isKnow">
										<el-radio v-for="item in isFamilyKnowRadio" :label="item.value" :key="item.value">{{item.text}}</el-radio>
									</el-radio-group>
								</el-form-item>

								<!--<el-input v-model="contact.isKnow" size="mini"></el-input>-->
							</div>
						</el-col>
						<el-col :span="1">
							<div class="grid-content bg-purple"><i class="el-icon-minus icon-minus" @click="removeContact(contact)"></i></div>
						</el-col>
					</el-row>
				</div>
			</el-card>
			<el-form-item style="margin-left:20px;">
				<el-button type="primary" @click="onSubmit('applyModel')" v-loading.fullscreen.lock="fullscreenLoading">确定添加</el-button>
				<el-button type="success" @click="saveTemp">保存草稿</el-button>
				<el-button @click="backApply">取消</el-button>
			</el-form-item>
		</el-form>
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @close="closeInt" :close-on-click-modal="false">
			<div class="grid-content bg-purple-dark">
				<el-form :inline="true" :model="listQuery" class="demo-form-inline">
					<el-form-item label="姓名">
						<el-input v-model="listQuery.custname" placeholder="姓名" size="small"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="queryIntention" size="small">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="grid-content bg-purple-dark">
				<el-table :data="tableData" border style="width: 100%;line-height: 10px;" @selection-change="selchange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="custname" label="客户姓名"></el-table-column>
					<el-table-column prop="paperid" label="证件号"></el-table-column>
					<el-table-column prop="sexval" label="性别"></el-table-column>
					<el-table-column prop="mobile" label="移动电话"></el-table-column>
					<el-table-column prop="applydate" label="预约日期" :formatter="dateFor"></el-table-column>
				</el-table>
			</div>
			<div class="grid-content bg-purple-dark">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 15, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible=false">取 消</el-button>
				<el-button type="primary" @click="autoInt">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {
  fetchData,
  findById,
  updateData,
  removeData,
  createDataJson
} from "@/apis/httpapis";
import { formatDate } from "@/utils/date";

export default {
  name: "UpdateApply",
  data() {
    var checkIdNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("身份证号不能为空"));
      } else {
        var reg18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        var reg15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        if (reg18.test(value) || reg15.test(value)) {
          var url = "sys/blackinfo/findbyidnumber.do?idnumber=" + value;
		      findById(url).then(response => {
		        var result = response.data;
		        if (result.success) {
					callback();
		        } else {
		          this.$message({
		            message: result.msg,
		            type: "warning" //success/warning/info/error
		          });
		        }
		      });
        } else {
          return callback(new Error("身份证号格式不正确"));
        }
      }
    };
  var checkSourcesText = (rule, value, callback) => {
      var sources = this.applyModel.sources;
      if (sources != 7) {
        callback();
      } else {
        if (!value) {
          return callback(new Error("请填写客户来源值"));
        }
        callback();
      }
    };
    var checkLoanUseText = (rule, value, callback) => {
      var loanUse = this.applyModel.loanUse;
      if (loanUse != 10) {
        callback();
      } else {
        if (!value) {
          return callback(new Error("请填写借款用途值"));
        }
        callback();
      }
    };
    var checkMaritalStatusText = (rule, value, callback) => {
      var maritalStatusText = this.applyModel.maritalStatus;
      if (maritalStatusText != 5) {
        callback();
      } else {
        if (!value) {
          return callback(new Error("请填写婚姻状况值"));
        }
        callback();
      }
    };
    var checkRentMonthlyPay = (rule, value, callback) => {
      var rentMonthlyPay = this.applyModel.liveConditions;
      if (rentMonthlyPay != 6) {
        callback();
      } else {
        if (!value) {
          return callback(new Error("请填写租金"));
        }
        var reg = /^[0-9]*$/;
        if (!reg.test(value)) {
          return callback(new Error("租金格式为数字"));
        }
        callback();
      }
    };
    var checkValidMailAddrTxt = (rule, value, callback) => {
      var validMailAddr = this.applyModel.validMailAddr;
      if (validMailAddr != 5) {
        callback();
      } else {
        if (!value) {
          return callback(new Error("请填写邮寄地址"));
        }
        callback();
      }
    };
    var checkApplyAmount = (rule, value, callback)=>{
    	if(value>200000){
    		return callback(new Error("金额必须小于200000"));
    	}
    	callback();
    };
    var checkIsHomeAddress = (rule, value, callback) => {
      var proType = this.applyModel.assetInfo.propertyType;
      if (proType != null && proType != 0) {
        if (!value) {
          callback(new Error("请选择房产地址"));
        }
       }
      callback();
    };
    var checkProBuyTimeRule = (rule, value, callback) => {
      var proType = this.applyModel.assetInfo.propertyType;
      if (proType!=null&&proType != 0) {
      	if (!value) {
          return callback(new Error("请选择取得时间"));
       }
      }
      callback();
    };
    var checkCarLoanDateRule = (rule, value, callback) => {
      var carHava = this.applyModel.assetInfo.carHava;
      if (carHava!=null&&carHava == 3) {
      	if (!value) {
          return callback(new Error("请选择贷款发放日期"));
        }
      }
      callback();
    };
    var checkPremisesRule = (rule, value, callback) => {
      var privateType = this.applyModel.userOccupationalInfo.privateType;
      if (privateType!=null&&privateType != 0) {
       if (!value) {
          return callback(new Error("请选择经营场所"));
        }
      }
      callback();
    };
    var checkCompanyRegtimeRule = (rule, value, callback) => {
      var privateType = this.applyModel.userOccupationalInfo.privateType;
      if (privateType!=null&&privateType != 0) {
       if (!value) {
          return callback(new Error("请选择成立日期"));
        }
      } 
      callback();
    };
    var checkContactPhone = (rule, value, callback) => {
       var reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
       if(!reg.test(value)){
       		return callback(new Error("手机号格式不正确"));
       }
       var userCont = this.applyModel.userContacts;
       var isRepeat = false;//是否有重复
       var isRepeatCount = 0;
       for(var i = 0;i<userCont.length;i++){
       		if(userCont[i].phone==value){
       			isRepeatCount +=1;
       			if(isRepeatCount>1){
       				isRepeat = true;
       				break;
       			}
       		}
       }
       if(isRepeat){
       		return callback(new Error("联系人手机号不能重复"));
       }
       callback();
    };
    var checkPoRelationship = (rule, value, callback) => {
       var userCont = this.applyModel.userContacts;
       var isRepeat = false;//是否有重复
       var isRepeatCount = 0;
       //当为配偶时做验证
       if(value!=''&&value==1){
	       	for(var i = 0;i<userCont.length;i++){
	       		if(userCont[i].relationship==value){
	       			isRepeatCount +=1;
	       			if(isRepeatCount>1){
	       				isRepeat = true;
	       				break;
	       			}
	       		}
	       }
       }
       if(isRepeat){
       		return callback(new Error("配偶只能添加一人"));
}
callback();
};
return {
	proAllBuyFlag: false,
	proPartBuyFlag: false,
	proBuyFlag: false,
	propertyTypeRule: [{
				required: true,
				message:"请选择房产类型",
		     trigger: "change"	    
		   }
      ],
      privateTypeRule:
      	[
		   {
		   	 required: true,
		     message: "请选择私营企业类型",
		     trigger: "change"	    
		   }
      	]
      ,
      privateTypeTextRule:{
      	
      },
      employeesNumRule:{
      	
      },
      positionTxtRule:{
      	
      },
      companyKindTxtRule:{
      	
      },
      companyRegtimeRule:[
          {
            validator: checkCompanyRegtimeRule,
            trigger: "change"
          }
      ],
      poRelationshipRule:[
	      {
	            required: true,
	            message: "请选择联系人关系",
	            trigger: "change"
	      },
	      {
	      	 validator: checkPoRelationship,
	         trigger: "change"
	      }
      ],      
      contactPhoneRule:[
      	 {
            required: true,
            message: "请填写联系方式",
            trigger: "blur"
      },
      {
      	 validator: checkContactPhone,
         trigger: "blur"
      }],     
      percentageSharesRule:{
      	
      },
      premisesRule:[
          {
            validator: checkPremisesRule,
            trigger: "change"
          }
      ],
      carPeriodValRule:{
      	
      },
      carBanlanceValRule:{
      	
      },
      carLoanCeilingRule:{
      	
      },
      carMortgageMonthlyRule:{
      	
      },
      carAgeRule:{
      	
      },
      carLoanDateRule:[
          {
            validator: checkCarLoanDateRule,
            trigger: "change"
          }
      ],
      purchasePriceRule:{
      	
      },
      proBuyTimeRule:[
          {
            validator: checkProBuyTimeRule,
            trigger: "change"
          }
      ],
      proBuyPriceRule:{
      	
      },
      proLoanLifeRule:{
      	
      },
      gfaRule:{
      	
      },
      proMortgageMonthlyRule:{
      	
      },
      proLoansRule:{
      	
      },
      proCreditPeriodRule:{
      	
      },
      addressRule:{
      	
      },
      addressRuleDetail:{
      	
      },
      isHomeAddressRule:[
          {
            validator: checkIsHomeAddress,
            trigger: "change"
          }
      ],
      rulesApplyModel: {
        //验证规则
        validMailAddrTxt: [
          {
            validator: checkValidMailAddrTxt,
            trigger: "blur"
          },
           {          
            max: 50,
            message: "长度在50个字符以内",
            trigger: "blur"
          }
        ],
        rentMonthlyPay: [
          {        	
            validator: checkRentMonthlyPay,
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        maritalStatusText: [
          {
            validator: checkMaritalStatusText,
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        loanUseText: [
          {
            validator: checkLoanUseText,
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        sourcesText: [
          {
            validator: checkSourcesText,
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        salesEmpDeptId: [
          {
            required: true,
            message: "请选择客户经理",
            trigger: "change"
          }
        ],
        salesEmpId: [
          {
            required: true,
            message: "请选择客户经理",
            trigger: "change"
          }
        ],

        applyAmount: [
          {
            required: true,
            message: "请输入金额",
            trigger: "blur"
          },
          {
            type: "number",
            message: "金额必须是整数",
            trigger: "blur"
          },
          {
            validator: checkApplyAmount,
            trigger: "blur"
          }
        ],
        productTypeId: [
          {
            required: true,
            message: "请选择申请产品",
            trigger: "change"
          }
        ],
        productId: [
          {
            required: true,
            message: "请选择申请产品",
            trigger: "change"
          }
        ],
        sources: [
          {
            required: true,
            message: "请选择客户来源",
            trigger: "change"
          }
        ],
        loanUse: [
          {
            required: true,
            message: "请选择借款用途",
            trigger: "change"
          }
        ],
        //个人信息
        custName: [
          {
            required: true,
            message: "请填写姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur"
          }
        ],
        nameBefore: [
           {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        custSex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        graduateInstitutions: [
          {
            required: true,
            message: "请填写毕业院校",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 25个字符",
            trigger: "blur"
          }
        ],
        idNumber: [
          {
            required: true,
            validator: checkIdNumber,
            trigger: "blur"
          }
        ],
        raisePerson: [
          {
            required: true,
            message: "请输入人数,如没有可填0",
            trigger: "blur"
          },
          {
            pattern: "^(0|[1-9][0-9]*)$",
            message: "人数必须是整数,如没有可填0",
            trigger: "blur"
          },
          {
            max: 8,
            message: "长度在 8个字符以内",
            trigger: "blur"
          }
        ],
        childNumber: [
          {
            required: true,
            message: "请输入供养数,如没有可填0",
            trigger: "blur"
          },
          {
            pattern: "^(0|[1-9][0-9]*)$",
            message: "人数为整数,如没有可填0",
            trigger: "blur"
          },
          {
            max: 8,
            message: "长度在 8个字符以内",
            trigger: "blur"
          }
        ],
        custMobile: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur"
          },
          {
            pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        houseTel:[
         {
         pattern:/^0\d{2,3}-\d{7,8}(-\d{1,6})?$/,
         message: '请填写的格式为010-88888888-3', 
         trigger: 'blur'
         },
         {
            max: 16,
            message: "长度在 12个字符以内",
            trigger: "blur"
          }
        ],
        maritalStatus: [
          {
            required: true,
            message: "请选择婚姻状况",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入电子邮箱",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱格式",
            trigger: "blur"
          },
          {
            max:50,
            message: "长度在 50个字符以内",
            trigger: "blur"
          }
        ],
        startResidenceDate: [
          {
            required: true,
            message: "请选择来自申请地时间",
            trigger: "change"
          }
        ],
        comeHereDate: [
          {
            required: true,
            message: "请选择来自申请地时间",
            trigger: "change"
          }
        ],
        eduBackground: [
          {
            required: true,
            message: "请选择学历",
            trigger: "change"
          }
        ],
        qqWechat: [
          {
            required: true,
            message: "输入微信号或QQ号",
            trigger: "blur"
          },
          {
            pattern: "^[0-9a-zA-Z_]{1,20}$",
            message: "请输入正确的微信号或QQ号",
            trigger: "blur"
          },
           {
            max:50,
            message: "长度在 50个字符以内",
            trigger: "blur"
          }
        ],
        liveConditions: [
          {
            required: true,
            message: "请选择目前居住状况",
            trigger: "change"
          }
        ],
        validMailAddr: [
          {
            required: true,
            message: "请选择邮寄地址",
            trigger: "change"
          }
        ],
        rresidenceProvCode: [
          {
            required: true,
            message: "请选择户口地",
            trigger: "change"
          }
        ],
        houseProvCode: [
          {
            required: true,
            message: "请选择现居住地",
            trigger: "change"
          }
        ],

        rresidenceProvCode: [
          {
            required: true,
            message: "请选择省份",
            trigger: "change"
          }
        ],
        rresidenceCityCode: [
          {
            required: true,
            message: "请选择市",
            trigger: "change"
          }
        ],
        rresidenceAreaCode: [
          {
            required: true,
            message: "请选择区",
            trigger: "change"
          }
        ],
        rresidenceAddressDetail: [
          {
            required: true,
            message: "请填写户口地详细地址",
            trigger: "blur"
          },
           {
            max:50,
            message: "长度在 50个字符以内",
            trigger: "blur"
          }         
        ],

        houseProvCode: [
          {
            required: true,
            message: "请选择省份",
            trigger: "change"
          }
        ],

        houseCityCode: [
          {
            required: true,
            message: "请选择市",
            trigger: "change"
          }
        ],

        houseAreaCode: [
          {
            required: true,
            message: "请选择区",
            trigger: "change"
          }
        ],
        houseAddressDetail: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: "blur"
          },
          {
            max:50,
            message: "长度在 50个字符以内",
            trigger: "blur"
          }         
        ]
      },

      //资产信息
      rresidenceP: [], //省下拉列表
      rresidenceC: [], //市下拉列表
      rresidenceA: [], //获取区列表
      houseP: [],
      houseC: [],
      houseA: [],
      propertyP: [],
      propertyC: [],
      propertyA: [],
      companyP: [],
      companyC: [],
      companyA: [],
      contactP: [],
      contactC: [],
      contactA: [],
      productType: [],
      product: [],
      department: [],
      salesSelect: [],
      listQuery: {
        page: 1,
        rows: 10,
        custName: ""
      },
      tableData: null,
      total: null,
      industryOption: [
        {
          value: 1,
          label: "农、林、牧、渔业"
        },
        {
          value: 2,
          label: "采矿业"
        },
        {
          value: 3,
          label: "制造业"
        },
        {
          value: 4,
          label: "电力、燃气及水的生产和供应"
        },
        {
          value: 5,
          label: "建筑业"
        },
        {
          value: 6,
          label: "交通运输、仓储和邮政"
        },
        {
          value: 7,
          label: "信息传输、计算机服务和软件业"
        },
        {
          value: 8,
          label: "批发和零售"
        },
        {
          value: 9,
          label: "住宿和餐饮业"
        },
        {
          value: 10,
          label: "金融业"
        },
        {
          value: 11,
          label: "房地产业"
        },
        {
          value: 12,
          label: "租赁和商务服务"
        },
        {
          value: 13,
          label: "科学研究、技术服务和地质勘查"
        },
        {
          value: 14,
          label: "水利、环境和公共设施管理"
        },
        {
          value: 15,
          label: "居民服务和其他服务"
        },
        {
          value: 16,
          label: "教育"
        },
        {
          value: 17,
          label: "卫生、社会保障和社会福利"
        },
        {
          value: 18,
          label: "文化、体育和娱乐业"
        },
        {
          value: 19,
          label: "公共管理和社会组织"
        },
        {
          value: 20,
          label: "国际组织"
        }
      ],
      poRelationshipOptions: [
        {
          value: 1,
          label: "配偶"
        },
        {
          value: 2,
          label: "亲属"
        },
        {
          value: 3,
          label: "同事"
        },
        {
          value: 4,
          label: "其他"
        }
      ],
      sourcesRadio: [
        {
          value: 1,
          text: "app"
        },
        {
          value: 2,
          text: "门店"
        },
        {
          value: 3,
          text: "主动拜访"
        },
        {
          value: 4,
          text: "客户推荐"
        },
        {
          value: 5,
          text: "派单"
        },
        {
          value: 6,
          text: "推广活动"
        },
        {
          value: 7,
          text: "其他"
        }
      ],
      loanUseRadio: [
        {
          value: 1,
          text: "日常生活消费"
        },
        {
          value: 2,
          text: "装修"
        },
        {
          value: 3,
          text: "医疗"
        },
        {
          value: 4,
          text: "购车"
        },
        {
          value: 5,
          text: "教育支出"
        },
        {
          value: 6,
          text: "资金周转"
        },
        {
          value: 7,
          text: "支付员工工资"
        },
        {
          value: 8,
          text: "扩大生产/经营"
        },
        {
          value: 9,
          text: "购买货物/原材料/设备"
        },
        {
          value: 10,
          text: "其他"
        }
      ],
      maritalStatusRadio: [
        {
          value: 1,
          text: "未婚"
        },
        {
          value: 2,
          text: "已婚"
        },
        {
          value: 3,
          text: "离异"
        },
        {
          value: 4,
          text: "丧偶"
        },
        {
          value: 5,
          text: "其他"
        }
      ],
      eduBackgroundRadio: [
        {
          value: 1,
          text: "硕士及以上"
        },
        {
          value: 2,
          text: "本科"
        },
        {
          value: 3,
          text: "大专"
        },
        {
          value: 4,
          text: "高中及以下"
        }
      ],
      liveConditionsRadio: [
        {
          value: 1,
          text: "按揭商品房"
        },
        {
          value: 2,
          text: "无按揭商品房"
        },
        {
          value: 3,
          text: "父母/配偶房产住房"
        },
        {
          value: 4,
          text: "单位住房"
        },
        {
          value: 5,
          text: "自建房"
        },
        {
          value: 6,
          text: "租用"
        }
      ],
      validMailAddrRadio: [
        {
          value: 1,
          text: "同户口地址"
        },
        {
          value: 2,
          text: "同居住地址"
        },
        {
          value: 3,
          text: "同单位地址"
        },
        {
          value: 4,
          text: "同房产地址"
        },
        {
          value: 5,
          text: "其他"
        }
      ],
      companySizeRadio: [
        {
          value: 1,
          text: "10人以下"
        },
        {
          value: 2,
          text: "10-100人"
        },
        {
          value: 3,
          text: "100-500人"
        },
        {
          value: 4,
          text: "500人以上"
        }
      ],
      validMailAddr: [
        {
          value: 1,
          text: "同户口地址"
        },
        {
          value: 2,
          text: "同居住地址"
        },
        {
          value: 3,
          text: "同单位地址"
        },
        {
          value: 4,
          text: "同房产地址"
        },
        {
          value: 5,
          text: "其他"
        }
      ],
      propertyTypeRadio: [
        {
      	  value: 0,
          text: "无房产"	
      	},
        {
          value: 1,
          text: "商业按揭房"
        },
        {
          value: 2,
          text: "持证抵押房"
        },
        {
          value: 3,
          text: "公积金按揭房"
        },
        {
          value: 4,
          text: "商业/公积金组合按揭购房"
        },
        {
          value: 5,
          text: "无按揭购房(全款购房)"
        }
      ],
      isHomeAddressRadio: [
        {
          value: 1,
          text: "同住址"
        },
        {
          value: 2,
          text: "不同住址"
        }
      ],
      carHavaRadio: [
        {
          value: 1,
          text: "无"
        },
        {
          value: 2,
          text: "全款购买"
        },
        {
          value: 3,
          text: "按揭购买"
        }
      ],
      companyKindRadio: [
        {
          value: 1,
          text: "政府机构"
        },
        {
          value: 2,
          text: "事业单位"
        },
        {
          value: 3,
          text: "军/警"
        },
        {
          value: 4,
          text: "国企"
        },
        {
          value: 5,
          text: "外企"
        },
        {
          value: 6,
          text: "合资企业"
        },
        {
          value: 7,
          text: "上市公司"
        },
        {
          value: 8,
          text: "私企"
        },
        {
          value: 9,
          text: "个体"
        },
        {
          value: 10,
          text: "其他"
        }
      ],
      positionRadio: [
        {
          value: 1,
          text: "法人"
        },
        {
          value: 2,
          text: "股东"
        },
        {
          value: 3,
          text: "高级管理人员"
        },
        {
          value: 4,
          text: "一般管理人员"
        },
        {
          value: 5,
          text: "一般正式员工"
        },
        {
          value: 6,
          text: "非正式员工"
        },
        {
          value: 7,
          text: "其他"
        }
      ],
      socialSecurityRadio: [
        {
          value: 1,
          text: "有社保"
        },
        {
          value: 2,
          text: "有社保和公积金"
        },
        {
          value: 3,
          text: "无"
        }
      ],
      payMethodRadio: [
        {
          value: 1,
          text: "代发"
        },
        {
          value: 2,
          text: "转账"
        },
        {
          value: 3,
          text: "现金"
        }
      ],
      privateTypeRadio: [
        {
          value: 0,
          text: "无"
        },
        {
          value: 1,
          text: "股份有限公司"
        },
        {
          value: 2,
          text: "有限责任公司"
        },
        {
          value: 3,
          text: "合伙企业"
        },
        {
          value: 4,
          text: "个体"
        },
        {
          value: 5,
          text: "其他"
        }
      ],
      premisesRadio: [
        {
          value: 1,
          text: "租用"
        },
        {
          value: 2,
          text: "自有房产"
        }
      ],
      isFamilyKnowRadio: [
        {
          value: 1,
          text: "是"
        },
        {
          value: 0,
          text: "否"
        }
      ],
      applyModel: {
        productType: "",
        applyId: "",
        signconfirmVal: "",
        signconfirm: "",
        storeName: "",
        storeId: "",
        particlesBorrow: "",
        creditSesame: "",
        uuid: "",
        auditType: "",
        sources: "",
        procStatusVal: "",
        procStatus: "",
        procInstId: "",
        suggestRate: "",
        suggestAmount: "",
        productPayVal: "",
        productPay: "",
        productFeeRate: "",
        productRate: "",
        applyPeriod: "",
        applyAmount: "",
        agreedProduct: "",
        agreedAmount: "",
        productName: "",
        productId: "",
        idAddr: "",
        custMobile: "",
        custAge: "",
        custSex: "",
        idTypeVal: "",
        idType: "",
        idNumber: "",
        custName: "",
        custId: "",
        loanId: "",
        invescode: "",
        loanUse: "",
        loanUseVal: "",
        sourcesText: "",
        salesEmpId: "",
        salesEmpName: "",
        salesEmpDeptId: "",
        salesEmpDeptName: "",
        nameBefore: "",
        graduateInstitutions: "",
        raisePerson: "",
        childNumber: "",
        houseTel: "",
        maritalStatus: "",
        maritalStatusVal: "",
        maritalStatusText:"",
        email: "",
        eduBackground: "",
        eduBackgroundVal: "",
        qqWechat: "",
        comeHereDate: "",
        startResidenceDate: "",
        rresidenceAddress: "",
        rresidenceProvCode: "",
        rresidenceProvName: "",
        rresidenceCityCode: "",
        rresidenceCityName: "",
        rresidenceAreaCode: "",
        rresidenceAreaName: "",
        rresidenceAddressDetail: "",
        rresidenceZipCode: "",
        houseAddress: "",
        houseProvCode: "",
        houseProvName: "",
        houseCityCode: "",
        houseCityName: "",
        houseAreaCode: "",
        houseAreaName: "",
        houseAddressDetail: "",
        houseZipCode: "",
        liveConditions: "",
        liveConditionsVal: "",
        rentMonthlyPay: "",
        validMailAddr: "",
        validMailAddrVal: "",
        validMailAddrTxt: "",
        validPostCode: "",
        sourcesValue: "",
        productTypeId: "",
        productTypeName: "",
        productNameAlias:"",
        productTypeNameAlias:"",
        userContacts: [
          {
            name: "",
            phone: "",
            relationship: "",
            relationshipVal: "",
            companyName: "",
            contactAddress: "",
            isKnow: 1,
            isKnowVal: ""
          }
        ],

        assetInfo: {
          asinfoPkId: "",
          propertyType: "",
          propertyTypeVal: "",
          proBuyTime: "",
          proBuyPrice: "",
          gfa: "",
          proLoanLife: "",
          proMortgageMonthly: "",
          proLoans: "",
          proCreditPeriod: "",
          propertyAddress: "",
          propertyProvCode: "",
          propertyProvName: "",
          propertyCityCode: "",
          propertyCityName: "",
          propertyAreaCode: "",
          propertyAreaName: "",
          propertyAddressDetail: "",
          propertyZipCode: "",
          isHomeAddress: "",
          houseaddress: "",
          isHomeAddressVal: "",
          carHava: "",
          carHavaVal: "",
          priceCar: "",
          carAge: "",
          carLoanDate: "",
          carMortgageMonthly: "",
          carLoanCeiling: "",
          carBanlanceVal: "",
          carPeriodVal: "",
          applyId: "",
          createTime: ""
        },
        userOccupationalInfo: {
          fullWorkName: "",
          industryIn: "",
          industryVal: "",
          companyAddress: "",
          companyProvCode: "",
          companyProvName: "",
          companyCityCode: "",
          companyCityName: "",
          companyAreaCode: "",
          companyAreaName: "",
          companyAddressDetail: "",
          companyZipCode: "",
          companyTel: "",
          companyTelCode: "",
          companyTelValue: "",
          companyTelExt: "",
          companySize: "",
          companySizeVal: "",
          companyKind: "",
          companyKindVa: "",
          companyKindTxt: "",
          position: "",
          positionVal: "",
          positionTxt: "",
          workDept: "",
          startWorkTime: "",
          payDayMonthlyVal: "",
          socialSecurity: "",
          socialSecurityVal: "",
          jobTitle: "",
          othterIncomeMonthly: "",
          salaryMonthly: "",
          payMethod: "",
          payMethodVal: "",
          privateType: "",
          privateTypeVal: "",
          privateTypeText: "",
          companyRegtime: "",
          percentageShares: "",
          employeesNum: "",
          premises: "",
          premisesVal: "",
          applyId: "",
          createTime: ""
        }
      },
      multipleSelection: [],
      dialogStatus: "",
      textMap: {
        addInt: "预约列表"
      },
      dialogFormVisible: false,
      fullscreenLoading: false,
      carAllBuyFlag:false,
      carPartBuyFlag:false,
      privateTypeFlag:false,
      loanUseFlag:true,
      sourcesFlag:true,
      maritalStatusFlag:true,
      liveConditionsFlag:true,
      validMailAddrFlag:true,
      proBuyFlag:false,
      companyKindFlag:true,
      positionFlag:true,
      privateOtherFlag:true
    };
  },
  created() {
    findById("/sys/applymodel/selectdeptbystoreid.do") //初始化部门
      .then(response => {
        //console.info("^^^^^ :" + JSON.stringify(response));
        this.department = response.data;
      });
    findById("/sys/producttype/queryalltype.do?isonline=0") //初始化产品类型
      .then(response => {
        //console.info("^^^^^ :" + JSON.stringify(response.data));
        this.productType = response.data;
      });
    findById("/sys/applymodel/findallprovinces.do") //初始化省市联动
      .then(response => {
        //console.info("^^^^^ :" + JSON.stringify(response));
        this.rresidenceP = response.data;
        this.houseP = response.data;
        this.companyP = response.data;
      });
  },
  methods: {
    changeDept(value) {
      this.applyModel.salesEmpId = "";
      findById("/sys/applymodel/selectempbydepid.do?depId=" + value) //初始化部门
        .then(response => {
          //console.info("^^^^^ :" + JSON.stringify(response.data));
          this.salesSelect = response.data;
        });
      for (var i = 0; i < this.department.length; i++) {
        if (value == this.department[i].storeId) {
          //给部门名称赋值
          this.applyModel.salesEmpDeptName = this.department[i].storeName;
        }
      }
    },
    changeSales(value) {
      for (var i = 0; i < this.salesSelect.length; i++) {
        if (value == this.salesSelect[i].empId) {
          //给部门名称赋值
          this.applyModel.salesEmpName = this.salesSelect[i].empName;
        }
      }
    },
    dateFor(row, column, cellValue) {
      if (typeof cellValue != "undefined") {
        return formatDate(new Date(cellValue), "yyyy-MM-dd hh:mm:ss");
      }
    },
    selchange(selection) {
      this.multipleSelection = selection;
    },
    queryIntention() {
      this.dialogStatus = "addInt";
      this.dialogFormVisible = true;
      fetchData(
        "sys/applymodel/intentionpager.do",
        this.listQuery
      ).then(response => {
        this.tableData = response.data.pageData;
        this.total = response.data.recordCount;
      });
    },
    closeInt() {
      this.listQuery.custName = "";
    },
    autoInt() {
      var nodes = this.multipleSelection;
      if (
        null === nodes ||
        "" === nodes ||
        typeof nodes == "undefined" ||
        typeof nodes.length == "undefined" ||
        nodes.length < 1
      ) {
        this.$message({
          message: "警告,请选择要填充的组件!",
          type: "warning"
        });
        return;
      }
      if (nodes.length > 1) {
        this.$message({
          message: "警告,只支持单数据填充!",
          type: "warning"
        });
        return;
      }
      var ordplyId = nodes[0].ordplyId;
      var url = "/sys/intention/findbyordplyId.do?ordplyId=" + ordplyId;
      findById(url).then(response => {
        this.dialogFormVisible = false;
        this.applyModel.custName = response.data.custName;
        this.applyModel.idNumber = response.data.idNumber;
        this.applyModel.custSex = response.data.custSex;
        this.applyModel.custMobile = response.data.custMobile;
        this.applyModel.sources = response.data.sources;
        this.applyModel.sourcesValue= response.data.sourcesValue;
        this.applyModel.storeId = response.data.storeId;
        this.applyModel.salesEmpDeptId = response.data.salesEmpDeptId;
        if(response.data.salesEmpDeptId!=null&&response.data.salesEmpDeptId!=''&&response.data.salesEmpDeptId!='undefined'){
        	this.applyModel.salesEmpId = "";
      	    findById("/sys/applymodel/selectempbydepid.do?depId=" + response.data.salesEmpDeptId) //初始化部门
		        .then(response => {
		          //console.info("^^^^^ :" + JSON.stringify(response));
		          this.salesSelect = response.data;
		        });
        }
        this.applyModel.salesEmpId = response.data.salesEmpId;
        this.applyModel.salesEmpDeptName = response.data.salesEmpDeptName;
        this.applyModel.salesEmpName = response.data.salesEmpName;
        //console.log(JSON.stringify(response.data))
        if (response.data.userContacts.length < 1) {
          this.applyModel.userContacts.push({
            name: "",
            phone: "",
            relationship: "",
            relationshipVal: "",
            companyName: "",
            contactAddress: "",
            isKnow: 1,
            isKnowVal: ""
          });
        }
      });
    },
    changeProductType(value) {
      //根据大产品生产小产品
      this.applyModel.productId = "";
      this.applyModel.applyPeriod = "";
      findById(
        "/sys/product/querybytype.do?prodTypeId=" + value
      ).then(response => {
        //console.info("^^^^^ :" + JSON.stringify(response.data));
        this.product = response.data;
      });
      for (var i = 0; i < this.productType.length; i++) {
        if (value == this.productType[i].prodId) {
          //给大产品名称赋值
          this.applyModel.productTypeName = this.productType[i].prodName;
          //给大产品别名赋值
          this.applyModel.productTypeNameAlias = this.productType[i].prodAlias;
        }
      }
    },
    changeProduct(value) {
      for (var i = 0; i < this.product.length; i++) {
        if (value == this.product[i].prodId) {
          //给小产品名称赋值
          this.applyModel.productName = this.product[i].prodName;
          this.applyModel.applyPeriod = this.product[i].sterm;//申请期限赋值
          this.applyModel.productNameAlias = this.product[i].prodAlias//小产品别名赋值
        }
      }
    },
    idNumberBlack() {
      var idNumber = this.applyModel.idNumber;
      var url = "sys/blackinfo/findbyidnumber.do?idnumber=" + idNumber;
      findById(url).then(response => {
        var result = response.data;
        if (result.success) {

        } else {
          this.$message({
            message: result.msg,
            type: "warning" //success/warning/info/error
          });
          this.gotoListView();
          return;
        }
      });
    },
     companyPchange(value) {
      //console.log("选中省获取下级市 :  "+value);
      this.applyModel.userOccupationalInfo.companyCityCode = "";
      this.applyModel.userOccupationalInfo.companyAreaCode = "";
      this.companyC="";
      this.companyA="";
      findById(
        "/sys/applymodel/findcitiebypro.do?provinceId=" + value
      ).then(response => {
        this.companyC = response.data;
      });
      //获取省名称---赋值给对象
      for (var i = 0; i < this.companyP.length; i++) {
        if (value == this.companyP[i].PROVINCEID) {
          this.applyModel.userOccupationalInfo.companyProvName = this.companyP[
            i
          ].PROVINCE;
        }
      }
    },
    companyCchange(value) {
      this.applyModel.userOccupationalInfo.companyAreaCode = "";
      this.companyA=""
      findById(
        "/sys/applymodel/findareabycity.do?cityId=" + value
      ).then(response => {
        this.companyA = response.data;
      });
      //获取市名称---赋值给对象
      for (var i = 0; i < this.companyC.length; i++) {
        if (value == this.companyC[i].CITYID) {
          this.applyModel.userOccupationalInfo.companyCityName = this.companyC[
            i
          ].CITY;
        }
      }
    },
    companyAchange(value) {
      //获取区名称---赋值给对象
      for (var i = 0; i < this.companyA.length; i++) {
        if (value == this.companyA[i].AREAID) {
          this.applyModel.userOccupationalInfo.companyAreaName = this.companyA[
            i
          ].AREA;
        }
      }
    },
    propertyPchange(value) {
      this.propertyTypeChangeUtil();//如果为无房产清除
      //console.log("选中省获取下级市 :  "+value);
      this.applyModel.assetInfo.propertyCityCode = "";
      this.applyModel.assetInfo.propertyAreaCode = "";
      this.propertyC="";
      this.propertyA="";
      findById(
        "/sys/applymodel/findcitiebypro.do?provinceId=" + value
      ).then(response => {
        this.propertyC = response.data;
      });
      //获取省名称---赋值给对象
      for (var i = 0; i < this.propertyP.length; i++) {
        if (value == this.propertyP[i].PROVINCEID) {
          this.applyModel.assetInfo.propertyProvName = this.propertyP[
            i
          ].PROVINCE;
        }
      }
    },
    propertyCchange(value) {
      this.propertyTypeChangeUtil();//如果为无房产清除
      this.applyModel.assetInfo.propertyAreaCode = "";
      this.propertyA="";
      findById(
        "/sys/applymodel/findareabycity.do?cityId=" + value
      ).then(response => {
        this.propertyA = response.data;
      });
      //获取市名称---赋值给对象
      for (var i = 0; i < this.propertyC.length; i++) {
        if (value == this.propertyC[i].CITYID) {
          this.applyModel.assetInfo.propertyCityName = this.propertyC[i].CITY;
        }
      }
    },
    propertyAchange(value) {
      this.propertyTypeChangeUtil();//如果为无房产清除    	
      //获取区名称---赋值给对象
      for (var i = 0; i < this.propertyA.length; i++) {
        if (value == this.propertyA[i].AREAID) {
          this.applyModel.assetInfo.propertyAreaName = this.propertyA[i].AREA;
        }
      }
    },
    housePchange(value) {
      //console.log("选中省获取下级市 :  "+value);
      this.applyModel.houseCityCode = "";
      this.applyModel.houseAreaCode = "";
      this.houseC="";
      this.houseA="";
      findById(
        "/sys/applymodel/findcitiebypro.do?provinceId=" + value
      ).then(response => {
        this.houseC = response.data;
      });
      //获取省名称---赋值给对象
      for (var i = 0; i < this.houseP.length; i++) {
        if (value == this.houseP[i].PROVINCEID) {
          this.applyModel.houseProvName = this.houseP[i].PROVINCE;
        }
      }
    },
    houseCchange(value) {
      this.applyModel.houseAreaCode = "";
      this.houseA="";
      findById(
        "/sys/applymodel/findareabycity.do?cityId=" + value
      ).then(response => {
        this.houseA = response.data;
      });
      //获取市名称---赋值给对象
      for (var i = 0; i < this.houseC.length; i++) {
        if (value == this.houseC[i].CITYID) {
          this.applyModel.houseCityName = this.houseC[i].CITY;
        }
      }
    },
    houseAchange(value) {
      //获取区名称---赋值给对象
      for (var i = 0; i < this.houseA.length; i++) {
        if (value == this.houseA[i].AREAID) {
          this.applyModel.houseAreaName = this.houseA[i].AREA;
          //console.log(this.houseA[i].AREA)
        }
      }
    },
    rresidencePchange(value) {
      //console.log("选中省获取下级市 :  "+value);
      this.applyModel.rresidenceCityCode = "";
      this.applyModel.rresidenceAreaCode = "";
      this.rresidenceC="";
      this.rresidenceA="";
      findById(
        "/sys/applymodel/findcitiebypro.do?provinceId=" + value
      ).then(response => {
        this.rresidenceC = response.data;
      });
      //获取省名称---赋值给对象
      for (var i = 0; i < this.rresidenceP.length; i++) {
        if (value == this.rresidenceP[i].PROVINCEID) {
          this.applyModel.rresidenceProvName = this.rresidenceP[i].PROVINCE;
        }
      }
    },
    privateTypeChangeUtil(value){
    	var prType = this.applyModel.userOccupationalInfo.privateType;
    	this.privateTypeChange(prType);
    },
    rresidenceCchange(value) {
      this.applyModel.rresidenceAreaCode = "";
      this.rresidenceA="";
      findById(
        "/sys/applymodel/findareabycity.do?cityId=" + value
      ).then(response => {
        this.rresidenceA = response.data;
      });
      //获取市名称---赋值给对象
      for (var i = 0; i < this.rresidenceC.length; i++) {
        if (value == this.rresidenceC[i].CITYID) {
          this.applyModel.rresidenceCityName = this.rresidenceC[i].CITY;
        }
      }
    },
    rresidenceAchange(value) {
      //获取区名称---赋值给对象
      for (var i = 0; i < this.rresidenceA.length; i++) {
        if (value == this.rresidenceA[i].AREAID) {
          this.applyModel.rresidenceAreaName = this.rresidenceA[i].AREA;
        }
      }
    },
      /**
			 * 给model中文赋值
			 */
    setAddress() {
      //户口地
      var rresidenceProvName = this.applyModel.rresidenceProvName;
      var rresidenceCityName = this.applyModel.rresidenceCityName;
      var rresidenceAreaName = this.applyModel.rresidenceAreaName;
      var rresidenceAddressDetail = this.applyModel.rresidenceAddressDetail;
      this.applyModel.rresidenceAddress =
        rresidenceProvName +
        rresidenceCityName +
        rresidenceAreaName +
        rresidenceAddressDetail;

      //居住地
      var houseProvName = this.applyModel.houseProvName;
      var houseCityName = this.applyModel.houseCityName;
      var houseAreaName = this.applyModel.houseAreaName;
      var houseAddressDetail = this.applyModel.houseAddressDetail;
      this.applyModel.houseAddress =
        houseProvName + houseCityName + houseAreaName + houseAddressDetail;

      //房产地址
      var propertyProvName = this.applyModel.assetInfo.propertyProvName;
      var propertyCityName = this.applyModel.assetInfo.propertyCityName;
      var propertyAreaName = this.applyModel.assetInfo.propertyAreaName;
      var propertyAddressDetail = this.applyModel.assetInfo
        .propertyAddressDetail;
      this.applyModel.assetInfo.propertyAddress =
        propertyProvName +
        propertyCityName +
        propertyAreaName +
        propertyAddressDetail;

      //公司地址
      var companyProvName = this.applyModel.userOccupationalInfo
        .companyProvName;
      var companyCityName = this.applyModel.userOccupationalInfo
        .companyCityName;
      var companyAreaName = this.applyModel.userOccupationalInfo
        .companyAreaName;
      var companyAddressDetail = this.applyModel.userOccupationalInfo
        .companyAddressDetail;
      this.applyModel.userOccupationalInfo.companyAddress =
        companyProvName +
        companyCityName +
        companyAreaName +
        companyAddressDetail;
    },
    changeIndustryIn(value) {
      var industry = this.industryOption[value - 1].label;
      this.applyModel.userOccupationalInfo.industryVal = industry;
    },
    sourcesChange(value) {
     if(value!=7){//客户来源为其他
     	this.applyModel.sourcesText="";
     	this.sourcesFlag=true;
     }else{
     	this.sourcesFlag=false;
     }
     var sources = this.sourcesRadio[value - 1].text;
     this.applyModel.sourcesValue = sources;
    },
    loanUseChange(value) {
      if(value!=10){//借款用途为其他
      	this.applyModel.loanUseText="";
      	this.loanUseFlag=true;
      }else{
      	this.loanUseFlag=false;
      }
      var loanUse = this.loanUseRadio[value - 1].text;
      this.applyModel.loanUseVal = loanUse;
    },
    maritalStatusChange(value) {
      if(value!=5){//婚姻状况如果不为其他
      	this.applyModel.maritalStatusText="";
      	this.maritalStatusFlag=true;
      }else{
      	this.maritalStatusFlag=false;
      }
      var maritalStatus = this.maritalStatusRadio[value - 1].text;
      this.applyModel.maritalStatusVal = maritalStatus;
    },
    eduBackgroundChange(value) {
      var eduBackground = this.eduBackgroundRadio[value - 1].text;
      this.applyModel.eduBackgroundVal = eduBackground;
    },
    liveConditionsChange(value) {
      if(value!=6){
      	this.applyModel.rentMonthlyPay="";
      	this.liveConditionsFlag = true;
      }else{
      	this.liveConditionsFlag = false;
      }
      var liveConditions = this.liveConditionsRadio[value - 1].text;
      this.applyModel.liveConditionsVal = liveConditions;
    },
    validMailAddrChange(value) {
    if(value!=5){//邮寄地址不为其他
      this.applyModel.validMailAddrTxt="";
      this.validMailAddrFlag=true;
    }else{
    	 this.validMailAddrFlag=false;
    }
      var validMailAddr = this.validMailAddrRadio[value - 1].text;
      this.applyModel.validMailAddrVal = validMailAddr;
    },
    propertyTypeChangeUtil(value){
    	var pType = this.applyModel.assetInfo.propertyType;
    	this.propertyTypeChange(pType);
    },
    carHavaChangeUtil(value){
    	var carHava = this.applyModel.assetInfo.carHava
    	this.carHavaChange(carHava);
    },
    propertyTypeChange(value) {
      for (var i = 0; i < this.propertyTypeRadio.length; i++) {
        if (value == this.propertyTypeRadio[i].value) {
          //给房产类型名称赋值
         this.applyModel.assetInfo.propertyTypeVal = this.propertyTypeRadio[i].text;
        }
      }
		if(value==0){//无房产
			this.proAllBuyFlag=true,
			this.proPartBuyFlag=true,
    		this.proBuyPriceRule={};
    		this.gfaRule={};
    		this.proLoanLifeRule={};
    		this.proMortgageMonthlyRule={};
    		this.proLoansRule={};
    		this.proCreditPeriodRule={};
    		this.applyModel.assetInfo.proBuyTime=null,
			this.applyModel.assetInfo.proBuyPrice="",
			this.applyModel.assetInfo.gfa="",
			this.applyModel.assetInfo.proLoanLife="",
			this.applyModel.assetInfo.proMortgageMonthly="",
			this.applyModel.assetInfo.proLoans="",
			this.applyModel.assetInfo.proCreditPeriod="",
			this.applyModel.assetInfo.isHomeAddress=null,
			this.applyModel.assetInfo.isHomeAddressVal="",
			this.applyModel.assetInfo.propertyProvCode="",
			this.applyModel.assetInfo.propertyCityCode="",
			this.applyModel.assetInfo.propertyAreaCode="",
			this.applyModel.assetInfo.propertyAddressDetail=""
    	}else if(value==5){//全款购房
    		this.proAllBuyFlag=false,
			this.proPartBuyFlag=true,
      		this.proBuyPriceRule={
      			required: true,
      			message: '请填写格式为数字的购买价',
      			trigger: 'blur',
      			pattern: '^[0-9]+(.[0-9]{2})?$', max: 20
			};
			this.gfaRule = {
				required: true,
				message: '请填写数字格式',
				trigger: 'blur',
				pattern: '^[0-9]+(.[0-9]{2})?$',
				max: 20
			};
			this.proLoanLifeRule = {
				message: '请填写数字格式',
				trigger: 'blur',
				pattern: '^[0-9]+(.[0-9]{2})?$',
				max: 3
			};
			this.proMortgageMonthlyRule={
				message: '请填写数字格式',
				trigger: 'blur',
				pattern: '^[0-9]+(.[0-9]{2})?$',max:15
			};
			this.proLoansRule={
				message: '请填写数字格式',
				trigger: 'blur',
				pattern: '^[0-9]+(.[0-9]{2})?$',
				max:15
			};
			this.proCreditPeriodRule={
				message: '请填写数字格式',
				trigger: 'blur',
				pattern: '^[0-9]+(.[0-9]{2})?$',
				max:15
			};
		  }else{
		  	this.proAllBuyFlag=false,
			this.proPartBuyFlag=false,
      		this.proBuyPriceRule={
      			required: true,
      			message: '请填写格式为数字的购买价',
      			trigger: 'blur',
      			pattern: '^[0-9]+(.[0-9]{2})?$', max: 20
			};
			this.gfaRule = {
				required: true,
				message: '请填写数字格式',
				trigger: 'blur',
				pattern: '^[0-9]+(.[0-9]{2})?$',
				max: 20
			};
			this.proLoanLifeRule = {
				required: true,
				message: '请填写数字格式',
				trigger: 'blur',
				pattern: '^[0-9]+(.[0-9]{2})?$',
				max: 3
			};
			this.proMortgageMonthlyRule={
				required: true,
				message: '请填写数字格式',
				trigger: 'blur',
				pattern: '^[0-9]+(.[0-9]{2})?$',max:15
			};
			this.proLoansRule={
				required: true,
				message: '请填写数字格式',
				trigger: 'blur',
				pattern: '^[0-9]+(.[0-9]{2})?$',
				max:15
			};
			this.proCreditPeriodRule={
				required: true,
				message: '请填写数字格式',
				trigger: 'blur',
				pattern: '^[0-9]+(.[0-9]{2})?$',
				max:3
			};
		  }
		},
		isHomeAddressChange(value) {
		this.propertyTypeChangeUtil();
		var proType = this.applyModel.assetInfo.propertyType;
			if(value == 1||proType==0) {//无房产地址
				this.proBuyFlag=true;
		      	this.addressRule={};
		      	this.addressRuleDetail={};
		      	this.applyModel.assetInfo.propertyProvCode ="";
		      	this.applyModel.assetInfo.propertyCityCode="";
		      	this.applyModel.assetInfo.propertyAreaCode="";
		      	this.applyModel.assetInfo.propertyAddressDetail="";
		      	this.propertyP="";
		      	this.propertyC="";
		      	this.propertyA="";
	      	}else{
	      	this.proBuyFlag=false;
	      	findById('/sys/applymodel/findallprovinces.do')//初始化省市联动
		      .then(response => {
		         //console.info("^^^^^ :" + JSON.stringify(response));
		         this.propertyP = response.data;
	    		});
	    	 this.addressRule={required: true, message: '请选择地址', trigger: 'change'};
	    	 this.addressRuleDetail=[{required: true, message: '请填写详细地址', trigger: 'change'},{max:50,message: '详细地址不能超过50个字', trigger: 'change'}];
	      }
	      var isHomeAddress = this.isHomeAddressRadio[value - 1].text;
	      this.applyModel.assetInfo.isHomeAddressVal = isHomeAddress;
    },
    carHavaChange(value) {
      for (var i = 0; i < this.carHavaRadio.length; i++) {
        if (value == this.carHavaRadio[i].value) {
          //给房产类型名称赋值
         this.applyModel.assetInfo.carHavaVal = this.carHavaRadio[i].text;
        }
      }
      if(value==1){//无车辆
      	this.carAllBuyFlag=true;
      	this.carPartBuyFlag=true;
      	this.purchasePriceRule={message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:25}
      	this.carAgeRule={message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:3}
      	this.carMortgageMonthlyRule={message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:20}
      	this.carLoanCeilingRule={message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:25}
      	this.carBanlanceValRule={message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:25}
      	this.carPeriodValRule={message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:3}
      	this.applyModel.assetInfo.priceCar="",
      	this.applyModel.assetInfo.carAge="",
      	this.applyModel.assetInfo.carLoanDate=null,
      	this.applyModel.assetInfo.carMortgageMonthly="",
      	this.applyModel.assetInfo.carLoanCeiling="",
      	this.applyModel.assetInfo.carBanlanceVal="",
      	this.applyModel.assetInfo.carPeriodVal=""
      }else if(value==2){//全款购买
      	this.carPartBuyFlag=true;
      	this.carAllBuyFlag=false;
      	this.purchasePriceRule={required: true, message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:25}
      	this.carAgeRule={required: true, message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:3}
      	this.carMortgageMonthlyRule={message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:20}
      	this.carLoanCeilingRule={message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:25}
      	this.carBanlanceValRule={message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:25}
      	this.carPeriodValRule={message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:3}  
      	this.applyModel.assetInfo.carLoanDate=null,
      	this.applyModel.assetInfo.carMortgageMonthly="",
      	this.applyModel.assetInfo.carLoanCeiling="",
      	this.applyModel.assetInfo.carBanlanceVal="",
      	this.applyModel.assetInfo.carPeriodVal=""
      }else{//按揭购买
      	this.carAllBuyFlag=false;
      	this.carPartBuyFlag=false;
      	this.purchasePriceRule={required: true, message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:25}
      	this.carAgeRule={required: true, message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:3}
      	this.carMortgageMonthlyRule={required: true,message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:20}
      	this.carLoanCeilingRule={required: true,message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:25}
      	this.carBanlanceValRule={required: true,message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:25}
      	this.carPeriodValRule={required: true,message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9]{2})?$',max:3}
      }
    },
    companyKindChange(value) {
      if(value==10){//单位性质值为其他
      	this.companyKindFlag=false;
      	this.companyKindTxtRule={required: true,message: '请填写单位性质值', trigger: 'blur',max:20};
      }else{
      	this.companyKindFlag=true;
      	this.companyKindTxtRule={};
      	this.applyModel.userOccupationalInfo.companyKindTxt="";
      }
      var companyKind = this.companyKindRadio[value - 1].text;
      this.applyModel.userOccupationalInfo.companyKindVa = companyKind;
      ////console.log(this.applyModel.userOccupationalInfo.companyKindVa);
    },
    companySizeChange(value) {
      var companySize = this.companySizeRadio[value - 1].text;
      this.applyModel.userOccupationalInfo.companySizeVal = companySize;
    },
    positionChange(value) {
      if(value==7){//职级为其他时，值
      	this.positionFlag=false;
      	this.positionTxtRule={required: true, message: '请填写职级 ', trigger: 'change',max:20}
      }else{
      	this.positionFlag=true;
      	this.positionTxtRule={};
      	this.applyModel.userOccupationalInfo.positionTxt="";
      }
      var position = this.positionRadio[value - 1].text;
      this.applyModel.userOccupationalInfo.positionVal = position;
    },
    socialSecurityChange(value) {
      var socialSecurity = this.socialSecurityRadio[value - 1].text;
      this.applyModel.userOccupationalInfo.socialSecurityVal = socialSecurity;
    },
    payMethodChange(value) {
      var payMethod = this.payMethodRadio[value - 1].text;
      this.applyModel.userOccupationalInfo.payMethodVal = payMethod;
    },
    privateTypeChange(value) {
      for (var i = 0; i < this.privateTypeRadio.length; i++) {
        if (value == this.privateTypeRadio[i].value) {
          //给房产类型名称赋值
         this.applyModel.userOccupationalInfo.privateTypeVal = this.privateTypeRadio[i].text;
        }
      }
      	if(value==0){//私营企业无
      		this.privateTypeFlag=true;
      		this.privateOtherFlag=true;
      		this.applyModel.userOccupationalInfo.privateTypeText="";
      		this.privateTypeTextRule={}
      		this.employeesNumRule={}
      		this.percentageSharesRule={}
      		this.applyModel.userOccupationalInfo.employeesNum="",
      		this.applyModel.userOccupationalInfo.premises=null,
      		this.applyModel.userOccupationalInfo.premisesVal="",
      		this.applyModel.userOccupationalInfo.companyRegtime=null,
      		this.applyModel.userOccupationalInfo.percentageShares=""
      	}else if(value==5){//其他
      		this.privateTypeFlag=false;
      		this.privateOtherFlag=false;
	      	this.privateTypeTextRule={
	  			required: true, 
	  			message: '请输入企业类型', 
	  			trigger: 'blur',
	  			max:20
	      	}
      		this.employeesNumRule={//员工人数
      			required: true, message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9])?$',max:10
      		}
      		this.percentageSharesRule={required: true,message: '请填写股份占比(最高100,可填写两位小数)', trigger: 'blur',pattern:/^(\d|[1-9]\d|100)(\.\d{1,2})?$/}
      	}else{
      		this.privateTypeFlag=false;
      		this.privateOtherFlag=true;
      		this.applyModel.userOccupationalInfo.privateTypeText="";
      		this.privateTypeTextRule={
	      	}
      		this.employeesNumRule={//员工人数
      			required: true, message: '请填写数字格式', trigger: 'blur',pattern: '^[0-9]+(.[0-9])?$',max:10
      		}
      		this.percentageSharesRule={required: true,message: '请填写股份占比(最高100,可填写两位小数)', trigger: 'blur',pattern:/^(\d|[1-9]\d|100)(\.\d{1,2})?$/}
      	}
    },
    premisesChange(value) {
      var premises = this.premisesRadio[value - 1].text;
      this.applyModel.userOccupationalInfo.premisesVal = premises;
    },
    isFamilyKnowChange(value) {
      var isKnow = this.isFamilyKnowRadio[value - 1].text;
      this.applyModel.userContacts.isKnowVal = isKnow;
    },
    poRelationshipChange(value) {
      /*			//index
							////console.info("#### index :" + this.applyModel.userContacts.length)
							//console.info(this.contact);*/
      //console.log(this.poRelationshipOptions[0].label);
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.listQuery.rows = val;
      this.queryIntention();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.listQuery.page = val;
      this.queryIntention();
    },
    saveTemp(){
    	var idNumber = this.applyModel.idNumber;
		var reg18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        var reg15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        if (!reg18.test(idNumber) && !reg15.test(idNumber)) {
          		this.$message({
                message: "请填写正确身份证号",
                type: "warning" //success/warning/info/error
            });
            return;
        }
        var custMobile = this.applyModel.custMobile;
        var regPhone = /^1[34578]\d{9}$/
        if(!regPhone.test(custMobile)){
        	this.$message({
                message: "请填写正确手机号",
                type: "warning" //success/warning/info/error
            });
            return;
        }
    	this.setAddress();
    	var url = "sys/blackinfo/findbyidnumber.do?idnumber=" + idNumber;
    	findById(url).then(response => {
		        var result = response.data;
		        if (result.success) {
					var url = "sys/applymodel/savetempapply.do";
				    	this.$confirm('确定保存？', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
							}).then(() => { 
								this.fullscreenLoading = true;
						            createDataJson(url, this.applyModel).then(response => {
						            var result = response.data;
						            if (result.success) {
						              this.fullscreenLoading = false;
						              this.$message({
						                message: result.msg,
						                type: "success" //success/warning/info/error
						              });
						              this.gotoListView();
						              //this.$router.push({path: '/apply'});
						            } else {
						              this.fullscreenLoading = false;
						              this.$message({
						                message: result.msg,
						                type: "warning"
						              });
						            }
						          });
							}).catch(() => {
								this.fullscreenLoading = false;
								this.$message({
									type: 'info',
									message: '已取消保存!'
								});
							});
		        } else {
		          this.$message({
		            message: result.msg,
		            type: "warning" //success/warning/info/error
		          });
		    }
		});
    },
    onSubmit(formName) {
      this.setAddress();
      //console.log(JSON.stringify(this.applyModel))
      var url = "/sys/applymodel/addapplymodel.do";
      this.$refs[formName].validate(valid => {
        if (valid) {
        	//console.log(JSON.stringify(this.applyModel))
        	this.$confirm('确定添加？', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
			}).then(() => { 
				this.fullscreenLoading = true;
		        createDataJson(url, this.applyModel).then(response => {
				var result = response.data;
				if(result.success) {
					this.fullscreenLoading = false;
					this.$message({
						message: result.msg,
						type: "success" //success/warning/info/error
					});
					//this.gotoListView();
					this.$router.push({path: '/apply'});
				} else {
					this.fullscreenLoading = false;
					this.$message({
						message: result.msg,
						type: "warning"
					});
				}
				});
			}).catch(() => {
				this.fullscreenLoading = false;
				this.$message({
					type: 'info',
					message: '已取消添加!'
				});
			});
         
        } else {
          this.$message({
            message: "请检查所填信息格式是否正确",
            type: "warning"
          });
          return false;
        }
      });
    },
    addContact() {
      //console.log('addDomain!');
      this.applyModel.userContacts.push({
        name: "",
        phone: "",
        relationship: "",
        relationshipVal: "",
        companyName: "",
        contactAddress: "",
        isKnow: 1,
        isKnowVal: ""
      });
    },
    backApply() {
      this.gotoListView();
    },
    removeContact(contact) {
      var index = this.applyModel.userContacts.indexOf(contact);

      if (index !== -1) {
        if (this.applyModel.userContacts.length == 1) {
          return;
        }
        this.applyModel.userContacts.splice(index, 1);
      }
    },
    gotoListView() {
      this.$router.push({
        path: "/apply"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#id {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
}

.el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  font-weight: 600;
  color: #2d2f33;
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
  color: #409eff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 15px;
}

.icon-minus {
  color: #409eff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 15px;
}
</style>
<style>
.create-box label.el-radio {
  margin-left: 10px;
}
.create-box .el-form-item__label {
  width: 135px !important;
}
.firstBox .el-form-item__label {
	width: 100px !important;
}
</style>

