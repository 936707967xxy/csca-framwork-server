import fetch from '../utils/fetch'

export function fetchData(url, query) {
    var qs = require('qs');
    return fetch({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(query)
    })
}

export function getRequest(url) {
    return fetch({
        url: url,
        method: 'get'
    })
}

export function findById(url, query) {
    return fetch({
        url: url,
        method: 'get'
    })
}

export function updateData(url, data) {
    var qs = require('qs');
    return fetch({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    })
}

export function createData(url, data) {
    var qs = require('qs');
    return fetch({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    })
}

export function createDataJson(url, data) {
    return fetch({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}

export function updateDataJson(url, data) {
    return fetch({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}

export function batchRemoveData(url, ids) {
    return fetch({
        url: url,
        method: 'post',
        data: ids
    })
}

export function removeData(url) {
    return fetch({
        url: url,
        method: 'post'
    })
}

export function removeMultiData(url,data) {
 	return fetch({
    url: url,
    method: 'post',
    headers: {
      'Content-Type':'application/json'
    },
    data: data
  })
}


export function fetchPv(pv) {
    return fetch({
        url: '/article/pv',
        method: 'get',
        params: { pv }
    })
}

export function queryPostJson(url,data) {
  return fetch({
    url: url,
    method: 'post',
    headers: {
      'Content-Type':'application/json'
    },
    data: data
  })
}
