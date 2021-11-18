<template>
  <div id="app">
    <router-view />
    <h1>头条</h1>
    <div>
      <i class="iconfont icon-sousuo"></i>
      <van-button type="primary">主要按钮</van-button>
      <van-button loading type="primary" />
      <van-button loading type="primary" loading-type="spinner" />
      <van-button loading type="info" loading-text="加载中..." />
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="less"></style>
