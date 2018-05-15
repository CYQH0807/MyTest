<template>
  <div class="hello">
    <div class="progress" v-if="isShowProgress" @click="progressClick($event)">
      <el-progress :percentage="scrollPosition" :show-text="false" class="ttt"></el-progress>
    </div>
    {{text}}
    <div class="formSelect">
      <xSelect :optionData="options" v-bind:dataVal="'value'" :multiple="true" v-bind:dataLable="'label'" v-model="text" v-on:change="handleChange" v-on:remove-tag="handleRemoveTag"></xSelect>
      <xSelect :optionData="options" v-bind:dataVal="'value'" v-bind:dataLable="'label'" v-model="text" v-on:change="handleChange" v-on:remove-tag="handleRemoveTag"></xSelect>

      <el-select v-model="value" multiple placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      {{value}}
    </div>

    <div class="movieTable">
      <el-table :data="movieList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="100">
        </el-table-column>
        <el-table-column label="中文名称" width="180">
          <template slot-scope="scope">
            <a :href="scope.row.alt" target="_blank" class="movieTableLink">{{ scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="original_title" label="英文名称">
        </el-table-column>
        <el-table-column prop="year" label="年份" width="100">
        </el-table-column>
        <el-table-column label="评分">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rating.average" disabled show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import xSelect from "../components/select";
import resource from "../util/resource";
export default {
  name: "HelloWorld",
  data() {
    return {
      text: "",
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
      this.pageSize = val;
      this.startPage = 0;
      this.currentPage = 1;
      this.loadData();
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
      this.scrollPosition = Math.round(scrollTop / allHeight * 100);
    },
    progressClick: function(event) {
      let position = event.clientX / document.body.clientWidth;
      let scrollTop =
        document.querySelector(".hello").clientHeight -
        document.body.clientHeight;
      window.scrollTo(0, scrollTop * position);
    },
    loadData: function() {
      let that = this;
      resource
        .JsonpTest(
          { count: that.pageSize, start: that.startPage },
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
  width: 300px;
  margin-left: 20px;
}
.hello,
.movieTable {
  position: relative;
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
</style>
