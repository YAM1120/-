<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-if="isRouterAlive"></router-view>
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
      globalAddListner: this.globalAddListner,
      globalRemoveListner: this.globalRemoveListner
    };
  },
  data() {
    return {
      isRouterAlive: true,
      // goVideoDaily:1, // 去过flv视频页之后，去VideoCarousel页就刷新
      timer: null //记录操作定时定时器
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    //添加监听事件
    addSignOutListener() {
      console.log("看看执行不");
      let that = this;
      if (this.timer) clearTimeout(this.timer);
      //   this.timer = setTimeout(() => {
      //     window.sessionStorage.removeItem("token");
      //     that.globalRemoveListner();
      //     //去掉index组件的10s监测是否有人登陆同一账号的监听器
      //     // that.$children[0]["removePushListener"]();
      //     that
      //       .$confirm("因您超30分钟不操作已退出登陆，请重新登陆", "提示", {
      //         confirmButtonText: "确定",
      //         type: "warning",
      //         showCancelButton: false
      //       })
      //       .then(() => {
      //         // that.$store.dispatch("SETUSER", null);
      //         // that.$store.dispatch("SETMENU", null);
      //         // that.$store.dispatch("SETFUNCLIST", {});
      //         that.$router.push("/");
      //         location.reload();
      //       });
      //   }, 20000);
    },
    globalAddListner() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
        window.removeEventListener("mousemove", this.addSignOutListener);
      }
      window.addEventListener("mousemove", this.addSignOutListener);
    },
    globalRemoveListner() {
      clearTimeout(this.timer);
      this.timer = null;
      window.removeEventListener("mousemove", this.addSignOutListener);
    }
  }
};
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
