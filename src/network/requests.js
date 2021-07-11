import axios from "axios"

import { indicatorFunc } from './indicator/Indicator'

export function request(config) {
  const axiosObj = axios.create({
    baseURL: config.baseURL || "http://localhost:4000/",
    timeout: config.timeout || null
  })
  // 加载动画
  indicatorFunc(axiosObj)
  // axios及其实例对象的返回值是promise对象
  return axiosObj(config)
}







