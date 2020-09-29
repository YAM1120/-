<template>
  <div class="main">
    <div class="avatar_box">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <span class="avatar_name"></span>
    </div>
    <div class="message_box">
      <el-badge :value="12" class="item">
        <i class="el-icon-message-solid"></i>
      </el-badge>
    </div>
    <div class="back_out">
      <i class="el-icon-switch-button"></i>
      <span>退出</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderTop",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.message_box {
  margin: 0 20px;
}
// ::v-deep.el-badge {
//   .el-badge__content.is-fixed {
//     top: 16px;
//   }
// }
.el-avatar--circle {
  vertical-align: top;
  margin-top: 4px;
}
</style>
