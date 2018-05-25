 import localStore from '../util/localStore'

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

   }



 }


 export default util;
