import axios from 'axios';
import axiosJsonp from 'axios-jsonp-pro';
import loading from '../plugin/loading';
import {
  Message
} from 'element-ui';
import api from './api';
import router from '../router';

let resource = {};

Object.keys(api).forEach((item) => {

  Object.keys(api[item]).forEach((keys) => {
    //判断是否是jsonp请求
    let isJsonp = item == "axiosUrl" ? false : true;
    resource[keys] = function (type = "get", data = {}, loadingOptions = false, isAuth = false, isLogin = false) {
      let [promise, dataTmp, url] = [, data, api[item][keys]];
      if (loadingOptions) {
        let loadingObj = loading.creat(loadingOptions);
      }
      if (isAuth) {
        //Auth认证
      }
      if (isLogin) {
        //判断登录是否过期
        //如果过期 带当前url参数跳转到登录页面
        router.replace({
          name: "login",
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
      promise = isJsonp ?
        axiosJsonp.jsonp(url, {
          params: dataTmp,
          timeout: 20000,
        }) : axios({
          method: type,
          url: url,
          timeout: 20000,
          params: dataTmp,
        });
      promise.then(response => {
        let data = response.data;
        if (loadingOptions) {
          loading.close(loading);
        }
        return data;
      }).catch(error => {
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        });
      })
      return promise;
    }

  })

})

export default resource;
