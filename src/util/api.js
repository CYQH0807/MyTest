//请求URL

//区分测试环境与正式环境的host
const reqHost = process.env.mock == 'true' ? "" : "http://www.baidu.com";

export default {
  //json请求
  axiosUrl: {
    querylList: reqHost + "static/mock/list.json"
  },
  //jsonp请求
  axiosJsonpUrl: {
    JsonpTest: reqHost + "https://api.douban.com/v2/movie/top250"
  }

}
