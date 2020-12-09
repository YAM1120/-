<template>
  <div class="login">
    <div class="logincont">
      <div class="login-box">
        <div class="leftcontent">
          <div class="logotit">
            <img :src="systemLogo" alt="" />
            <span>{{ systemName }}</span>
          </div>
        </div>
        <div class="rightcontent">
          <div class="login-input-box">
            <div class="login-tit">
              <span>帐号登录</span>
              <img :src="systemLoginIcon" alt="" />
            </div>
            <div class="login-form">
              <el-form
                :model="form"
                status-icon
                label-position="left"
                label-width="0px"
                class="demo-ruleForm"
                @keyup.enter.native.capture.prevent="login"
              >
                <el-form-item prop="username">
                  <label>
                    <img
                      :src="
                        CheckUsername.isCheck
                          ? CheckUsername.select
                          : CheckUsername.normal
                      "
                    />
                  </label>
                  <el-input
                    v-model="form.username"
                    auto-complete="off"
                    @focus="CheckUsername.isCheck = true"
                    @blur="CheckUsername.isCheck = false"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item prop="password">
                  <label>
                    <img
                      :src="
                        CheckPassword.isCheck
                          ? CheckPassword.select
                          : CheckPassword.normal
                      "
                    />
                  </label>
                  <el-input
                    type="password"
                    v-model="form.password"
                    auto-complete="off"
                    show-password
                    @focus="CheckPassword.isCheck = true"
                    @blur="CheckPassword.isCheck = false"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item prop="captcha">
                  <label>
                    <img
                      :src="
                        CheckImgCaptcha.isCheck
                          ? CheckImgCaptcha.select
                          : CheckImgCaptcha.normal
                      "
                    />
                  </label>
                  <el-input
                    v-model="form.captcha"
                    auto-complete="off"
                    clearable
                    @focus="CheckImgCaptcha.isCheck = true"
                    @blur="CheckImgCaptcha.isCheck = false"
                    style="width: 50%"
                  ></el-input>
                  <img
                    class="CheckImgCaptcha"
                    :src="captchaImg"
                    alt
                    @click="getCaptcha()"
                  />
                </el-form-item>
                <!-- <el-form-item prop="sms_captcha">
                  <label>
                    <img
                      :src="
                        CheckCaptcha.isCheck
                          ? CheckCaptcha.select
                          : CheckCaptcha.normal
                      "
                    />
                  </label>
                  <el-input
                    v-model="form.sms_captcha"
                    auto-complete="off"
                    @focus="CheckCaptcha.isCheck = true"
                    @blur="CheckCaptcha.isCheck = false"
                    clearable
                    style="width: 50%"
                  ></el-input>
                  <el-button
                    class="send-phone"
                    :class="readysend ? '' : 'send-phone-send'"
                    @click="getcaptcha"
                    >{{
                      readysend ? '发送短信' : `再次发送(${countdown})`
                    }}</el-button
                  >
                </el-form-item> -->
                <div class="wrap_find">
                  <el-checkbox v-model="form.remember">记住密码</el-checkbox>
                  <span class="findPass" @click="findPass">找回密码</span>
                </div>
                <p style="clear: both"></p>
                <el-form-item>
                  <el-button class="inputbox login-bnt" @click="login"
                    >立即登录</el-button
                  >
                  <!-- <p class="inputbox login-bnt" @click="login">立即登陆</p> -->
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="infotit">{{ systemCopyRight }}</p>
    <!-- 修改分割线 -->
    <!-- 手机密令安全认证弹框 -->
    <div class="login_dailog">
      <el-dialog title="手机密令安全认证" :visible.sync="showSecretOrder">
        <div class="dailog_main">
          <el-row>
            <el-col :span="2"><div class="dailog_tips">温馨提示：</div></el-col>
            <el-col :span="22">
              <div class="dailog_tips">
                为保障您的账户信息安全，需要提交手机验证码密令，验证正确通过后，可正常登录省级云平台后台操作系统。短信验证码密令错误5次，则当日无法登录系统，请次日重试，或联系管理员。
              </div>
            </el-col>
          </el-row>
          <div class="wrap_form">
            <el-form
              label-position="top"
              :model="loginCode"
              ref="loginRef"
              @keyup.enter.native.capture.prevent="verifySms"
            >
              <el-form-item label="该账号绑定的手机号码为">
                <el-input
                  autocomplete="off"
                  class="inp_phone"
                  v-model="loginCode.phone"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="请输入短信密令" class="code">
                <el-input
                  autocomplete="off"
                  v-model="loginCode.code"
                ></el-input>
                <el-button
                  v-if="readysend"
                  class="login-bnt send"
                  @click="getcaptcha"
                  >获取动态密码</el-button
                >
                <el-button v-else plain disabled
                  >{{ countdown }}s后重新获取</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button class="verify_login login-bnt" @click="verifySms"
                  >验证登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 手机密令安全认证弹框 -->

    <!-- 找回密码弹框 -->
    <div class="login_dailog">
      <el-dialog title="找回密码" :visible.sync="recoverPassw">
        <div class="dailog_main">
          <el-row>
            <el-col :span="22"
              ><div class="dailog_tips">请验证本人身份信息</div></el-col
            >
          </el-row>
          <div class="wrap_form">
            <el-form label-position="top" v-if="recoverStep == 1">
              <el-form-item label="请输入账号">
                <el-input
                  autocomplete="off"
                  v-model="account_num"
                  placeholder="请输入您的账号"
                  @change="verifyNext"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="verify_login login-bnt" @click="verifyNext"
                  >下一步</el-button
                >
              </el-form-item>
            </el-form>
            <el-form
              label-position="top"
              :model="phoneCode"
              ref="phoneRef"
              v-else-if="recoverStep == 2"
            >
              <el-form-item label="该账号绑定的手机号码为">
                <el-input
                  autocomplete="off"
                  v-model="phoneCode.phone"
                  @change="checkAcountPhone"
                  @input="checkFail = false"
                ></el-input>
                <div class="isTrue" v-show="isCheck">
                  <img src="@/assets/img/deviceManage/normal.png" />
                </div>
              </el-form-item>
              <el-form-item label="请输入短信密令" class="code">
                <el-input
                  autocomplete="off"
                  v-model="phoneCode.code"
                ></el-input>
                <el-button
                  v-if="readysend"
                  class="login-bnt send"
                  @click="senddDynamicPass"
                  >获取动态密码</el-button
                >
                <el-button v-else plain disabled
                  >{{ countdown }}s后重新获取</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button class="verify_login login-bnt" @click="verifyLogin"
                  >验证身份信息</el-button
                >
              </el-form-item>
            </el-form>
            <el-form
              label-position="top"
              :model="verifyForm"
              :rules="verifyRules"
              ref="ruleVerify"
              v-else-if="recoverStep == 3"
              key="onlyform"
            >
              <el-form-item label="请输入新密码" prop="pass">
                <el-input
                  autocomplete="off"
                  type="password"
                  v-model="verifyForm.pass"
                ></el-input>
              </el-form-item>
              <el-form-item label="重新输入新密码" prop="checkPass">
                <el-input
                  autocomplete="off"
                  type="password"
                  v-model="verifyForm.checkPass"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="verify_login login-bnt" @click="verifyReset"
                  >确定修改</el-button
                >
              </el-form-item>
            </el-form>
            <div v-else>
              <el-row :gutter="20">
                <el-col :span="2" :offset="9"
                  ><div><img src="@/assets/img/empower/chenggong.png" /></div
                ></el-col>
                <el-col :span="6"
                  ><div class="success">密码修改成功！</div></el-col
                >
              </el-row>
              <div class="suceess_but">
                <el-button type="success" @click="comfirmPass">确认</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 找回密码弹框 -->
  </div>
</template>

<script>
// @ is an alias to /src
const JSEncrypt = require("jsencrypt");
const Base64 = require("js-base64").Base64;
export default {
  name: "login",
  data() {
    var checkusername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入用户名"));
      }
      setTimeout(() => {
        var reg = /^[A-Za-z0-9]{1,12}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入数字和字母且长度小于12组合"));
        } else {
          callback();
          // if (value < 18) {
          //   callback(new Error("必须年满18岁"));
          // } else {
          //   callback();
          // }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    // ----修改分割线------
    // 找回密码的验证
    var verifyPass = (rule, value, callback) => {
      var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+=|{}':;',\[\].<>/?\uff01\uffe5\u2026\uff08\uff09\u2014\u3010\u3011\u2018\u2019\uff1b\uff1a\u201c\u201d\u3002\uff0c\u3001\uff1f])[A-Za-z\d~!@#$%^&*()+=|{}':;',\[\].<>/?\uff01\uffe5\u2026\uff08\uff09\u2014\u3010\u3011\u2018\u2019\uff1b\uff1a\u201c\u201d\u3002\uff0c\u3001\uff1f]{8,30}$/;
      // var reg = /^[A-Za-z0-9]{5,18}$/
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (reg.test(value)) {
          if (this.verifyForm.checkPass !== "") {
            this.$refs.ruleVerify.validateField("checkPass");
          }
          callback();
        } else {
          return callback(
            new Error("请输入由字母、数字和字符组成的8位到30位密码")
          );
        }
      }
    };
    var verifyPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.verifyForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        // sms_captcha: '',
        captcha: "",
        remember: false
      },
      readysend: true,
      captchaImg: "",
      rules2: {
        username: [{ validator: checkusername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      // 输入框的状态
      CheckUsername: {
        isCheck: false,
        select: require("../../assets/img/login/user_male_circle_select.png"),
        normal: require("../../assets/img/login/user_male_circle_normal.png")
      },
      CheckPassword: {
        isCheck: false,
        select: require("../../assets/img/login/lock_select.png"),
        normal: require("../../assets/img/login/lock_normal.png")
      },
      CheckImgCaptcha: {
        isCheck: false,
        select: require("../../assets/img/login/good_pincode_select.png"),
        normal: require("../../assets/img/login/good_pincode_normal.png")
      },
      CheckCaptcha: {
        isCheck: false,
        select: require("../../assets/img/login/good_pincode_select.png"),
        normal: require("../../assets/img/login/good_pincode_normal.png")
      },
      // -----修改分割线------
      // 手机密令弹框
      showSecretOrder: false,
      // 手机密令form
      loginCode: {
        phone: "",
        code: "",
        token: ""
      },
      phoneCode: {
        phone: "",
        code: "",
        token: ""
      },
      // 找回密码弹框
      recoverPassw: false,
      // 记录当前找回密码的步骤
      recoverStep: 1,
      // 账号
      account_num: "",
      // 找回密码form
      verifyForm: {
        pass: "",
        checkPass: ""
      },
      verifyRules: {
        pass: [{ required: true, validator: verifyPass, trigger: "blur" }],
        checkPass: [{ required: true, validator: verifyPass2, trigger: "blur" }]
      },
      // 手机号是否验证通过
      isCheck: false,
      // 存储登录信息验证前的信息
      tempLogin: {},
      countdown: 60,
      sendcountdown: null,
      // 验证失败
      checkFail: false
    };
  },
  components: {},
  created() {},
  mounted() {
    this.getSystemInfo();
    // 获取验证码
    this.getCaptcha();
    // 在页面加载时从cookie获取登录信息
    let username = this.getCookie("XXNRR");
    let password = Base64.decode(this.getCookie("XXRRP"));
    // this.getencryptKey();
    // 如果存在赋值给表单，并且将记住密码勾选
    if (username) {
      this.$set(this.form, "username", username);
      this.$set(this.form, "password", password);
      this.$set(this.form, "remember", true);
      // this.form.username = username;
      // this.form.password = password;
      // this.form.remember = true;
    }
  },
  computed: {
    systemName() {
      return this.$store.state.systemName;
    },
    systemCopyRight() {
      return this.$store.state.systemCopyRight;
    },
    systemLogo() {
      return this.$store.state.systemLogo;
    },
    systemLoginIcon() {
      return this.$store.state.systemLoginIco;
    },
    newMenu() {
      return this.$store.state.menu;
    },
    closeDown() {
      const { recoverPassw, showSecretOrder } = this;
      return { recoverPassw, showSecretOrder };
    }
  },
  watch: {
    closeDown(val) {
      this.readysend = true;
      clearInterval(this.sendcountdown);
      this.countdown = 60;
    }
  },
  methods: {
    // 获取地图坐标和编码
    getCenterPointCoordinate() {
      this.$apiList.getCenterPointCoordinate().then(res => {
        if (res.data.code === 200) {
          this.$store.dispatch("SETMAPINFO", res.data.data);
        }
      });
    },
    // 获取系统名称以及copyright
    getSystemInfo() {
      this.$apiList.getSystemInfo().then(res => {
        if (res.data.code == 200) {
          let name = res.data.data.name;
          let info = res.data.data.copyright;
          let logo = res.data.data.logo;
          let login_icon = res.data.data.login_icon;
          this.$store.dispatch("SETSYSTEMNAME", name);
          this.$store.dispatch("SETSYSTEMCOPYRIGHT", info);
          this.$store.dispatch("SETSYSTEMLOGO", logo);
          this.$store.dispatch("SETSYSTEMLOGINICON", login_icon);
        } else {
          this.$message.error("获取系统信息失败");
        }
      });
    },
    // 储存表单信息
    setUserInfo: function() {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if (this.form.remember) {
        this.setCookie("XXNRR", this.form.username);
        // base64加密密码
        let passWord = Base64.encode(this.form.password);
        this.setCookie("remember", this.form.remember);
        this.setCookie("XXRRP", passWord);
      } else {
        this.setCookie("XXNRR", "");
        this.setCookie("XXRRP", "");
      }
    },
    login() {
      let that = this;
      if (!this.form.username && !this.form.password) {
        this.$message.error("账号和密码不能为空");
      } else if (this.form.captcha == "") {
        // || this.form.sms_captcha == ''
        this.$message.error("请输入验证码");
      } else {
        let params = {
          username: this.form.username,
          password: this.form.password,
          captcha: this.form.captcha
          // key: this.form.key,
          // sms_captcha: this.form.sms_captcha
        };
        this.$apiList.encryptKey().then(res => {
          let gongKey = res.data.data.key;
          let miKey = res.data.data.public_key;
          var crypt = new JSEncrypt.JSEncrypt({
            default_key_size: 1024
          });
          crypt.setPublicKey(miKey);
          params = {
            encrypt_data: crypt.encrypt(JSON.stringify(params)),
            key: this.form.key
          };
          // console.log(params);
          // console.log(gongKey);
          let headerinfo = {
            encryptKey: gongKey
            // 从这里拉开
          };
          this.$apiList
            .login(params, headerinfo)
            .then(res => {
              // ,headerinfo
              if (res.data.code == 200) {
                if (res.data.data.pass_sms == 1) {
                  this.dealUserInfo(res);
                } else {
                  this.loginCode.phone = "";
                  this.loginCode.code = "";
                  this.tempLogin = res.data.data;
                  this.loginCode.phone = res.data.data.phone;
                  this.showSecretOrder = true;
                }
              } else {
                this.$message.error("登陆失败");
              }
            })
            .catch(this.getCaptcha);
        });
      }
    },
    // 获取jsencrypt加密公钥
    /* getencryptKey () {
        this.$apiList
          .encryptKey().then(res => {
            this.gongKey = res.data.data.key
            this.miKey = res.data.data.public_key
            var crypt = new JSEncrypt.JSEncrypt({
              default_key_size: 1024
            })
            let num='1234'
            crypt.setPublicKey(this.gongKey)
            let passWord = crypt.encrypt(num)
            console.log(passWord);
          })
      }, */
    // 获取cookie
    getCookie: function(key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + "=");
        if (start !== -1) {
          start = start + key.length + 1;
          var end = document.cookie.indexOf(";", start);
          if (end === -1) end = document.cookie.length;
          return unescape(document.cookie.substring(start, end));
        }
      }
      return "";
    },
    // 保存cookie
    setCookie: function(cName, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        cName +
        "=" +
        decodeURIComponent(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    },
    // 获取短信验证码
    getcaptcha() {
      if (this.form.username === "") {
        this.$message.error("请输入账号");
        return false;
      }
      if (this.form.password === "") {
        this.$message.error("请输入密码");
        return false;
      }
      if (this.readysend) {
        this.readysend = false;
        this.countdown = 60;
        let that = this;
        this.sendcountdown = setInterval(() => {
          that.countdown -= 1;
          if (that.countdown == 0) {
            clearInterval(that.sendcountdown);
            that.readysend = true;
          }
        }, 1000);
        this.$apiList
          .getcaptcha({
            username: this.form.username,
            login_key: this.tempLogin.login_key
          })
          .then(res => {
            this.$message.success(res.data.message);
            if (res.data.code != 200) this.showSecretOrder = false;
          })
          .catch(error => {
            this.readysend = true;
            this.showSecretOrder = false;
          });
      }
    },
    // 获取验证码
    getCaptcha() {
      this.$apiList.getCaptcha().then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.$set(this.form, "captcha", "");
          this.captchaImg = res.data.data.img;
          this.form.key = res.data.data.key;
        } else {
          console.log("获取验证码失败");
        }
      });
    },
    // 获取功能权限
    async getFunc() {
      await this.$apiList.functionPower
        .getPermissionsList()
        .then(res => {
          if (res.data.code == 200) {
            this.$store.dispatch("SETFUNCLIST", res.data.data);
          }
        })
        .catch(() => {
          this.$message.error("获取权限列表失败");
        });
    },

    // ----修改分割线-----
    // 密码确认修改成功
    comfirmPass() {
      this.form.username = "";
      this.form.password = "";
      this.form.captcha = "";
      this.recoverPassw = false;
    },
    // 登录验证信息
    verifySms() {
      if (this.loginCode.phone === "") {
        this.$message.error("请输入手机号");
        return false;
      }
      if (this.loginCode.code === "") {
        this.$message.error("请输入验证码");
        return false;
      }
      let param = {
        username: this.form.username,
        login_key: this.tempLogin.login_key,
        sms_captcha: this.loginCode.code
      };
      this.$apiList
        .verificationSMS(param)
        .then(res => {
          if (res.data.code == 200) {
            this.dealUserInfo(res);
          }
        })
        .catch(res => {
          this.$message.error(res.data.messge);
        });
    },
    dealUserInfo(res) {
      let that = this;
      let userinfo = res.data.data.user;
      sessionStorage.setItem("token", res.data.data.token);
      this.$store.dispatch("SETUSER", userinfo);
      this.setUserInfo();
      // 获取地图信息
      this.getCenterPointCoordinate();
      // 获取用户对应权限菜单
      this.$apiList.getMenus().then(res => {
        if (res.data.code === 200) {
          let menu = res.data.data;
          if (menu.length == 0) {
            // console.log("menu空");
            this.$router.push("/error505");
          } else {
            that.$store.dispatch("SETMENU", menu);
            sessionStorage.setItem("menu", JSON.stringify(menu));
            that.getFunc().then(res => {
              that.$store.dispatch("ADD_Routes", that.newMenu);
              that.$router.push("/");
            });

            // that.$store.dispatch('ADD_Routes', that.newMenu);
            // this.$router.push('/');
          }
        } else {
          this.$message.error("获取权限菜单失败");
        }
      });
    },
    // 点击找回密码
    findPass() {
      this.recoverPassw = true;
      this.recoverStep = 1;
      this.isCheck = false;
      this.account_num = "";
      this.readysend = true;
      this.phoneCode.phone = "";
      this.phoneCode.code = "";
      this.phoneCode.token = "";
      this.verifyForm.pass = "";
      this.verifyForm.checkPass = "";
      this.checkFail = false;
    },
    // 监测输入的用户账号绑定的手机号是否正确
    checkAcountPhone() {
      let param = {
        username: this.account_num,
        phone: this.phoneCode.phone
      };
      this.$apiList
        .checkPhone(param)
        .then(res => {
          if (res.data.code == 200) {
            this.isCheck = true;
          } else {
            this.isCheck = false;
            this.checkFail = true;
          }
        })
        .catch(res => {
          this.isCheck = false;
          this.checkFail = true;
        });
    },
    // 找回密码的获取验证码
    senddDynamicPass() {
      if (this.checkFail) {
        this.$message.error("账号绑定的手机号码和输入的不一致");
      } else {
        if (this.account_num != "" && this.phoneCode.phone) {
          if (this.readysend) {
            this.readysend = false;
            this.countdown = 60;
            let that = this;
            that.sendcountdown = setInterval(() => {
              that.countdown -= 1;
              if (that.countdown == 0) {
                clearInterval(that.sendcountdown);
                that.readysend = true;
              }
            }, 1000);
            let param = {
              username: this.account_num,
              phone: this.phoneCode.phone
            };
            this.$apiList
              .sendResetPasswordSMS(param)
              .then(res => {
                if (res.data.code == 200) {
                  this.$message.success(res.data.message);
                }
              })
              .catch(res => {
                this.readysend = true;
                // this.$message.error('获取验证码失败')
              });
          }
        }
      }
    },
    // 手机密令验证
    verifyLogin() {
      if (this.phoneCode.phone && this.phoneCode.code && this.isCheck) {
        let param = {
          username: this.account_num,
          phone: this.phoneCode.phone,
          sms_captcha: this.phoneCode.code
        };
        this.$apiList
          .checkSMSStr(param)
          .then(res => {
            if (res.data.code == 200) {
              this.recoverStep = 3;
              this.phoneCode.token = res.data.data.reset_pwd_token;
            }
          })
          .catch(res => {
            this.$message.error(res.data.messge);
          });
      }
    },
    // 找回密码下一步
    verifyNext() {
      if (this.account_num != "" && this.account_num != null) {
        this.recoverStep = 2;
      }
    },
    // 重置密码
    verifyReset() {
      this.$refs["ruleVerify"].validate(valid => {
        if (valid) {
          let params = {
            username: this.account_num,
            password: this.verifyForm.pass,
            confirm_password: this.verifyForm.checkPass,
            reset_pwd_token: this.phoneCode.token
          };
          this.$apiList.encryptKey().then(res => {
            let gongKey = res.data.data.key;
            let miKey = res.data.data.public_key;
            var crypt = new JSEncrypt.JSEncrypt({
              default_key_size: 1024
            });
            crypt.setPublicKey(miKey);
            params = { encrypt_data: crypt.encrypt(JSON.stringify(params)) };
            let headerinfo = {
              encryptKey: gongKey
            };
            this.$apiList
              .resetPassword(params, headerinfo)
              .then(res => {
                if (res.data.code == 200) {
                  this.recoverStep = 4;
                  this.account_num = "";
                  this.$refs["ruleVerify"].resetFields();
                  this.$refs["phoneRef"].resetFields();
                }
              })
              .catch(res => {
                this.$message.error(res.data.messge);
              });
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/img/login/login.png) no-repeat center;
  position: relative;

  .logincont {
    // width: 1170px;
    height: 446px;
    background-color: rgba(124, 141, 175, 0.3);
    box-shadow: 0px 3px 21px 0px rgba(31, 58, 96, 0.2);
    border-radius: 2px;
    position: absolute;
    top: 50%;
    margin-top: -234px;
    left: 50%;
    margin-left: -585px;
    padding: 10px;
  }

  .login-box {
    border-radius: 2px;
    width: 100%;
    height: 100%;

    .leftcontent {
      width: 747px;
      height: 100%;
      float: left;
      background: url(../../assets/img/login/loginbg.png) no-repeat;
      background-size: 100% 100%;

      .logotit {
        height: 60px;
        padding-left: 55px;
        font-size: 26px;
        color: #ffffff;
        font-weight: bold;
        margin: 40px 30px;
        img {
          vertical-align: middle;
          width: 42px;
        }
        span {
          vertical-align: middle;
        }
      }
    }

    .rightcontent {
      background: #ffffff;
      width: 400px;
      height: 100%;
      float: left;

      .login-tit {
        font-size: 22px;
        font-weight: bold;
        color: rgba(41, 131, 227, 1);
        border-bottom: 1px solid #d3d3d3;
        padding: 27px;
        position: relative;
        img {
          position: absolute;
          top: 20px;
          right: 27px;
          height: 48px;
          width: auto;
        }
      }

      .login-form {
        padding: 15px 27px;
      }
    }
  }
}

.infotit {
  font-size: 16px;
  width: 100%;
  color: rgba(255, 255, 255, 0.2);
  text-align: center;
  position: absolute;
  bottom: 50px;
}

.positionName {
  position: absolute;
  top: -18px;
  left: 63px;
  background: #fff;
  color: #0870df;
  font-size: 14px;
  height: 30px;
}

.login-bnt {
  width: 100%;
  height: 48px;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(255, 255, 255, 0.15) 100%
    ),
    linear-gradient(rgba(8, 112, 223, 1), rgba(8, 112, 223, 1));
  background-blend-mode: overlay, normal;
  box-shadow: inset 0px 0px 0px 0px rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: solid 1px rgba(16, 121, 235, 1);
  font-size: 18px;
  color: #ffffff;
}

.send-phone {
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(255, 255, 255, 0.15) 100%
    ),
    linear-gradient(rgba(8, 112, 223, 1), rgba(8, 112, 223, 1));
  background-blend-mode: overlay, normal;
  box-shadow: inset 0px 0px 0px 0px rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: solid 1px rgba(16, 121, 235, 1);
  color: #ffffff !important;
  flex: 1;
  margin-left: 10px;
  padding: 10px 0;
  font-size: 14px;
}

.send-phone.send-phone-send {
  background-color: red;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(255, 255, 255, 0.15) 100%
    ),
    linear-gradient(rgba(210, 210, 210, 1), rgba(190, 190, 190, 1));
  border: solid 1px rgba(255, 255, 255, 1);
}
.CheckImgCaptcha {
  margin-left: 10px;
  flex: 1;
  height: 2.5rem;
}
.findPass {
  font-size: 14px;
  color: #606266;
  margin-left: 15px;
  cursor: pointer;
  line-height: 19px;
}
// ----修改分割线----
.login_dailog {
  .wrap_form {
    text-align: center;
    padding: 40px 0;
  }
  .verify_login {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .send {
    height: 40px;
    font-size: 16px;
  }
  ::v-deep {
    .el-dialog {
      padding: 20px;
    }
    .el-dialog__title {
      color: #666666;
    }
    .el-dialog__body {
      color: #666666;
      padding: 20px;
    }
    .el-dialog__header {
      border-bottom: 1px solid #95a7bf;
    }
    .dailog_tips {
      line-height: 24px;
    }
    .el-form {
      width: 35%;
      display: inline-block;
    }
    .el-form-item {
      margin-bottom: 16px;
      &:nth-last-child(2) {
        margin-bottom: 35px;
      }
    }
    .el-form-item__label {
      width: 100%;
      padding: 0;
    }
    .code {
      .el-input {
        width: 48%;
        margin-right: 4%;
      }
      .el-button {
        width: 48%;
      }
    }
    .inp_phone {
      input {
        background-color: #ccc;
      }
    }
  }
}
.isTrue {
  position: absolute;
  right: -28px;
  top: 5px;
  img {
    width: 20px;
    height: 20px;
  }
}
.success {
  text-align: left;
  line-height: 38px;
  font-size: 18px;
}
.suceess_but {
  margin-top: 40px;
  ::v-deep .el-button {
    padding: 12px 30px;
  }
}
::v-deep .el-input.is-disabled .el-input__inner {
  color: #fff;
}
.wrap_find {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 0;
}
</style>
