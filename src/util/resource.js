import axios from 'axios';
import axiosJsonp from 'axios-jsonp-pro';

import loading from '../plugin/loading'
//封装请求
const apiHost = "http://127.0.0.1:8090/abc/";
const apiUrl = {
  querylList: {
    type: 'get',
    url: apiHost + 'hotel/getHotelList',
    urlTest: 'static/mock/list.json'
  },
  errorEg: {
    type: 'get',
    url: apiHost + 'hotel/getHotelList',
    urlTest: 'static/mock/list1.json'
  },
  KYtext: {
    type: 'get',
    url: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=',
    urlTest: 'http://ajax.googleapis.com/ajax/services/feed/load?q=http://www.bilibili.tv/rss-13.xml&v=1.0'
  }
}
let resource = {};
Object.keys(apiUrl).forEach((item) => {
  resource[item] = function (data = {}, loadingOptions = false) {
    let obj = apiUrl[item];
    let promise;
    let dataTmp = data;
    if (loadingOptions) {
      let loadingObj = loading.creat(loadingOptions);
    }
    promise = axios({
      adapter: process.env.mock == 'true' ? null : jsonpAdapter,
      method: obj.type,
      url: process.env.mock == 'true' ? obj.urlTest : obj.url,
      timeout: 20000,
      params: dataTmp,
    }).then(response => {
      let data = response.data;
      if (loadingOptions) {
        loading.close(loading);
      }
      return data;
    })
    return promise;
  }
});


//jsonp请求
const apiUrlJsonp = {
  JsonpTest: {
    type: 'get',
    url: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=',
    urlTest: 'https://api.douban.com/v2/movie/top250'
  }
}
Object.keys(apiUrlJsonp).forEach((item) => {
  resource[item] = function (data = {}, loadingOptions = false) {
    let obj = apiUrlJsonp[item];
    let promise;
    let dataTmp = data;
    if (loadingOptions) {
      let loadingObj = loading.creat(loadingOptions);
    }
    promise = axiosJsonp.jsonp(process.env.mock == 'true' ? obj.urlTest : obj.url, {
        params: dataTmp,
        timeout: 20000,
      })
      .then(function (response) {
        let data = response;
        if (loadingOptions) {
          loading.close(loading);
        }
        return data;
      }).catch(error => {});

    return promise;
  }
});



export default resource;
