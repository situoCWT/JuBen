<template>
  <div class="bg">
    <!-- 阿槑之剧 -->
    <div class="title">阿槑之剧</div>
    <div class="form">
      <div class="form_user">
        <i class="iconfont icon-yonghu"></i>
        <input v-model="form.username" placeholder="账号" type="text" />
      </div>
      <div class="form_pwd">
        <i class="iconfont icon-mima"></i>
        <input v-model="form.password" placeholder="密码" type="password" />
      </div>
      <div class="form_btn">
        <el-button type="primary" round class="btn" @click="login"
          >登录</el-button
        >
      </div>
    </div>
    <div class="footer">Cover By CWT</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    login() {
      if (!this.form.username) {
        this.$message.error("请输入账号");
        return;
      }
      if (!this.form.password) {
        this.$message.error("请输入密码");
        return;
      }
      let userJson = require("@/assets/json/user.json");
      let canLogin = false;
      userJson.forEach((item) => {
        if (
          item.username == this.form.username &&
          item.password == this.form.password
        ) {
          window.localStorage.setItem("jubenshaUser", item.username);
          if(item.username == 'caiwentian'){
            window.localStorage.setItem("role", "DM");
          }else{
            window.localStorage.setItem("role", "USER");
          }
          canLogin = true;
        }
      });
      if (!canLogin) {
        window.localStorage.setItem("role", "USER");
        this.$message.error("账号或密码错误!");
        return;
      }
      this.$router.push({ path: "home" });
    },
  },
};
</script>
<style lang="scss">
.el-message {
  min-width: 300px !important;
}
.bg {
  background-image: url("../../assets/images/bg.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  color: #ffffff;
  .title {
    font-size: 30px;
    text-align: center;
    padding-top: 60px;
  }
  .form {
    position: absolute;
    bottom: 80px;
    width: 100%;
    text-align: center;
    .form_user,
    .form_pwd {
      i {
        font-size: 30px;
      }
      input {
        background: transparent;
        border: none;
        border-bottom: 1px solid #ffffff;
        height: 30px;
        outline: none;
        box-shadow: none;
        color: #ffffff;
        position: relative;
        top: -10px;
        left: 5px;
        padding: 0 5px;
        &::-webkit-input-placeholder {
          color: #ffffff;
        }
        &::-moz-placeholder {
          color: #ffffff;
        }
        &:-moz-placeholder {
          color: #ffffff;
        }
        &::-ms-input-placeholder {
          color: #ffffff;
        }
      }
    }
    .form_btn {
      .btn {
        background: rgba(240, 116, 47, 1);
        border: none;
        box-shadow: none;
        width: 50%;
        margin-top: 20px;
        outline: none;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 20px;
    font-size: 15px;
    text-align: center;
    width: 100%;
  }
}
</style>