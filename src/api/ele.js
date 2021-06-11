import request from '@/utils/request'

export function getEleDetail(params) {
  return request({
    url: '/electric/data/getEleDetail',
    method: 'get',
    params
  })
}

export function addMonitoringName(params) {
  return request({
    url: '/electric/data/addMonitoringName',
    method: 'get',
    params
  })
}

export function getMonitoringList(params) {
  return request({
    url: '/electric/data/getMonitoringList',
    method: 'get',
    params
  })
}

export function removeMonitoring(params) {
  return request({
    url: '/electric/data/removeMonitoring',
    method: 'get',
    params
  })
}

export function getDeviceList(params) {
  return request({
    url: '/electric/data/getDeviceList',
    method: 'get',
    params
  })
}
export function getdisplayList(params) {
  return request({
    url: '/electric/data/getdisplayList',
    method: 'get',
    params
  })
}

export function bindDevice(params) {
  return request({
    url: '/electric/data/bindDevice',
    method: 'get',
    params
  })
}

export function getDisplayId(params) {
  return request({
    url: '/electric/data/getDisplayId',
    method: 'get',
    params
  })
}
export function removeDisplayId(params) {
  return request({
    url: '/electric/data/removeDisplayId',
    method: 'get',
    params
  })
}
