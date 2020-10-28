<template>
  <div class="main">
    <el-form
      :inline="true"
      ref="shareForm"
      class="demo-form-inline"
      size="small"
      label-position="left"
      label-width="auto"
      @keyup.enter.native="onShowSeach"
    >
      <el-form-item label="所属目录：">
        <el-cascader
          :options="pcodeArr"
          :placeholder="`选中目录数：${checkednum}`"
          :props="props"
          :show-all-levels="false"
          clearable
          collapse-tags
          ref="cascader"
          style="position: relative"
        >
          <template slot-scope="{ node, data }">
            <div class="fakeclick" @click="clickOne(node)"></div>
            <span>{{ data.text }}</span>
            <div
              class="cascader_item"
              ref="cascaderItem"
              @dblclick="handleCascaderItemDbclick(node)"
            ></div>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item label="线路名称：">
        <el-autocomplete
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "monitoring",
  data() {
    return {
      //分享弹窗目录
      checkednum: 0,
      pcodeArr: [],
      props: {
        value: "id",
        children: "children",
        label: "text",
        multiple: true, //多选
        // emitPath: false,
        // checkStrictly: true,
      },
      restaurants: [],
      state1: "",
    };
  },
  mounted() {
    this.parentTree();
    this.getInputData();
  },
  methods: {
    // 获取所属目录
    parentTree() {
      axios
        .get(`http://192.168.1.229:8060/api/v1/devchannel/dirtree`)
        .then((res) => {
          console.log(res, "mmmm");
          if (res.data.errcode == 0) {
            this.pcodeArr = res.data.data;
            console.log(this.pcodeArr, "lllll");
          }
        });
    },
    clickOne(node) {
      console.log(node, "node");
      node.checked = !node.checked;
      this.checkednum = this.$refs.cascader.getCheckedNodes().length;
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    handleCascaderItemDbclick(node) {
      node.checked = !node.checked;
      function changCheckStatus(node, status) {
        node.checked = status;
        if (node.children.length !== 0) {
          for (let i = 0; i < node.children.length; i++) {
            changCheckStatus(node.children[i], status);
          }
        }
      }
      changCheckStatus(node, node.checked);
      this.checkednum = this.$refs.cascader.getCheckedNodes().length;
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    //搜索数据
    getInputData() {
      this.$apiList
        .getLineData()
        .then((res) => {
          console.log(res, "res");
          this.restaurants = res.data.data.data;
        })
        .catch((err) => {
          this.$message.error("请求失败");
        });
    },
    //搜索框
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        console.log(restaurant.toLowerCase(), "toLowerCase");
        return (
          restaurant.toLowerCase().indexOf(queryString.toLowerCase()) != -1
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>
<style scoped lang="scss">
.fakeclick {
  position: absolute;
  background-color: transparent;
  width: 0.876rem;
  height: 0.876rem;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  z-index: 2;
  border-radius: 0.125rem;
  box-sizing: border-box;
  &:hover {
    border: 0.0625rem solid #4aa8ff;
  }
}
</style>
