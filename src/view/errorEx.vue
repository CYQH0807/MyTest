<!-- element-ui 未在文档中出现的scrollbar组件 -->
<template>
    <div class="movieTable">
        <table class="textTable">
            <thead>
                <tr>
                    <th>日期</th>
                    <th>姓名</th>
                    <th>地址</th>
                </tr>
            </thead>
            <tbody>
                <tr align="center" v-for="(item,key) in tableData" :key="key">
                    <td>{{item.date}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.address}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "../util/axios";
import errorTable from "../plugin/error";

export default {
  data() {
    return {
      tableData: []
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      let that = this;
      axios
        .querylList({
          data: { count: 50, start: 0 },
          errOptions: {
            container: ".textTable",
            className: "aaa",
            errorMsg: "错误信息",
            imgSrc: require("../assets/logo.png"),
            reloadFnc: function() {
              alert(1);
            }
          }
        })
        .then(data => {
          console.log(data.data.data);
          that.tableData = data.data.data;
        })
        .catch(e => {
          console.log("666");
        });
    }
  }
};
</script>
<style lang="scss" scoped >
.movieTable {
  height: 100%;
  overflow: hidden;
}
.scrollbar {
  height: 100%;
}
.textTable {
  width: 800px;
  margin: 40px auto 0px auto;
  thead {
    background-color: #d3dce6;
  }
  tr {
    height: 30px;
    line-height: 30px;
  }
}
table,
table tbody tr td {
  border: 1px solid #0094ff;
}
table {
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
}
</style>