<template>
  <div id="app">
    <div v-if="$route.meta.frame">
      <header-view />
      <el-container>
        <el-aside width="260px" class="scrollCont">
          <nav-list />
        </el-aside>
        <el-container>
            <!--              <router-view/>-->
            <keep-alive>
              <el-main class="scrollCont" v-if="$route.meta.keepAlive">
              <router-view v-if="$route.meta.keepAlive"></router-view>
              </el-main>
            </keep-alive>
          <el-main class="scrollCont" v-if="!$route.meta.keepAlive">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f0f5fc;
  min-height: 100vh;
}
.el-input__inner {
  height: 32px;
  line-height: 32px;
}
.scrollCont {
  height: 91vh;
  overflow-y: auto;
}
/* 解决element-ui的table表格控件表头与内容列不对齐问题 */
.el-table th.gutter {
  display: table-cell !important;
}
</style>
