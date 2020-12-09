<template>
  <div class="main">
    <div class="login-wrap">
      <div class="login-pic">
        <img
          class="pic_img"
          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1820699493,1807181333&fm=26&gp=0.jpg"
          alt=""
        />
      </div>
      <div class="login-info">
        <div class="info_title">
          <p>账号登录</p>
          <img class="info_title_icon" :src="infoIcon" alt="" />
        </div>
        <div class="login-form">
          <el-form
            :model="loginForm"
            status-icon
            label-position="left"
            label-width="0px"
            class="demo-ruleForm"
            @keyup.enter.native.capture.prevent="login"
          >
            <el-form-item prop="username">
              <label>
                <img
                  class="fromIcon"
                  :src="
                    CheckUsername.isCheck
                      ? CheckUsername.select
                      : CheckUsername.normal
                  "
                />
              </label>
              <input
                v-model="loginForm.username"
                auto-complete="off"
                @focus="CheckUsername.isCheck = true"
                @blur="CheckUsername.isCheck = false"
                clearable
              />
            </el-form-item>
            <el-form-item prop="password">
              <label>
                <img
                  class="fromIcon"
                  :src="
                    CheckPassword.isCheck
                      ? CheckPassword.select
                      : CheckPassword.normal
                  "
                />
              </label>
              <input
                v-model="loginForm.password"
                auto-complete="off"
                @focus="CheckPassword.isCheck = true"
                @blur="CheckPassword.isCheck = false"
                clearable
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "personal",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      //   loginPic:
      //     "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1820699493,1807181333&fm=26&gp=0.jpg",
      CheckUsername: {
        isCheck: false,
        select: "../../assets/imgs/login/user_male_circle_select.png",
        normal: "../../assets/imgs/login/user_male_circle_normal.png",
      },
      CheckPassword: {
        isCheck: false,
        select: require("../../assets/imgs/login/lock_select.png"),
        normal: require("../../assets/imgs/login/lock_normal.png"),
      },
    };
  },
};
</script>
<style scoped></style>
