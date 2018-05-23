<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="url参数">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">url参数追加</el-button>
                <el-button type="primary" @click="normalQuery">正常查询</el-button>
                <el-button type="primary" @click="expiredQuery">过期查询</el-button>
            </el-form-item>
        </el-form>
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
    </div>
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
      scroll: undefined,
      form: {
        url: ""
      }
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
    let query = this.$router.currentRoute.query;
    if (query) {
      Object.keys(query).forEach(key => {
        this.form.url += key + "=" + query[key] + "&&";
      });
    }
    this.form.url = this.form.url.substr(0, this.form.url.length - 2);
  },

  methods: {
    loadData() {},
    scrollPosition() {
      //父组件获取子组件的vm实例 使用this.$refs
      //当refs这个属性在组件上时  this.$refs 获取的是改组件的VM实例 即可以调用子组件的方法
      //当refs属性在DOM元素上时  this.$refs获取的就是当前的DOM元素
      let scroll = this.$refs.wrapper1;
      scroll.scrollTo(0, -200);
    },
    onSubmit() {
      this.$router.replace(
        this.$router.currentRoute.path + "?" + this.form.url
      );
    },
    normalQuery() {
      let that = this;
      axios
        .JsonpTest("", { count: 50, start: 0 }, { container: ".wrapper" })
        .then(data => {
          that.movieList = data.subjects;
          that.total = data.total;
        });
    },
    expiredQuery() {
      let that = this;
      axios
        .JsonpTest(
          "",
          { count: 50, start: 0 },
          { container: ".wrapper" },
          true,
          true
        )
        .then(data => {
          that.movieList = data.subjects;
          that.total = data.total;
        });
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