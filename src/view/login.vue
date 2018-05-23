<!-- 登录页面 -->
<template>
    <div class="v-login">
        <div class="loginForm">
            <el-form ref="form" :rules="rulesXp" :model="form" label-width="80px">
                <el-form-item label="用户名" prop="loginName">
                    <el-input v-model="form.loginName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import rules from "../util/validator";
import localStore from "../util/localStore";
export default {
  data() {
    return {
      form: {
        loginName: "",
        password: "",
        loginTime: new Date()
      },
      rulesXp: rules()
    };
  },

  components: {},

  computed: {
    rules: function() {
      return rules(["password", "loginName"]);
    }
  },

  mounted() {},

  methods: {
    onSubmit: function() {
      let that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$message({
            message: "登录成功",
            onClose: () => {
              localStore.set("userInfo", that.form);
              let query = that.$router.currentRoute.query;
              if (query && query.redirect) {
                that.$router.push(query.redirect);
              } else {
                that.$router.push("/");
              }
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style  lang="scss" scoped>
.v-login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/img/bg.jpg");
  background-size: 100% 100%;
  .loginForm {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.el-form-item__label {
  color: #ffffff;
}
</style>