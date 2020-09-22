import originAxios from 'axios'

export default function axios(option) {

  return new Promise((resolve, reject) => {
    //创建axios的实例
    const instance  = originAxios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    });
    //配置请求和响应拦截
    instance.interceptors.request.use(config => {

      return config
    },err => {
      console.log('request error！');
      return err
    })

    instance.interceptors.response.use(response => {
      console.log(response.data);
      return response.data
    },err => {
      console.log('来到了response拦截器的error方法');
      console.log(err);
      if(err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            break
          case 401:
            err.message = '未授权访问'
            break
        }
      }
      return err
    })

    //传入对象进行网络请求
    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
