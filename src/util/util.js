 import localStore from '../util/localStore'
 //url正则
//  let strRegex = "((https|http|ftp|rtsp|mms)?://)" +
//    "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
//    +
//    "(([0-9]{1,3}\\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
//    +
//    "|" // 允许IP和DOMAIN（域名）
//    +
//    "([0-9a-z_!~*'()-]+\\.)*" // 域名- www. 
//    +
//    "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\." // 二级域名 
//    +
//    "[a-z]{2,6})" // first level domain- .com or .museum 
//    +
//    "(:[0-9]{1,4})?" // 端口- :80 
//    +
//    "((/?)|" // a slash isn't required if there is no file name 
//    +
//    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)";
let strRegex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g;
 const util = {

   isLogin: () => {
     const userInfo = localStore.get("userInfo");
     if (userInfo) {
       return util.compareTime(new Date(userInfo.loginTime));
     }
     return false
   },
   compareTime: (time1, time2 = new Date(), outTime = 1 * 60 * 1000) => {
     if (time1 instanceof Date && time2 instanceof Date) {
       return time1.getTime() + outTime > time2.getTime()
     }
     console.error("参数不是时间类型");
     return false
   },
   queryChildren: (parentEl = "", childrenEl = "") => {
     let [parent, queryType, outChildren] = [document.querySelector(parentEl), , ];
     if (childrenEl.indexOf("#") == 0) {
       queryType = "id";
     } else if (childrenEl.indexOf(".") == 0) {
       queryType = "className";
     } else {
       console.error('请选择正确的子元素');
     }
     childrenEl = childrenEl.substr(1, childrenEl.length);
     if (parent) {
       outChildren = util.recursiveFind(parent, childrenEl, queryType);
     } else {
       console.error("请选择正确的父元素")
     }
     return outChildren;
   },
   recursiveFind: (parent, childrenEl, queryType) => {
     let outChildren;
     let childrenList = parent.children;
     if (childrenList.length > 0) {
       for (let i = 0; i < childrenList.length; i++) {
         const item = childrenList[i];
         if (item[queryType].indexOf(childrenEl) >= 0) {
           outChildren = item;
           break;
         }
         util.recursiveFind(item, childrenEl, queryType);
       }
     } else {
       return outChildren
     }

   },
   IsURL: (str_url) => {
     let re = new RegExp(strRegex);
     //re.test()
     if (re.test(str_url)) {
       return (true);
     } else {
       return (false);
     }
   },
   replaceUrl: (str, replStr) => {
     let re = new RegExp(strRegex);
     if (util.IsURL(str)) {
       str = str.replace(re, replStr);
     }
     return str;
   },
   getReguRL: (str) => {
     let re = new RegExp(strRegex);

     return str.match(new RegExp(strRegex))
   }



 }


 export default util;
