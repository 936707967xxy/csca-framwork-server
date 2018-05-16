import {
	initData,
	loadContractApp,
	loadContract
} from '@/apis/contract'

const contract = {
	state: {
		contractModel: {
			remarks:"",
			conId:"",// 主键
			irrVal:"",
			custName:"",
			applyMoney:"",
			idNumber:"",
			bankId:"",
			loanId:"",// 申请编号
			createTime:"",// 创建时间
			conStatus:"",// 合同状态
			bank:"",// 开户行
			backBranch:"",// 支行名称
			backBranchAddr:"",// 支行详细地址
			signAddr:"",// 签约地
			signStore:"",// 签约门店
			bankNo:"",// 银行账户
			bankPhoneNo:"",// 银行卡预留手机号
			productPay:"",// 还款方式
			productPayVal:"",// 还款方式
			signType:"",// 签约类型
			productPeriod:"",// 签约产品期限
			productFeeRate:"",// 签约产品费率 json
			productRate:"",// 签约产品利率
			productName:"",// 签约产品名称
			productId:"",// 签约产品
			surplus:"",// 剩余债权
			debt:"",// 债权值
			loanAmount:"",// 放款金额
			conNo:"",// 合同编号
			conAmount:"",// 合同金额
			endTime:"",// 结束日期
			startTime:"",// 开始日期
			signTime:"",// 签约日期
			applyId:"",// 申请id
			billDate:"",// 账单日
			prodAlias:"",
			proId:"",
			proName:"",
			cityName:"",
			cityId:"",
			payDate:"",// 还款日
			serviceFee:"",// 服务费用
			bankManagerFee:"",// 账户管理费
			realRate:0,
			repaymentPlans:[{
					planId:"",//
					repayStatus:"",// 还款状态
					advanceShould:"",// 提前还清应还金额
					reduceCapi:"",// 减免金额
					reduceFee:"",// 减免金额
					preretuamtCredit:"",// 提前还清减免渠道服务费2（z2）
					preretuamtHxb:"",// 提前还清减免红小宝平台服务费
					preretuamtChannel:"",// 提前还清减免渠道服务费1（z1）给至信
					bal:"",// 剩余本金
					billsDate:"",
					shouldDate:"",// 应还日期
					shouldInte:"",// 应还利息
					shouldCapi:"",// 应还本金
					shouldAmt:"",// 应还金额
					shouldTerm:"",// 应还期数
					applyId:"",// 申请id
					conId:"",// 合同id
					loanId:""// 申请编号
			}]
		}
	},
	mutations: {
		SET_CONTRACT: (state, contract) => {
			var temp;
			if (contract != null && contract != "" && contract != undefined && contract != temp) {
				state.contractModel = contract
			}
		},
		SET_PLAN: (state, plan) => {
			state.contractModel.repaymentPlans = plan
		}
	},

	actions: {
		//获取申请数据
		InitContractData({
			commit
		}, applyId) {
			return new Promise((resolve, reject) => {
				initData(applyId).then(response => {
					const data = response.data;
					commit('SET_CONTRACT', data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		LoadContractApp({
			commit
		}, applyId) {
			return new Promise((resolve, reject) => {
				loadContractApp(applyId).then(response => {
					const data = response.data;
					commit('SET_CONTRACT', data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},


		LoadContract({
			commit
		}, applyId) {
			return new Promise((resolve, reject) => {
				loadContract(applyId).then(response => {
					const data = response.data;
					commit('SET_CONTRACT', data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
	},
	getters: {
		contractModel: function(state) {
			return state.contractModel;
		}
	}
}

function isEmptyObject(e) {
	var t;
	for (t in e)
		return !1;
	return !0
}

export default contract
