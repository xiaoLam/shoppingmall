// 不要将网络请求编写在组件中
// 而是在network中新建一个针对某个组件的网络请求js文件
// 方便以后的维护

import {request} from "./resquest"

export function getmultidata() {
  return request({
    url : "/home/multidata"
  })
}

export function gethomegoods(type, page) {
  return request({
    url : "/home/data",
    params : { // 在params中填写需要凭借的查找
      type,
      page
    }
  })
}