import fetch from '../utils/fetch'

//获取初始数据
export function initData(applyId){
  return fetch({
    url: '/sys/making/init.do?applyId='+applyId,
    method: 'get'
  })
}

//获取合同数据
export function loadContractApp(applyId){
  return fetch({
    url: '/sys/contract/queryapp.do?applyId='+applyId,
    method: 'get'
  })
}

//获取合同数据
export function loadContract(conId){
  return fetch({
    url: '/sys/contract/query.do?conId='+conId,
    method: 'get'
  })
}
