import {
	loadPreAudit
} from '@/apis/audit'

const preaudit = {
	state: {
		preAuditModel: {
			preId:"",
			productId:"",
			productName:"",
			handleOption:"",
			handleOptionval:"",
			creditRemark:"",
			financeRemark:"",
			otherRemark:"",
			handleTime:"",
			empId:"",
			empName:"",
			taskId:"",
			processId:"",
			applyId:"",
			preStatus:"",
			innerRemark:"",
			handleMoney:"",
		},
		fileList:[]
	},
	mutations: {
		SET_PREAUDIT: (state, preAuditModel) => {
			state.preAuditModel = preAuditModel
		},
		UPDATE_CRDIT_REMARK: (state, creditRemark) => {
			state.preAuditModel.creditRemark = creditRemark
		},
		UPDATE_FINANCE_REMARK: (state, financeRemark) => {
			state.preAuditModel.financeRemark = financeRemark
		},
		UPDATE_OTHER_REMARK: (state, otherRemark) => {
			state.preAuditModel.otherRemark = otherRemark
		},
		SET_FILE_LIST:(state, fileList) => {
			state.fileList.push(fileList)
		},
		UPDATE_FILE_LIST:(state, fileList) => {
			state.fileList = fileList
		}
	},
	actions: {
		//获取申请数据
		LoadPreAudit({commit}, applyId) {
			return new Promise((resolve, reject) => {
				loadPreAudit(applyId).then(response => {
					console.info("#############:" + response.data);
					const data = response.data;
					if(data == "" || data == null || data == undefined){

					}else{
						commit('SET_PREAUDIT', data)
					}

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		addFileList({commit}, fileList) {
			console.log('fileList---------',fileList);
			commit('SET_FILE_LIST', fileList)
		}

	},
	getters: {
		preAuditModel: function(state) {
			return state.preAuditModel;
		}
	}
}

function isEmptyObject(e) {
	var t;
	for (t in e)
		return !1;
	return !0
}

export default preaudit
