<template>
  <div class="slDiv" @click="stopPropagation($event)">
    <div v-if="multiple" class="multipleBox" @click="toggleOption">
      <div class="selectedItem" v-for="(item,index) in selectedVal" :key="index">{{item[dataLable]}}
        <i class="el-icon-close" @click="deleteItem(item,index,$event)"></i>
      </div>
    </div>
    <input class="btnSelect" @click="toggleOption" v-model="showValue" @change="handleChange(showValue)" v-on:input="this.$emit('input', selectedVal)" :placeholder="placeholderTxt" v-bind:data-val="selectedVal" readonly @blur="blurInput">
    <div v-show="isShowOption" class="ulDiv">
      <ul>
        <li v-for="(item,index) in optionData" :key="index" :class="{'selected': itemSelected(item)}" v-bind:data-val="item[dataVal]" @click="clickOption(item,$event)">{{item[dataLable]}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * 父组件使用v-model 子组件使用v-on:input 来实现父子之间的双向数据绑定
 *
 */
export default {
  data() {
    return {
      isShowOption: false,
      selectedVal: this.multiple ? [] : "",
      showValue: "",
      initHeight: 40
    };
  },
  props: {
    defaultPlaceholder: {
      type: String,
      default: "请选择"
    },
    optionData: [Object, Array],
    text: String,
    multiple: Boolean,
    //实际值
    dataVal: {
      type: String,
      default: "val"
    },
    //显示值
    dataLable: {
      type: String,
      default: "text"
    }
  },
  methods: {
    toggleOption: function() {
      this.isShowOption = !this.isShowOption;
    },
    blurInput: function() {
      //利用定时器 让clickOption这个方法先触发再关闭下拉列表
      setTimeout(() => {
        if (!this.multiple) {
          this.isShowOption = false;
        }
      }, 50);
    },
    clickOption: function(item, event) {
      if (!this.multiple) {
        this.showValue = item[this.dataLable];
        let $el = event.target;
        this.$emit("input", $el.dataset.val);
        this.selectedVal = $el.dataset.val;
      } else {
        if (this.selectedVal.indexOf(item) == -1) {
          this.selectedVal.push(item);
          this.$emit("input", this.selectedVal);
        } else {
          this.selectedVal.splice(this.selectedVal.indexOf(item), 1);
        }
      }
      this.emitChange(this.selectedVal);
      this.inputHeight();
    },
    itemSelected: function(item) {
      if (!this.multiple) {
        return this.selectedVal == item[this.dataVal];
      } else {
        return this.selectedVal.indexOf(item) != -1;
      }
    },
    deleteItem: function(item, index, event) {
      if (event) event.stopPropagation();
      this.selectedVal.splice(index, 1);
      this.emitChange(this.selectedVal);
      this.$emit("remove-tag", item);
      this.inputHeight();
    },
    inputHeight: function() {
      this.$nextTick(() => {
        document.querySelector(".btnSelect").style.height = this.multiple
          ? this.selectedVal.length == 0
            ? this.initHeight
            : document.querySelector(".multipleBox").clientHeight + 6 + "px"
          : this.initHeight;
      });
    },
    stopPropagation: function(event) {
      if (event) event.stopPropagation();
    },
    emitChange: function(val) {
      this.$emit("change", val);
    }
  },
  components: {},
  //计算属性不能传参数
  computed: {
    placeholderTxt() {
      if (!this.multiple) {
        return this.defaultPlaceholder;
      } else {
        return this.selectedVal.length == 0 ? this.defaultPlaceholder : "";
      }
    }
  },

  mounted: function() {
    document.addEventListener("click", event => {
      this.isShowOption = false;
    });
  }
};
</script>
<style scoped>
ul,
li {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.slDiv {
  float: left;
  margin-top: 5px;
  position: relative;
  width: 100%;
}
.slDiv .btnSelect {
  /* background: url("../images/selAppear.png") right no-repeat; */
  width: 100%;
  display: inline-block;
  text-indent: 10px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.slDiv .ulDiv {
  width: 100%;
  background: #fff;
  position: absolute;
  z-index: 100;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 4px;
  margin-top: 1px;
}
.slDiv .ulDiv.ulShow {
  display: block;
}
.slDiv .ulDiv ul li {
  text-indent: 10px;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
}
.slDiv .ulDiv ul li:hover {
  background-color: #f5f7fa;
}
.selected {
  color: #409eff;
  font-weight: 700;
}
.multipleBox {
  position: absolute;
  width: 95%;
}
.multipleBox::after {
  display: block;
  clear: both;
  content: " ";
}
.selectedItem {
  float: left;
  margin-left: 7px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  padding: 3px;
}
.el-icon-close {
  cursor: pointer;
}
</style>