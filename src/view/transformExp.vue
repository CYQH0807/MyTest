<template>

  <div class="dashboard">
    <div class="flex-container column">
      <div class="item one" data-order="1" @click="clickChart('1')" style="transform: translate(-22.4%,-33.5%) scale(0.33)">
        <img src="../assets/img/testImg1.png">
      </div>
      <div class="item two" data-order="2" @click="clickChart('2')" style="transform: translate(-22.4%,0.5%) scale(0.33)">
        <img src="../assets/img/testImg1.png">
      </div>
      <div class="item three" data-order="3" @click="clickChart('3')" style="transform: translate(-22.4%,34.5%) scale(0.33)">
        <img src="../assets/img/testImg1.png">
      </div>
      <div class="item four active" data-order="4" @click="clickChart('4')" style="transform: translate(43.7%, 0) scale(1)">
        <img src="../assets/img/testImg1.png">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    clickChart(clickIndex) {
      let activeItem = document.querySelector(".flex-container .active");
      let activeIndex = activeItem.dataset.order;
      let clickItem = document.querySelectorAll(".flex-container .item")[
        clickIndex - 1
      ];
      if (activeIndex === clickIndex) {
        return;
      }
      activeItem.classList.remove("active");
      clickItem.classList.add("active");
      this._setStyle(clickItem, activeItem);
    },
    _setStyle(el1, el2) {
      let transform1 = el1.style.transform;
      let transform2 = el2.style.transform;
      el1.style.transform = transform2;
      el2.style.transform = transform1;
    }
  },
  mounted() {
    // this.items = document.querySelectorAll(".flex-container .item");
    // for (let i = 0; i < this.items.length; i++) {
    //   this.items[i].dataset.order = i + 1;
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
.item {
  padding: 0px;
  margin: 0px;
  width: 68%;
  height: 100%;
  position: absolute;
  transform: scale(0.33);
  text-align: center;
  transition: all 0.8s;
  background: rgba(32, 32, 35, 0.5);
}

.dashboard {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  padding-top: 5%;
  background: url("../assets/img/bg.jpg");
  background-size: 100% 100%;
}
img {
  width: 100%;
  height: 100%;
}

.flex-container.column {
  position: relative;
  height: 90%;
  width: 90%;
  overflow: hidden;
  margin: 0 auto 100px auto;
  box-sizing: content-box;
}

.active {
  height: 100%;
  width: 69%;
  margin-left: 10px;
  line-height: 300px;
}
</style>
