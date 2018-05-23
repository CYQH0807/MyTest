import axios from 'axios';
import axiosJsonp from 'axios-jsonp-pro';
import loading from '../plugin/loading';
import errorTable from '../plugin/error';
import {
  Message
} from 'element-ui';
import api from './api';
import router from '../router';
import util from '../util/util'
let resource = {};

/**
 * @author 池樱千幻
 * axios 请求封装 该封装将普通请求与jsonp请求一并封装在内
 * 外部引用了api.js 用于生成请求链接
 * 
 * 具体调用模式为 import axios from "../util/axios";  引入文件
 * axios.fun 其中fun是在api.js中定义的链接名称
 *  
 * 参数列表
 * @argument type  
 * 请求类型 如果是jsonp请求 该参数无效
 * @argument data
 * 请求参数 传递给后台的请求参数
 * @argument loadingOptions
 * 是否加载loading层 不传则为不加载 具体loading的参数参照 plugin/loading 中的注释
 * @argument errOptions
 * 是否增加error渲染 不传则为不加载 具体error的参数参照 plugin/error 中的注释
 * @argument isAuth
 * 是否进行isAuth验证
 * @argument isLogin
 * 是否进行登录验证
 * 
 */


Object.keys(api).forEach((item) => {

  Object.keys(api[item]).forEach((keys) => {
    //判断是否是jsonp请求
    let isJsonp = item == "axiosUrl" ? false : true;
    resource[keys] = function (options) {
      const opts = Object.assign({}, {
        type: "get",
        data: {},
        loadingOptions: false,
        errOptions: false,
        isAuth: false,
        isLogin: false
      }, options);
      let [promise, dataTmp, url, errorObj] = [, opts.data, api[item][keys]];
      if (opts.loadingOptions) {
        let loadingObj = loading.creat(opts.loadingOptions);
      }
      if (opts.isAuth) {
        //Auth认证
        console.log("Auth认证")
      }
      if (opts.isLogin) {
        //判断登录是否过期
        //如果过期 带当前url参数跳转到登录页面
        !util.isLogin() &&
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
          method: opts.type,
          url: url,
          timeout: 20000,
          params: dataTmp,
        });
      promise.then(response => {
        let data = response.data;
        if (opts.loadingOptions) {
          loading.close(loading);
        }

        errorTable.close();

        return data;
      }).catch(error => {
        if (!opts.errOptions) {
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          });
        } else {
          errorObj = errorTable.creat(opts.errOptions);
        }
        if (opts.loadingOptions) {
          loading.close(loading);
        }
      })
      return promise;
    }

  })

})

export default resource;
