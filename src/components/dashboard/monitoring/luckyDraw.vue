<template>
  <div class="main">
    <!-- 大转盘抽奖 -->
    <LuckyWheel width="300px" height="300px" />
    <!-- 九宫格抽奖 -->
    <LuckyGrid width="300px" height="300px" />
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "luckyDraw",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss"></style>
