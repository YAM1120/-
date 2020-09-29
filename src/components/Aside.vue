<template>
  <div class="main">
    <el-menu
      :default-active="onRoutes"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#000c17"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      router
    >
      <el-submenu v-for="item in items" :key="item.id" :index="item.id + 'a'">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item v-for="i in item.children" :key="i.id" :index="i.name">
          <template slot="title">{{ i.title }}</template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "AsideNave",
  data() {
    return {};
  },
  props: ["items"],
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped></style>
