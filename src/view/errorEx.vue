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
    <div>{{urlData}}</div>
    <div v-urlRplace="urlData"></div>
  </div>
</template>

<script>
import axios from "../util/axios";
import util from "../util/util";
import errorTable from "../plugin/error";

export default {
    data() {
        return {
            tableData: [],
            urlData:
                "测试url地址 http://www.baidu.com 测试测试 如果发两个url呢? www.uuu9.com"
        };
    },

    components: {},

    computed: {},

    mounted() {
        //this.loadErrorData();
        //处理url
        // console.log(util.IsURL(this.urlData));
        // console.log(util.replaceUrl(this.urlData,"|--|"));
        // console.log(util.getReguRL(this.urlData));
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
                        imgSrc: require("../assets/logo.png")
                    }
                })
                .then(data => {
                    console.log(data.data.data);
                    that.tableData = data.data.data;
                });
        },
        loadErrorData() {
            let that = this;
            axios
                .errorQuery({
                    data: { count: 50, start: 0 },
                    errOptions: {
                        container: ".textTable",
                        className: "aaa",
                        errorMsg: "错误信息",
                        imgSrc: require("../assets/logo.png"),
                        reloadFnc: function() {
                            that.loadErrorData();
                        }
                    }
                })
                .then(data => {
                    console.log(data.data.data);
                    that.tableData = data.data.data;
                });
        }
    }
};
</script>
<style lang="scss" scoped >
.movieTable {
    height: 100%;
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