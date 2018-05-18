<!-- 表单校验 -->
<template>

    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
            <el-header>
                <h3>表单校验</h3>
            </el-header>
            <el-main class="main">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="name">
                        <el-input type="number" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间" required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="即时配送" prop="delivery">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="活动性质" prop="type">
                        <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源" prop="resource">
                        <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="金额" prop="floatNumber">
                        <el-input placeholder="请输入两位以内的小数" v-model="ruleForm.floatNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="mail">
                        <el-input v-model="ruleForm.mail"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码" prop="idCord">
                        <el-input v-model="ruleForm.idCord"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>

                <el-form :model="ruleForm1" :rules="rulesXp" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm1.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="againPwd">
                        <el-input type="password" v-model="ruleForm1.againPwd"></el-input>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
import rules from "../util/validator";
export default {
  data() {
    let that = this;
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        floatNumber: "",
        mail: "",
        phone: "",
        idCord: ""
      },
      ruleForm1: {
        password: "",
        againPwd: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    rulesXp: function() {
      return rules(["password", "againPwd"], {
        password: this.ruleForm1.password
      });
    },
    rules: function() {
      return rules();
    }
  },
  mounted() {}
};
</script>
<style scoped>
h3,
.line {
  text-align: center;
}
.main {
  width: 80%;
}
</style>