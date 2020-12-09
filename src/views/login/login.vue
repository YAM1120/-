<template>
  <div class="main">
    <div class="login-wrap">
      <div class="login-pic">
        <img class="pic_img" :src="loginPic" alt="" />
      </div>
      <div class="login-info">
        <div class="info_title">
          <p>账号登录</p>
          <i class="el-icon-lollipop"></i>
          <!-- <img class="info_title_icon" :src="infoIcon" alt="" /> -->
        </div>
        <div class="login-form">
          <el-form
            :model="loginForm"
            :rules="verifyRules"
            ref="ruleVerify"
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
                class="info_input"
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
                class="info_input code_input"
                v-model="loginForm.password"
                auto-complete="off"
                @focus="CheckPassword.isCheck = true"
                @blur="CheckPassword.isCheck = false"
                clearable
              />
            </el-form-item>
            <div class="remember_code">
              <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
            </div>
            <el-form-item>
              <el-button
                class="login_enter"
                size="medium"
                type="primary"
                @click="handleJump"
                >立即登录</el-button
              >
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
    var verifyPass = (rule, value, callback) => {
      console.log("aaaaaaaaaverifyPass");
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      setTimeout(() => {
        var reg = /^[A-Za-z0-9]{6,12}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入密码数字和字母且长度大于6小于12组合"));
        } else {
          callback();
          // if (value < 18) {
          //   callback(new Error("必须年满18岁"));
          // } else {
          //   callback();
          // }
        }
      }, 1000);
      //   var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+=|{}':;',\[\].<>/?\uff01\uffe5\u2026\uff08\uff09\u2014\u3010\u3011\u2018\u2019\uff1b\uff1a\u201c\u201d\u3002\uff0c\u3001\uff1f])[A-Za-z\d~!@#$%^&*()+=|{}':;',\[\].<>/?\uff01\uffe5\u2026\uff08\uff09\u2014\u3010\u3011\u2018\u2019\uff1b\uff1a\u201c\u201d\u3002\uff0c\u3001\uff1f]{8,30}$/;
      //   // var reg = /^[A-Za-z0-9]{5,18}$/
      //   console.log("aaaaaaaaa");
      //   if (value === "") {
      //     callback(new Error("请输入密码"));
      //   } else {
      //     if (reg.test(value)) {
      //       if (this.loginForm.password !== "") {
      //         this.$refs.ruleVerify.validateField("password");
      //       }
      //       callback();
      //     } else {
      //       return callback(
      //         new Error("请输入由字母、数字和字符组成的8位到30位密码")
      //       );
      //     }
      //   }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        checked: false
      },
      //密码验证
      verifyRules: {
        password: [{ required: true, validator: verifyPass, trigger: "blur" }]
      },
      loginPic:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1820699493,1807181333&fm=26&gp=0.jpg",

      CheckUsername: {
        isCheck: false,
        select: require("../../assets/imgs/login/user_male_circle_select.png"),
        normal: require("../../assets/imgs/login/user_male_circle_normal.png")
      },
      CheckPassword: {
        isCheck: false,
        select: require("../../assets/imgs/login/lock_select.png"),
        normal: require("../../assets/imgs/login/lock_normal.png")
      }
    };
  },
  mounted() {
    // console.log(this.loginForm.checked);
    // 在页面加载时从cookie获取登录信息
    let username = this.getCookie("XXNRR");
    // let password = Base64.decode(this.getCookie("XXRRP"));
    let password = this.getCookie("XXRRP");
    // 如果存在赋值给表单，并且将记住密码勾选
    if (username) {
      this.$set(this.loginForm, "username", username);
      this.$set(this.loginForm, "password", password);
      this.$set(this.loginForm, "checked", true);
      // this.loginForm.username = username;
      // this.loginForm.password = password;
      // this.loginForm.remember = true;
    }
  },
  methods: {
    handleJump() {
      if (this.loginForm.username === "") {
        this.$message.error("请输入用户名");
      } else if (this.loginForm.password === "") {
        this.$message.error("请输入密码");
      } else {
        if (
          this.loginForm.username == "YAMFG" &&
          this.loginForm.password == "1120"
        ) {
          sessionStorage.setItem("coded", this.randomPassWord(20));
          this.loginInfo();
          this.$router.push("/analysis");
          //   this.validatorForm();
        } else {
          this.$message.error("用户名或密码输入错误");
        }
      }
    },
    loginInfo() {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      //   console.log("aaaa");
      if (this.loginForm.checked) {
        console.log(this.loginForm.checked);
        this.saveCookie("XXNRR", this.loginForm.username);
        // let passWord = Base64.encode(this.loginForm.password);
        let passWord = this.loginForm.password;
        this.saveCookie("checked", this.loginForm.checked);
        this.saveCookie("XXRRP", passWord);
      } else {
        this.saveCookie("XXNRR", "");
        this.saveCookie("XXRRP", "");
      }
    },
    saveCookie(name, value) {
      //设置名称为name,值为value的Cookie
      var expdate = new Date(); //初始化时间
      expdate.setTime(expdate.getTime() + 30 * 60 * 1000); //时间单位毫秒
      document.cookie =
        name + "=" + value + ";expires=" + expdate.toGMTString() + ";path=/";
      //即document.cookie= name+"="+value+";path=/";  时间默认为当前会话可以不要，但路径要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！
    },
    getCookie(c_name) {
      //判断document.cookie对象里面是否存有cookie
      if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        //如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          let c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) c_end = document.cookie.length;
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
      return "";
    },
    validatorForm() {
      this.$refs["ruleVerify"].validate(valid => {
        if (valid) {
          console.log("456");
          // 通过验证格式验证

          // 登陆接口验证成功
          this.$message({
            type: "success", // type有success,error,info,warning
            message: "登录成功!"
          });
          this.$router.push("/analysis");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    randomPassWord(pasLen) {
      let pasArr = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "_",
        "-",
        "$",
        "%",
        "&",
        "@",
        "+",
        "!"
      ];
      let password = "";
      let pasArrLen = pasArr.length;
      for (var i = 0; i < pasLen; i++) {
        var x = Math.floor(Math.random() * pasArrLen);
        password += pasArr[x];
      }
      return password;
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(top, #3e5e8a, #1f3a60);
  .login-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -200px 0 0 -490px;
    .login-pic {
      width: 700px;
      height: 400px;
      .pic_img {
        width: 100%;
        height: 100%;
      }
    }
    .login-info {
      background: #fff;
      width: 300px;
      height: 400px;
      padding: 0 10px;
      box-sizing: border-box;
      .info_title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .el-icon-lollipop {
          font-size: 40px;
          color: #f2bbcc;
        }
      }
      .info_input {
        vertical-align: top;
        height: 25px;
        width: 200px;
        margin-left: 10px;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        // box-sizing: border-box;
        outline: none;
        color: rgba(56, 64, 79, 0.5);
        &.code_input {
          margin-left: 16px;
        }
        // &.isActive {
        //   border: unset;
        //   //   border: 1px solid #1d7ce2 !important;
        // }
        &:focus {
          //   border: none;
          outline: none;
          border-color: #49a7fd;
          border-radius: 3px;
        }
      }
      .login_enter {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>
