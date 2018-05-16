import fetch from '../utils/fetch'

//获取申请的数据
export function loadApplyInfo(applyId){
  return fetch({
    url: '/sys/user/apply/data.do?applyId='+applyId,
    method: 'get'
  })
}

//获取征信数据applyId 人行征信 上海上海资信  同盾
export function loadCredit(applyId){
  return fetch({
    url: '/sys/user/credit/data.do?applyId='+applyId,
    method: 'get'
  })
}

//获取财务数据
export function loadFinancial(applyId){
  return fetch({
    url: '/sys/user/financial/data.do?applyId='+applyId,
    method: 'get'
  })
}

//获取电话核查数据
export function loadPhone(applyId){
  return fetch({
    url: '/sys/user/callbill/data.do?applyId='+applyId,
    method: 'get'
  })
}

//获取其他审核数据
export function loadOtherInfo(applyId){
  return fetch({
    url: '/sys/user/other/data.do?applyId='+applyId,
    method: 'get'
  })
}


//获取初审审核数据
export function loadPreAudit(applyId){
  return fetch({
    url: '/sys/preaudit/query.do?applyId='+applyId,
    method: 'get'
  })
}


//保存审核数据
export function saveAuditData(data){

}

//保存发送审核数据
export function submitAuditData(data){

}
