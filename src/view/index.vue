<template>
  <div class="hello">
    <div class="progress" v-if="isShowProgress" @click="progressClick($event)">
      <el-progress :percentage="scrollPosition" :show-text="false" class="ttt"></el-progress>
    </div>
    <div class="formSelect">
      {{text}}
      <xSelect :optionData="options" v-bind:dataVal="'value'" :multiple="true" v-bind:dataLable="'label'" v-model="text" v-on:change="handleChange" v-on:remove-tag="handleRemoveTag"></xSelect>
      {{text1}}
      <xSelect :optionData="options" v-bind:dataVal="'value'" v-bind:dataLable="'label'" v-model="text1" v-on:change="handleChange" v-on:remove-tag="handleRemoveTag"></xSelect>
    </div>
    <el-row>
      <el-button @click="selectData">查询</el-button>
      <router-link to="betterScroll">登录测试页</router-link>
      <router-link to="erroreX">error组件测试页</router-link>

    </el-row>

    <div class="movieTable">
      <el-scrollbar style="height:100%">
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

    <div class="block">
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <div class="sea">
      <p class="title">the sea</p>
      <span class="wave"></span>
      <span class="wave"></span>
      <span class="wave"></span>
    </div>
  </div>
</template>

<script>
import xSelect from "../components/select";
import axios from "../util/axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      text: "",
      text1: "",
      pageSize: 10, //每页显示多少条
      total: 0, //总条数
      currentPage: 1, //当前第几页
      startPage: 0,
      scrollPosition: 0,
      isShowProgress: false,
      msg: "Welcome to Your Vue.js App",
      tableData: [],
      movieList: [],
      optionData: [
        { text: "测试1", val: "01" },
        { text: "测试2", val: "02" },
        { text: "测试3", val: "03" }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ],
      value: ""
    };
  },
  mounted() {
    this.loadData();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    watchText: function() {},
    handleChange: function(showValue) {
      console.log(showValue);
    },
    handleRemoveTag: function(item) {
      console.log(item);
    },
    handleCurrentChange: function(val) {
      this.startPage = (val - 1) * this.pageSize;
      this.loadData();
    },
    handleSizeChange: function(val) {
      this.currentPage = 1;
      this.loadData(val, 0);
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let allHeight =
        document.querySelector(".hello").clientHeight -
        document.body.clientHeight;
      this.isShowProgress = allHeight > 0;
      //progress进度条插件 有个小BUG 如果进度大于100% 就会有个报错 这里判断了大于100时 给进度条赋值100
      this.scrollPosition = Math.round(
        scrollTop / allHeight * 100 > 100 ? 100 : scrollTop / allHeight * 100
      );
    },
    progressClick: function(event) {
      let position = event.clientX / document.body.clientWidth;
      let scrollTop =
        document.querySelector(".hello").clientHeight -
        document.body.clientHeight;
      window.scrollTo(0, scrollTop * position);
    },
    selectData: function() {
      this.$confirm("是否重新查询?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.currentPage = 1;
          this.loadData(10, 0);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    clickOriginal: function(title) {
      this.$message({
        message: title,
        center: true
      });
    },
    loadData: function(pageSize = this.pageSize, startPage = this.startPage) {
      this.pageSize = pageSize;
      this.startPage = startPage;
      let that = this;
      axios
        .JsonpTest(
          "",
          { count: pageSize, start: startPage },
          { container: ".movieTable" }
        )
        .then(data => {
          console.log(data);
          that.movieList = data.subjects;
          that.total = data.total;
        });
    }
  },
  components: {
    xSelect
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin-top: 6px;
}
.formSelect {
  width: 600px;
  margin-left: 20px;
}
.formSelect::after {
  content: " ";
  display: table;
  clear: both;
}
.hello,
.movieTable {
  position: relative;
}
.movieTable {
  overflow: hidden;
}
.movieTableLink {
  text-decoration: none;
  color: crimson;
}
.pagination {
  float: right;
}
.block::after {
  content: " ";
  clear: both;
  display: table;
}
.progress {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1999;
}
.sea {
  width: 300px;
  height: 300px;
  background-color: whitesmoke;
  background-image: linear-gradient(
    darkblue,
    rgba(255, 255, 255, 0) 80%,
    rgba(255, 255, 255, 0.5)
  );
  border-radius: 5px;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.sea .title {
  color: white;
  font-size: 24px;
  font-family: serif;
  text-align: center;
  line-height: 250px;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  position: absolute;
  z-index: 1;
  width: 100%;
}

.sea .wave {
  position: absolute;
  top: -250px;
  left: -100px;
  width: 500px;
  height: 500px;
  background: deepskyblue;
  border-radius: 43%;
  filter: opacity(0.4);
  animation: drift linear infinite;
  transform-origin: 50% 48%;
}

.sea .wave:nth-of-type(1) {
  animation-duration: 5s;
}

.sea .wave:nth-of-type(2) {
  animation-duration: 7s;
}

.sea .wave:nth-of-type(3) {
  animation-duration: 9s;
  background-color: orangered;
  filter: opacity(0.1);
}

@keyframes drift {
  from {
    transform: rotate(360deg);
  }
}
</style>
