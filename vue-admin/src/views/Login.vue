<template>
  <div class="login-container">
    <vue-particles color="#fff" :particlesNumber='60' :moveSpeed='1.5' :lineOpacity='0.5' class="bg"></vue-particles>
    <div class="login-form">
    <el-row :gutter="20">
      <el-col :lg="6" :sm="10" class="aa">
          <h3>{{login.system}}</h3>
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="100px"
            class="login-ruleForm"
          >
            <el-form-item :label="login.username" prop="username">
              <el-input v-model="ruleForm2.username"></el-input>
            </el-form-item>
            <el-form-item :label="login.password" prop="password">
              <el-input type="password" v-model="ruleForm2.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
      </el-col>
    </el-row>
    </div>

  </div>
</template>
<script>
import { login } from "@/api/index";
export default {
  name: "login",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    let validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        password: "12345",
        username: "admin",
        clientId: "clients",
        clientSecret: "secrets",
        access_token: ""
      },
      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateName, trigger: "blur" }]
      },
      login:{
        system: '亚伯拉罕的家',
        username: '用户名',
        password: '登录密码'
      }
    };
  },
  methods: {
     submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //这里模拟管理员以及用户两种权限,一般的都是登陆后接口传过来
          let roles=[];
          roles.push(this.ruleForm2.username)
          this.$store.commit("COMMIT_ROLE", roles);
          this.$router.push({
                path: "/home"
              });
          login(this.ruleForm2)
            .then(res => {
              //提交数据到vuex
              sessionStorage.setItem("token",res.data.access_token);
              this.$store.commit("setToken", res.data.access_token);
              this.$store.commit("setPermission", this.ruleForm2.username);
              localStorage.setItem("username",this.ruleForm2.username);
              this.$message.success(res.msg);
              this.$router.push({
                path: "/"
              });
            })
            .catch(err => {
              console.log(err.message);
              this.$message.error("账号或密码有误");
              this.$router.push({
                path: "/login"
              });
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.bg{
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.login-container {
  /*background: #2d3a4b;*/
  background: url("../assets/img/bg.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  display: table;
  .login-form {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: white;
    font-size: 18px;
    .aa{
      margin: auto;
      float: none;
    }
    h3{
      line-height: 60px;
      margin-left: 100px
    }
    .acount{
      text-align: left
    }
  }
}
</style>

