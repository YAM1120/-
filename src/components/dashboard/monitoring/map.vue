<template>
  <div class="main">
    <div id="container"></div>
  </div>
</template>
<script>
export default {
  nanme: "map",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getInitMap() {
      //初始化地图
      var map = new AMap.Map("container", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始地图级别
        center: [121.498586, 31.239637] //初始地图中心点
      });
    }
  }
};
</script>
<style scoped></style>
