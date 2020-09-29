<template>
  <div class="main">
    <el-container>
      <el-aside width="200px">
        <AsideNave :items="items" />
      </el-aside>
      <el-container>
        <el-header>
          <HeaderTop />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AsideNave from "../components/Aside";
import HeaderTop from "../components/Header";
export default {
  name: "Index",
  data() {
    return {
      items: []
    };
  },
  components: {
    AsideNave,
    HeaderTop
  },
  mounted() {
    this.getMuneData();
  },
  methods: {
    getMuneData() {
      this.$apiList
        .getMenuData()
        .then(res => {
          console.log(res, "res");
          this.items = res.data.data.data;
        })
        .catch(err => {
          this.$message.error("请求失败");
        });
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  text-align: right;
  margin-right: 50px;
}

.el-aside {
  background-color: #000c17;
  color: #fff;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  //   text-align: center;
  //   line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
::v-deep .el-badge__content .el-badge__content--undefined .is-fixed {
  top: 16px !important;
}
</style>
