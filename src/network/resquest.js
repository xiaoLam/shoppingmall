// 安装好axios组件后
// 引入axios
import axios from "axios"

// 创建并导出axios实例
export function request(config) {
  const instans = axios.create({
    baseURL : "http://152.136.185.210:8000/api/w6",
    timeout : 5000
  })

  // 设置响应拦截器
  instans.interceptors.response.use((res) => {
    // 过滤掉其他的信息, 只返回data
    return res.data
  }, (err) => {
    return err
  })

  // 发送真正的网络请求
  return instans(config)
}