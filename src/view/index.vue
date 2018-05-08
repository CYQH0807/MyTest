<template>
  <div class="hello">

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
    {{text}}
    <div class="formSelect">
      <xSelect :optionData="options" v-bind:dataVal="'value'" :multiple="true" v-bind:dataLable="'label'" v-model="text" v-on:change="handleChange" v-on:remove-tag="handleRemoveTag"></xSelect>

      <el-select v-model="value" multiple placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      {{value}}
    </div>
  </div>
</template>

<script>
import xSelect from "../components/select";
export default {
  name: "HelloWorld",
  data() {
    return {
      text: "",
      msg: "Welcome to Your Vue.js App",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
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
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  mounted() {
    //this.$loading.creat({ container: ".hello", mini: true, text: true });
  },
  methods: {
    watchText: function() {},
    handleChange: function(showValue) {
      console.log(showValue);
    },
    handleRemoveTag: function(item) {
      console.log(item);
    }
  },
  components: {
    xSelect
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-table {
  background-color: #cccccc;
}
.formSelect {
  width: 300px;
  margin-left: 20px;
}
</style>
