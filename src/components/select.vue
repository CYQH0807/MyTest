<!--  -->
<template>
  <div class="slDiv">
    <input v-if="!multiple" class="btnSelect" @click="toggleOption" v-model="showValue" v-on:input="changeInput(selectedVal)" :placeholder="defaultPlaceholder" v-bind:data-val="selectedVal" readonly @blur="blurInput">
    <div v-show="isShowOption" class="ulDiv">
      <ul>
        <li v-for="(item,index) in optionData" :key="index" :class="{'selected': itemSelected(item[dataVal])}" v-bind:data-val="item[dataVal]" @click="clickOption(item,$event)">{{item[dataLable]}}</li>
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
      selectedVal: "",
      showValue: ""
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
        this.isShowOption = false;
      }, 50);
    },
    clickOption: function(item, event) {
      this.showValue = item[this.dataLable];
      let $el = event.target;
      this.changeInput($el.dataset.val);
      this.selectedVal = $el.dataset.val;
    },
    itemSelected: function(val) {
      if (this.selectedVal == val) {
        return true;
      } else {
        return false;
      }
    },
    changeInput: function(val) {
      this.$emit("input", val);
    }
  },
  components: {},
  //计算属性不能传参数
  computed: {},

  mounted: function() {}
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
</style>