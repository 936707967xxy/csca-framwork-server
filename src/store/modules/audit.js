import {
	loadApplyInfo,
	loadCredit,
	loadFinancial,
	loadPhone,
	loadOtherInfo
} from '@/apis/audit'

import {
  formatDate
} from '@/utils/date'

const audit = {
	state: {
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
			applyAmount: 0,
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
			userContacts: [{
				phoneid: '',
				applyId: '',
				name: '',
				phone: '',
				callcounts: '',
				callTime: '',
				mobileaddress: '',
				poRelationship: '',
				poRelationshipVal: '',
				poCompany: '',
				qsoneAddress: '',
				isFamilyKnow: '',
				isFamilyKnowVal: ''
			}],
			assetInfo: {
				asinfoPkId: '',
				propertyType: '123',
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
		},
		financialModel: { //财务数据
			cardBills: {
				cardbillsId: "",
				applyId: "",
				bankType: "",
				bankName: "",
				billsInfos: [{
					hccbiId: "",
					postAmt: "",
					tranDesc: "",
					tranDate: "",
					hccbiFkid: ""
				}]
			}
		},
		creditModel: {
			pbccre: {
				crId: "",
				addDate: "",
				jlycxchgrcx: "", //征信查询次数中筛选出近6个月个人查询次数（不含临柜查询）
				jlycxchbqsc: "", //征信查询次数中筛选出近6个月保前审查次数
				jsycxchoutdh: "", //征信近3个月内查询次数（不含贷后管理）
				zxsycxcs: "", //征信近3个月内查询次数
				zxyycxcssy: "", //征信近1个月内个人查询次数
				zxyycxcs: "", //征信近1个月内机构查询次数（不含贷后管理）
				dkdqyqje: "", //贷款当前逾期金额
				lndkjstyqcs: "", //最近两年内发放的贷款90天以上逾期总次数
				lndkyqys: "", //最近两年内发放的贷款逾期总月数
				xyfzb: "", //信用负债率
				qtdkyh: "", //其他贷款月还款总额
				fyhdkzb: "", //非银行贷款占比
				jsyxzdkbs: "", //最近3个月新增其他贷款笔数
				fdyhqs: "", //房贷已还期数
				fdyh: "", //房贷月还款总额
				fdze: "", //房贷发放总额
				zykdqyqje: "", //信用卡当前逾期金额
				lnxykyjstqzys: "", //最近两年内发放的信用卡90天以上逾期总次数
				lnxykyqzys: "", //最近两年内发放的信用卡逾期总月数
				xyksyzb: "", //信用卡已使用额度占比
				dzxykzged: "", //单张信用卡最高额度
				xyksxze: "", //信用卡授信总额
				sxsc: "", //授信时长
				wtrdbbs: "", //为他人担保笔数
				jstysyqzh: "", //发生过90天以上逾期的贷款账户数
				yqzhs: "", //发生过逾期的贷款账户数
				wjqzh: "", //未结清/销户账户（购房贷款）
				applyId: "" //
			},
			userCis: {
				cisId: "",
				addDate: "",
				lynzxcxs: "", //6月内资信查询次数
				zgyqQs: "", //最高逾期期数
				zgyqJe: "", //最高逾期金额
				dqyqZe: "", //当前逾期总额
				dkye: "", //贷款余额
				wjqbs: "", //未结清贷款笔数
				applyId: ""
			}
		}, //征信数据
		phoneModel: {
			contacts: [{
				phoneid: "", // 主键
				applyId: "", // 申请表id
				name: "", // 姓名
				phone: "", // 手机号
				addDate: "", // 添加时间
				callcounts: "", // 通话记录数
				callTime: "", // 通话时长
				mobileaddress: "", // 归属地
				poRelationship: "", // 关系ID
				poRelationshipVal: "", // 关系val
				poCompany: "", // 联系人所在公司
				qsoneAddress: "", // 联系人所在地址
				isFamilyKnow: "", // 联系人是否知晓
				isFamilyKnowVal: "" // 联系人是否知晓值
			}],
			phoneVerify: [{
				pvId: "",
				telNumber: "",
				knowVal: "",
				knowStr: "",
				telStatus: "",
				telStatusval: "",
				consId: "",
				remark: "",
				applyId: ""
			}]
		}, //电核
		otherInfoModel: {
			userChsi: {
				chsiId: "",
				addDate: "",
				graduation: "",
				major: "",
				status: "",
				shool: "",
				maxEdu: "",
				applyId: "",
				userName: "",
				userSex: "",
				birthdayTime: "",
				nationality: "",
				cardNumber: "",
				level: "",
				qualificationType: "",
				learningType: "",
				classGrade: "",
				studentNumber: "",
				jsonTime: "",
				branchCourts: ""
			},
			houseFund: {
				hfId: "",
				addDate: "", //
				siCom: "", //缴费单位
				siComType: "", //缴纳单位是否为第三方机构
				siBalance: "", //余额
				siBase: "", //月缴基数
				siSumAmount: "", //缴纳总金额
				hfSumMonths: "", //公积金断缴累计月数
				hfMonths: "", //公积金实际缴纳月数
				hsStatus: "", //当前缴费状态
				queryStatus: "", //是否查询成功
				applyId: ""
			},
			socialsecurity: {
				siId: "",
				addDate: "",
				siCom: "", //缴费单位
				siBase: "", //当年缴费基数
				siSumAmount: "", //当前个人账户累积存储额
				siSumMonths: "", //社保断缴累计月数
				siMonths: "", //社保缴纳总月数
				siStatus: "", //缴费状态
				queryStatus: "", //是否查询成功
				applyId: ""
			},
			taobao: {
				tbId: "",
				addDate: "",
				jsypjhk: "", // 近3个月平均还款金额
				jsyzcje: "", // 近3个月支出金额
				jsyzrje: "", // 近3个月转入金额
				jsyxfzb: "", // 近3个月消费占比
				bnyebljsy: "", // 余额宝累计6月收益
				zfbzhye: "", // 支付宝账户余额
				hbed: "", // 花呗可用额度
				adrss: "",
				shdzzs: "", // 收货地址总数
				bnshdz: "", // 近6个月收货地址
				applyId: "",
				addresses: [{
					tbAddressId: "",
					phone: "",
					location: "",
					takeman: "",
					detailedaddress: "",
					postcode: "",
					tbFkid: ""
				}]
			}
		} //其他信息
	},
	mutations: {
		SET_APPLY: (state, applyModel) => {
			state.applyModel = applyModel
		},
		SET_FINANCIAL: (state, financialModel) => {
			state.financialModel = financialModel
		},
		SET_CREDIT: (state, creditModel) => {
			state.creditModel = creditModel
		},
		UPDATE_CREDIT: (state, creditModel) => {
			state.creditModel = creditModel
		},
		SET_PHOME: (state, phoneModel) => {
			state.phoneModel = phoneModel
		},
		SET_OTHER: (state, otherInfoModel) => {
			state.otherInfoModel = otherInfoModel
		}
	},

	actions: {
		//获取申请数据
		LoadApplyInfo({
			commit
		}, applyId) {
			return new Promise((resolve, reject) => {
				loadApplyInfo(applyId).then(response => {
					var dataTemp = response.data;
					//console.log(JSON.stringify(dataTemp))
						if(dataTemp.startResidenceDate != null) {
							dataTemp.startResidenceDate = formatDate(new Date(dataTemp.startResidenceDate), 'yyyy-MM-dd hh:mm:ss');
						}
						if(dataTemp.comeHereDate != null) {
							dataTemp.comeHereDate = formatDate(new Date(dataTemp.comeHereDate), 'yyyy-MM-dd hh:mm:ss');
						}
						if(dataTemp.assetInfo.proBuyTime != null) {
							dataTemp.assetInfo.proBuyTime = formatDate(new Date(dataTemp.assetInfo.proBuyTime), 'yyyy-MM-dd hh:mm:ss');
						}
						if(dataTemp.assetInfo.carLoanDate != null) {
							dataTemp.assetInfo.carLoanDate = formatDate(new Date(dataTemp.assetInfo.carLoanDate), 'yyyy-MM-dd hh:mm:ss');
						}
						if(dataTemp.userOccupationalInfo.startWorkTime != null) {
							dataTemp.userOccupationalInfo.startWorkTime = formatDate(new Date(dataTemp.userOccupationalInfo.startWorkTime), 'yyyy-MM-dd hh:mm:ss');
						}
						if(dataTemp.userOccupationalInfo.companyRegtime != null) {
							dataTemp.userOccupationalInfo.companyRegtime = formatDate(new Date(dataTemp.userOccupationalInfo.companyRegtime), 'yyyy-MM-dd hh:mm:ss');
						}
						//借款用途为其他页面展示更换
						if(dataTemp.loanUse!=null&&dataTemp.loanUse==10){
							dataTemp.loanUseVal = dataTemp.loanUseText;
						}
						//客户来源为其他页面展示更换
						if(dataTemp.sources!=null&&dataTemp.sources==7){
							dataTemp.sourcesValue = dataTemp.sourcesText;
						}
						//单位性质为其他页面展示更换
						if(dataTemp.userOccupationalInfo.companyKind!=null&&dataTemp.userOccupationalInfo.companyKind==10){
							dataTemp.userOccupationalInfo.companyKindVa = dataTemp.userOccupationalInfo.companyKindTxt;
						}
						//职级为其他页面展示更换
						if(dataTemp.userOccupationalInfo.position!=null&&dataTemp.userOccupationalInfo.position==7){
							dataTemp.userOccupationalInfo.positionVal = dataTemp.userOccupationalInfo.positionTxt;
						}
						//私营企业类型为其他页面展示更换
						if(dataTemp.userOccupationalInfo.privateType!=null&&dataTemp.userOccupationalInfo.privateType==5){
							dataTemp.userOccupationalInfo.privateTypeVal = dataTemp.userOccupationalInfo.privateTypeText;
						}
					const data = dataTemp;
					if (!isEmptyObject(data)) {
						commit('SET_APPLY', data)
					}
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		LoadCredit({
			commit
		}, applyId) {
			return new Promise((resolve, reject) => {
				loadCredit(applyId).then(response => {
					const data = response.data;
					if (!isEmptyObject(data)) {
						commit('SET_CREDIT', data)
					}
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		UpdateCreditModel({
			commit
		}, model) {
			commit('UPDATE_CREDIT', data)
		},
		LoadFinancial({
			commit
		}, applyId) {
			return new Promise((resolve, reject) => {
				loadFinancial(applyId).then(response => {
					const data = response.data;
					if (!isEmptyObject(data)) {
						commit('SET_FINANCIAL', data)
					}
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		LoadCallBills({
			commit
		}, applyId) {
			return new Promise((resolve, reject) => {
				loadPhone(applyId).then(response => {
					const data = response.data;

					commit('SET_PHOME', data)

					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		LoadOther({
			commit
		}, applyId) {
			return new Promise((resolve, reject) => {
				loadOtherInfo(applyId).then(response => {
					const data = response.data;
					if (!isEmptyObject(data)) {
						commit('SET_OTHER', data)
					}
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}

	},
	getters: {
		applyModel: function(state) {
			return state.applyModel;
		},
		financialModel: function(state) {
			return state.financialModel;
		},
		creditModel: function(state) {
			return state.creditModel;
		},
		phoneModel: function(state) {
			return state.phoneModel;
		},
		otherInfoModel: function(state) {
			return state.otherInfoModel;
		}
	}
}

function isEmptyObject(e) {
	var t;
	for (t in e)
		return !1;
	return !0
}

export default audit
