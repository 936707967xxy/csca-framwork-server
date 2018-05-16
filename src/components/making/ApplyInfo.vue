<template>
<div id="apply-info-box">

  <!-- 借款需求 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>借款需求</span>
    </div>
    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">申请金额</label>
        <span class="data-span">{{applyModel.applyAmount}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">申请期限</label>
        <span class="data-span">{{applyModel.applyPeriod}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">申请产品</label>
        <span class="data-span">{{applyModel.productName}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">借款用途</label>
        <span class="data-span">{{applyModel.loanUseVal}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">客户来源</label>
        <span class="data-span">{{applyModel.sourcesValue}}</span>
      </el-col>
    </el-row>
  </el-card>

  <!-- 客户信息 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">姓名</label>
        <span class="data-span">{{applyModel.custName}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">曾用名</label>
        <span class="data-span">{{applyModel.nameBefore}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">性别</label>
        <span class="data-span">{{applyModel.custSex}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="10">
        <label class="lable-tit">证件号</label>
        <span class="data-span" style="width:180px;">{{applyModel.idNumber}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">毕业院校</label>
        <span class="data-span">{{applyModel.graduateInstitutions}}</span>
      </el-col>
      <el-col :span="6">
        <label class="lable-tit">学历</label>
        <span class="data-span">{{applyModel.eduBackgroundVal}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">供养人数</label>
        <span class="data-span">{{applyModel.raisePerson}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">子女人数</label>
        <span class="data-span">{{applyModel.childNumber}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">婚姻状况</label>
        <span class="data-span">{{applyModel.maritalStatusVal}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">移动电话</label>
        <span class="data-span">{{applyModel.custMobile}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">住宅电话</label>
        <span class="data-span">{{applyModel.houseTel}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">电子邮箱</label>
        <span class="data-span">{{applyModel.email}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">QQ/微信</label>
        <span class="data-span">{{applyModel.qqWechat}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">现居状况</label>
        <span class="data-span">{{applyModel.liveConditionsVal}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">月租金</label>
        <span class="data-span">{{applyModel.rentMonthlyPay}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="12">
        <label class="lable-tit">来申请地时间</label>
        <span class="data-span">{{applyModel.startResidenceDate}}</span>
      </el-col>
      <el-col :span="12">
        <label class="lable-tit-14">现居住地居住时间</label>
        <span class="data-span">{{applyModel.comeHereDate}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="24">
        <label class="lable-tit" style="width:100px;">户口所在地</label>
        <span class="data-span">{{applyModel.rresidenceAddress}}</span>
        <span class="data-span data-span-inner">{{applyModel.rresidenceZipCode}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="24">
        <label class="lable-tit">现居住地</label>
        <span class="data-span">{{applyModel.houseAddress}}</span>
        <span class="data-span data-span-inner">{{applyModel.houseZipCode}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="24">
        <label class="lable-tit">邮寄地址</label>
        <span class="data-span">{{applyModel.validMailAddrVal}}</span>
        <span class="data-span data-span-inner">{{applyModel.validPostCode}}</span>
      </el-col>
    </el-row>
  </el-card>

  <!-- 资产信息 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>资产信息</span>
    </div>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">房产类型</label>
        <span class="data-span">{{applyModel.assetInfo.propertyTypeVal}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">房产取得时间</label>
        <span class="data-span" :formatter="dateFor">{{applyModel.assetInfo.proBuyTime}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">购买/建造总价</label>
        <span class="data-span">{{applyModel.assetInfo.proBuyPrice}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">房产建筑面积</label>
        <span class="data-span">{{applyModel.assetInfo.gfa}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">借款年限</label>
        <span class="data-span">{{applyModel.assetInfo.proLoanLife}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">月还款金额</label>
        <span class="data-span">{{applyModel.assetInfo.proMortgageMonthly}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">借款余额</label>
        <span class="data-span">{{applyModel.assetInfo.proLoans}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">剩余期限</label>
        <span class="data-span">{{applyModel.assetInfo.proCreditPeriod}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">房产地址</label>
        <span class="data-span">{{applyModel.assetInfo.isHomeAddressVal}}</span>
        <!-- propertyAddress-->
      </el-col>
    </el-row>

    <!-- <el-row :gutter="5">
      <el-col :span="24">
        <label class="lable-tit">房产地址</label>
        <span class="data-span">{{applyModel.assetInfo.isHomeAddress}}</span>
        propertyAddress
      </el-col>
    </el-row> -->

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">拥有车辆</label>
        <span class="data-span">{{applyModel.assetInfo.carHava}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">购买价</label>
        <span class="data-span">{{applyModel.assetInfo.priceCar}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">车龄</label>
        <span class="data-span">{{applyModel.assetInfo.carAge}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">贷款发放日期</label>
        <span class="data-span">{{applyModel.assetInfo.carLoanDate}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">按揭月供</label>
        <span class="data-span">{{applyModel.assetInfo.carMortgageMonthly}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">贷款总额</label>
        <span class="data-span">{{applyModel.assetInfo.carLoanCeiling}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">借款余额</label>
        <span class="data-span">{{applyModel.assetInfo.carBanlanceVal}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">剩余期限</label>
        <span class="data-span">{{applyModel.assetInfo.carPeriodVal}}</span>
      </el-col>
    </el-row>
  </el-card>

  <!-- 职业信息 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>职业信息</span>
    </div>

    <el-row :gutter="5">
      <el-col :span="16">
        <label class="lable-tit">工作单位</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.fullWorkName}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">所属行业</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.industryIn}}</span>
      </el-col>


    </el-row>

    <el-row :gutter="5">
      <el-col :span="16">
        <label class="lable-tit">单位地址</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.companyAddress}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">邮编</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.companyZipCode}}</span>
      </el-col>
    </el-row>

    <!-- <el-row :gutter="5">
      <el-col :span="16">
        <label class="lable-tit">单位地址</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.companyAddress}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">邮编</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.companyZipCode}}</span>
      </el-col>
    </el-row> -->

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">公司规模</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.companySizeVal}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">单位性质</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.companyKindVa}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">职级</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.positionVal}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">所在部门</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.workDept}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">进入单位时间</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.startWorkTime}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">每月发薪日</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.payDayMonthlyVal}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">社保情况</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.socialSecurityVal}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">职务名称</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.jobTitle}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">其他收入(月均)</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.othterIncomeMonthly}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">每月薪金</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.salaryMonthly}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">发薪方式</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.payMethodVal}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">私营企业类型</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.privateTypeVal}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">员工人数</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.employeesNum}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">经营场所</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.premisesVal}}</span>
      </el-col>
      <el-col :span="8">
        <label class="lable-tit">成立时间</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.companyRegtime}}</span>
      </el-col>
    </el-row>

    <el-row :gutter="5">
      <el-col :span="8">
        <label class="lable-tit">单位电话</label>
        <span class="data-span">{{applyModel.userOccupationalInfo.companyTel}}</span>
      </el-col>
    </el-row>
  </el-card>


  <!-- 联系人信息 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>联系人信息</span>
    </div>

    <el-row :gutter="15">
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
      <el-col :span="5">
        <div class="grid-content bg-purple">工作单位</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">单位/居住地址</div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">是否知晓</div>
      </el-col>
    </el-row>

    <el-row :gutter="15" style="margin-top:6px;" v-for="(contact, index) in applyModel.afreshContacterInfoL" :key="index">
      <el-col :span="1">
        <div class="grid-content bg-purple">{{index+1}}</div>
      </el-col>
      <el-col :span="3">
          <span class="data-span">{{contact.poContactName}}</span>
      </el-col>
      <el-col :span="2">
        <span class="data-span">{{contact.poRelationship}}</span>
      </el-col>
      <el-col :span="3">
        <span class="data-span">{{contact.poMobile}}</span>
      </el-col>
      <el-col :span="5">
        <span class="data-span">{{contact.poCompany}}</span>
      </el-col>
      <el-col :span="6">
        <span class="data-span">{{contact.qsoneAddress}}</span>
      </el-col>
      <el-col :span="2">
        <span class="data-span">{{contact.isFamilyKnow}}</span>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import {
  findById
} from '@/apis/httpapis'
import {
  formatDate
} from '@/utils/date'
export default {
  name: 'applyInfo',
  props:{
    applyId:String
  },
  data() {
    return {
      applyModel: {
        applyId: '',
        signconfirmVal: '',
        signconfirm: '',
        storeName: '',
        storeId: '',
        particlesBorrow: '',
        creditSesame: '',
        apply: '',
        uuid: '',
        auditType: '',
        sources: '',
        precessStatusVal: '',
        precessStatus: '',
        precessId: '',
        suggestRate: '',
        suggestAmount: '',
        productPayVal: '',
        productPay: '',
        productFeeRate: '',
        productRate: '',
        applyPeriod: '',
        applyAmount: '',
        agreedProduct: '',
        agreedAmount: '',
        productName: '',
        productId: '',
        idAddr: '',
        comTypeVal: '',
        comType: '',
        incom: '',
        comTel: '',
        detailedAddr: '',
        custComAddr: '',
        custCom: '',
        custMobile: '',
        custAge: '',
        custSex: '',
        idTypeVal: '',
        idType: '',
        idNumber: '',
        custName: '',
        custId: '',
        loanId: '',
        invescode: '',
        loanUse: '',
        loanUseVal:'',
        sourcesText: '',
        salesEmpId: '',
        salesEmpName: '',
        salesEmpDeptId: '',
        salesEmpDeptName: '',
        nameBefore: '',
        graduateInstitutions: '',
        raisePerson: '',
        childNumber: '',
        houseTel: '',
        maritalStatus: '',
        maritalStatusVal: '',
        email: '',
        startResidence: '',
        eduBackground: '',
        eduBackgroundVal: '',
        qqWechat: '',
        comeHereDate: '',
        rresidenceAddress: '',
        rresidenceProvCode: '',
        rresidenceProvName: '',
        rresidenceCityCode: '',
        rresidenceCityName: '',
        rresidenceAreaCode: '',
        rresidenceAreaName: '',
        rresidenceAddressDetail: '',
        rresidenceZipCode: '',
        houseAddress: '',
        houseProvCode: '',
        houseProvName: '',
        houseCityCode: '',
        houseCityName: '',
        houseAreaCode: '',
        houseAreaName: '',
        houseAddressDetail: '',
        houseZipCode: '',
        liveConditions: '',
        liveConditionsVal: '',
        rentMonthlyPay: '',
        validMailAddr: '',
        validMailAddrVal: '',
        validMailAddrTxt: '',
        validPostCode: '',
        sourcesValue: '',
        afreshContacterInfoL: [{
          poContactName: '',
          poMobile: '',
          poRelationship: '',
          poRelationshipVal: '',
          poCompany: '',
          qsoneAddress: '',
          isFamilyKnow: '',
          isFamilyKnowVal: ''
        }],
        assetInfo: {
          asinfoPkId: '',
          propertyType: '',
          propertyTypeVal: '',
          proBuyTime: '',
          proBuyPrice: '',
          gfa: '',
          proLoanLife: '',
          proMortgageMonthly: '',
          proLoans: '',
          proCreditPeriod: '',
          propertyAddress: '',
          propertyProvCode: '',
          propertyProvName: '',
          propertyCityCode: '',
          propertyCityName: '',
          propertyAreaCode: '',
          propertyAreaName: '',
          propertyAddressDetail: '',
          propertyZipCode: '',
          isHomeAddress: '',
          isHomeAddressVal: '',
          carHava: '',
          carHavaVal: '',
          priceCar: '',
          carAge: '',
          carLoanDate: '',
          carMortgageMonthly: '',
          carLoanCeiling: '',
          carBanlanceVal: '',
          carPeriodVal: '',
          applyId: '',
          createTime: ''
        },
        userOccupationalInfo: {
          fullWorkName: '',
          industryIn: '',
          industryInVal: '',
          companyAddress: '',
          companyProvCode: '',
          companyProvName: '',
          companyCityCode: '',
          companyCityName: '',
          companyAreaCode: '',
          companyAreaName: '',
          companyAddressDetail: '',
          companyZipCode: '',
          companyTel: '',
          companyTelCode: '',
          companyTelValue: '',
          companyTelExt: '',
          companySize: '',
          companySizeVal: '',
          companyKind: '',
          companyKindVa: '',
          companyKindTxt: '',
          position: '',
          positionVal: '',
          positionTxt: '',
          workDept: '',
          startWorkTime: '',
          payDayMonthlyVal: '',
          socialSecurity: '',
          socialSecurityVal: '',
          jobTitle: '',
          othterIncomeMonthly: '',
          salaryMonthly: '',
          payMethod: '',
          payMethodVal: '',
          Type: '',
          TypeVal: '',
          TypeText: '',
          companyRegtime: '',
          percentageShares: '',
          employeesNum: '',
          premises: '',
          premisesVal: '',
          applyId: '',
          createTime: ''
        }
      }
    }
  },
  created() {
    const applyId = this.applyId
    var url = "/sys/apply/data.do?applyId="+applyId;
    /*var url = "/sys/applymodel/selectapplybyid.do?applyId="+applyId;*/
    findById(url).then(response => {
      //console.log(JSON.stringify(response.data));
      this.applyModel = response.data;
    })
  },
  methods: {
    dateFor(row, column, cellValue) {
      if (typeof(cellValue) != "undefined") {
        return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss');
      }

    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#apply-info-box {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
}

.el-row {
  margin-bottom: 15px;
}

.lable-tit {
  display: inline-block;
  width: 100px;
  float: none;
  text-align: right;
  box-sizing: border-box;
  padding-right: 8px;
}

.lable-tit-14 {
  display: inline-block;
  width: 140px;
  float: none;
  text-align: right;
  box-sizing: border-box;
  padding-right: 8px;
}

.data-span {
  font-size: 14px;
  display: inline-block;
  height: 28px;
  width: auto;
  min-width: 80px;
  padding: 0px 12px;
  border: 1px solid #d8dce5;
  border-radius: 4px;
  line-height: 28px;
  color: #5a5e66;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  background-color: #f5f7fa;
  cursor: not-allowed;
}

.data-span-inner {
  position: absolute;
  margin-left: 10px;
}

.el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  font-weight: 600;
  color: #2D2F33;
  font-size: 16px;
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
.box-card {
		margin-bottom: 15px;
	}
</style>
