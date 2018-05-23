<template>
  <tr class="errorBox" :class="className" v-show="errorShow">
    <td v-bind:colspan="colspanNum" class="error">
      <div>
        <img v-if="isImg" v-bind:src="imgSrc" alt="">
        <div>
          <span> {{errorMsg}}</span>
          <span class="reloadText" v-if="isClick" v-on:click="reloadFnc">点击刷新</span>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "errorTable",
  data() {
    return {
      errorShow: false
    };
  },
  props: {
    className: String,
    isShow: false,
    colspanNum: [String, Number],
    errorMsg: String,
    isImg: false,
    imgSrc: String,
    isClick: false,
    reloadFnc: [Object, Function]
  },
  methods: {
    close: function() {
      this.errorShow = false;
    }
  }
};
</script>

<style scoped>
.error {
  text-align: center;
}
.reloadText {
  cursor: pointer;
}
</style>
