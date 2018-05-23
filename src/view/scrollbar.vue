<!-- element-ui 未在文档中出现的scrollbar组件 -->
<template>
  <div class="movieTable">
    <el-scrollbar class="scrollbar" :noresize="false">
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
            <span class="cursorPointer" @click="clickOriginal(scope.row.original_title)"> {{ scope.row.original_title }} </span>
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
    </el-scrollbar>
  </div>
</template>

<script>
/**
 * 此注释写于2018年05月15日 vue版本 2.5.2 element-ui 2.3.7
 * @author 池樱千幻
 * 根据element-ui源码 探索出element的scrollbar的用法
 * 路径https://github.com/ElemeFE/element/tree/dev/packages/scrollbar
 * 使用方法 <el-scrollbar style="height:100%" ></el-scrollbar>
 * 此style的高度必须写 或者使用class给el-scrollbar元素添加100%高度属性  不能写在wrapStyle或wrapClass这两个属性下
 * scrollbar/main.js中有如下参数
 *  native: Boolean //是否使用原生滚动条 (如果使用原生了 还用你这组件干什么) true 使用原生 false or 不写 就是组件模拟
 *  该组件是使用div模拟生成横纵滚动条 container内容外层包裹一个view 与view平级的有两的div 分别是横纵滚动条 这三层之外还有一个wrap包裹
 *
 *  wrapStyle: {},
 *  wrapClass: {}, class 要写在全局样式中 写到单个vue中的样式无效
 *  以上两个属性 是为了给wrap层添加样式 也就是整个组件的包裹层
 *  viewClass: {},
 *  viewStyle: {},
 *  以上两个属性 是为了给view层添加样式 也就是可视层
 *  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能 --- 注释是element的原本注释
 *  除性能之外 该属性还会把滚动条隐藏掉
 *  tag: {
 *      type: String,
 *     default: 'div'
 *   }
 *   这个属性在特殊情况下会使用 选择用哪类标签来包裹滚动内容
 *
 *  在没有设置滚动条位置的情况下 用起来还可以~ 暂时没有找到如何设置滚动条 --2018年05月15日14:49:15
 *
 */

import axios from "../util/axios";
export default {
  data() {
    return {
      movieList: [],
      wrapStyle: {
        height: "100%",
        border: "1px solid"
      }
    };
  },

  components: {},

  computed: {},

  mounted() {
    let that = this;
    axios
      .JsonpTest({
        data: { count: 50, start: 0 },
        loadingOptions: { container: ".movieTable" }
      })
      .then(data => {
        console.log(data);
        that.movieList = data.subjects;
        that.total = data.total;
      });
  },

  methods: {}
};
</script>
<style scoped>
.movieTable {
  height: 500px;
  overflow: hidden;
}
.scrollbar {
  height: 100%;
}
</style>