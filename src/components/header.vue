<template>
  <div>
    <Menu mode="horizontal" theme="dark" active-key="1">
      <MenuItem  name="1">
        <Icon type="ios-paper" ></Icon>主页
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people"></Icon>试卷录入
      </MenuItem>
      <Submenu  name="3">
        <template slot="title">
          <Icon type="stats-bars"></Icon>组卷
        </template>
        <MenuItem  name="3-1" @click.native="autopaper">自动组卷</MenuItem>
        <MenuItem name="3-2">手动组卷</MenuItem>
      </Submenu>
      <MenuItem class="shit" name="1">
        <Input search placeholder="Enter something..."/>
      </MenuItem>
      <!-- <MenuItem key="4">
            <Icon type="settings"></Icon>
            综合设置
      </MenuItem>-->
    </Menu>
    <br>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      theme1: "light"
    };
  },
  methods: {
    autopaper() {
      this.$router.push("register");
    }
  }
};
</script>

<style>
.ivu-menu-horizontal .ivu-MenuItem,
.ivu-menu-horizontal .ivu-menu-submenu {
  float: right;
  padding: 0 20px;
  position: relative;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease-in-out;
}
.shit {
  float: left !important;
}
.ivu-layout-header {
  background-color: #ffffff;
  padding: 0px;
}
.ivu-layout-content {
  /* background-color: #ffffff; */
}
</style>
