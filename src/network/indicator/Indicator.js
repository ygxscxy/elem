import { Indicator } from 'mint-ui';
export function indicatorFunc(axiosObj) {
  // 添加一个请求拦截器
  axiosObj.interceptors.request.use(
    // 请求成功时拦截
    (config) => {
      // 开启动画
      Indicator.open();
      return config;
    },
    // 请求失败时拦截
    (err) => {
      return Promise.reject(err);
    }
  );

  // 添加一个响应拦截器
  axiosObj.interceptors.response.use(
    //  响应拦截,将动画关闭
    (response) => {
      Indicator.close();

      return response;
    },
    (err) => {
      Indicator.close();
      return Promise.reject(err);
    }
  );


}
