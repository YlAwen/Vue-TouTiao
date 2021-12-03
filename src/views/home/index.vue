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
        to="/search"
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
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
      ><ChannelEdit
        @update-active="onUpdateActive"
        :channels="channels"
        :active="active"
      ></ChannelEdit
    ></van-popup>
  </div>
</template>
<script>
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit";
import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  components: { ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  methods: {
    onUpdateActive(index, isShow) {
      this.active = index;
      this.isChennelEditShow = isShow;
    },
  },
  created() {
    let channels = [];
    if (this.user) {
      // 已登录，获取用户频道列表
      this.axios
        .get("/v1_0/user/channels")
        .then((res) => {
          // console.log(res.data.data.channels);
          channels = res.data.data.channels;
          this.channels = channels;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // 未登录，获取本地列表数据
      let localChannels = JSON.parse(localStorage.getItem("TOUTIAO_CHANNELS"));
      if (localChannels) {
        // 如果有数据
        this.channels = localChannels;
      } else {
        // 如果没有数据
        this.axios
          .get("/v1_0/user/channels")
          .then((res) => {
            // console.log(res.data.data.channels);
            channels = res.data.data.channels;
            this.channels = channels;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
/deep/.van-tabs__nav--line.van-tabs__nav--complete {
  padding-left: 0;
}
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
      width: 25px;
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
