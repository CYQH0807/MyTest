/**
 * @author 池樱千幻
 * error页渲染 
 * 
 * @argument container -required
 * 错误页放置的位置 注:该错误页是由tr-td组成  container参数必须为table元素
 * @argument colspanNum
 * 单元格合并的数量 可不传 不传则使用计算得出需要合并的单元格
 * @argument errorMsg 
 * 错误信息 
 * @argument imgSrc
 * 错误页中的图片显示 不传则不显示图片 注: 如果图片在assets中 父组件引用图片的的使用要使用 require("../assets/logo.png")
 * @argument reloadFnc
 * 错误页中重新加载的方法 不传则没有重新加载的按钮
 * @argument className
 * 错误页中tr的class类 可以自定义样式 但注意 需要为全局样式
 * 
 */

import errorTable from './error'
import util from '../../util/util'
let ErrorTable = function () {
  this.defaults = {
    container: "",
    isShow: true,
    colspanNum: 1,
    errorMsg: "加载失败",
    isImg: false,
    isClick: false
  };
  return this;
};

ErrorTable.components = {};

ErrorTable.prototype.creat = function (options = {}) {
  this.ops = Object.assign({}, this.defaults, options);
  let errorBox = util.queryChildren(this.ops.container, ".errorBox");
  errorBox && document.querySelector(this.ops.container).removeChild(errorBox);
  this.errorTable = new ErrorTable.components.errorTable();
  //单元格合并的数量 如果参数中传递的有值 则使用传递值 没有 则使用计算值
  if (this.ops.colspanNum) {
    this.errorTable.colspanNum = this.ops.colspanNum
  } else {
    //计算单元格合并的数量 选取当前表格 children[0]=>是thead,children[0]=>是tr ,children =>是所有的th标签 
    this.errorTable.colspanNum =
      document.querySelector(this.ops.container).children[0].children[0].children.length;
  }
  this.errorTable.errorMsg = this.ops.errorMsg
  this.errorTable.className = this.ops.className
  if (this.ops.imgSrc) {
    this.errorTable.imgSrc = this.ops.imgSrc
    this.errorTable.isImg = true;
  }
  if (this.ops.reloadFnc) {
    this.errorTable.reloadFnc = this.ops.reloadFnc
    this.errorTable.isClick = true;
  }
  this.errorTable.isShow = true;
  this.errorTable.$mount(); //???
  document.querySelector(this.ops.container).children[1].appendChild(this.errorTable.$el);

  return this;
};

ErrorTable.prototype.close = function () {
  if (this.errorTable && this.errorTable.$el) {
    this.errorTable.close();
  };
}

export default {
  install(vue, options = {}) {
    ErrorTable.vue = vue;
    ErrorTable.components.errorTable = vue.extend(errorTable);
    vue.errorTable = vue.prototype.$errorTable = this;
  },
  creat(options) {
    ErrorTable.vue.__errorTables = ErrorTable.vue.__errorTables || [];
    let errorTable = new ErrorTable();
    ErrorTable.vue.__errorTables.push(errorTable);
    return errorTable.creat(options);
  },
  close(waiting) {
    if (waiting) {
      waiting.close();
    } else {
      if (ErrorTable.vue.__errorTables && ErrorTable.vue.__errorTables.length) {
        for (var i = 0; i < ErrorTable.vue.__errorTables.length; i++) {
          ErrorTable.vue.__errorTables[i].close();
        };
      };
    };
    return new Promise(resolve => {
      //console.log(1)	
      //resolve(222)
    });
  }
}
