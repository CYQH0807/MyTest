<template>
    <better-scroll :data="movieList" class="wrapper" ref="wrapper1">
        <el-table :data="movieList" style="width: 100%">
            <el-table-column prop="id" label="ID" width="100">
            </el-table-column>
            <el-table-column label="中文名称" width="180">
                <template slot-scope="scope">
                    <a :href="scope.row.alt" target="_blank" class="movieTableLink">{{ scope.row.title }}</a>
                </template>
            </el-table-column>
            <el-table-column class="cursorPointer" label="英文名称">
                <template slot-scope="scope">
                    <span class="cursorPointer"> {{ scope.row.original_title }} </span>
                </template>
            </el-table-column>
            <el-table-column prop="year" label="年份" width="100">
            </el-table-column>
            <el-table-column label="评分" width="200">
                <template slot-scope="scope">
                    <el-rate v-model="scope.row.rating.average" disabled show-score text-color="#ff9900" score-template="{value}">
                    </el-rate>
                </template>
            </el-table-column>

            <el-table-column label="分类">
                <template slot-scope="scope">
                    <el-tag type="success" class="marginRight7" v-for="(item,index) in scope.row.genres" :key="index">{{item}}</el-tag>
                </template>
            </el-table-column>

        </el-table>

        <div class="aaa" @click="scrollPosition">123123</div>

    </better-scroll>
</template>

<script>
/**
 * @author 池樱千幻
 *
 *
 */

import axios from "../util/axios";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      movieList: [],
      scroll: undefined
    };
  },

  components: {},

  computed: {},

  mounted() {
    let that = this;
    axios
      .JsonpTest("", { count: 50, start: 0 }, { container: ".wrapper" })
      .then(data => {
        that.movieList = data.subjects;
        that.total = data.total;
      });
  },

  methods: {
    scrollPosition() {
      //父组件获取子组件的vm实例 使用this.$refs
      //当refs这个属性在组件上时  this.$refs 获取的是改组件的VM实例 即可以调用子组件的方法
      //当refs属性在DOM元素上时  this.$refs获取的就是当前的DOM元素
      let scroll = this.$refs.wrapper1;
      scroll.scrollTo(0, -200);
    }
  }
};
</script>
<style scoped>
.wrapper {
  height: 500px;
  border: 1px solid;
  overflow: hidden;
  position: relative;
}
.content {
  height: 100%;
}
.aaa {
  position: fixed;
  right: 20px;
  top: 30px;
  border: 1px solid;
  width: 100px;
  height: 100px;
}
</style>