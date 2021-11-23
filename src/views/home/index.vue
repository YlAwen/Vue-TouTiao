<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表 -->
        <ArticleList :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>
<script>
import ArticleList from "./components/article-list.vue";
export default {
  name: "HomeIndex",
  components: { ArticleList },
  props: {},
  data() {
    return {
      active: 0,
      channels: {},
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    this.axios
      .get("/v1_0/user/channels")
      .then((res) => {
        // console.log(res.data.data.channels);
        this.channels = res.data.data.channels;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 87px;
  padding-bottom: 50px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 278px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    font-size: 14px;
    .van-icon {
      font-size: 16px;
    }
  }
  .channel-tabs {
    /deep/.van-tabs__wrap {
      height: 41px;
      position: fixed;
      top: 46px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 41px;
    }
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      min-width: 100px;
      font-size: 14px;
      color: #777;
    }
    /deep/ .van-tab--active {
      color: #333;
      font-size: 15px;
    }
    /deep/ .van-tabs__line {
      width: 16px;
      height: 3px;
      background-color: #3296fa;
      border-radius: 2px;
      margin-bottom: 4px;
    }
    .placeholder {
      width: 33px;
      height: 41px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 33px;
      height: 41px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-left: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      opacity: 0.9;
      i.iconfont {
        font-size: 17px;
      }
    }
  }
}
</style>
