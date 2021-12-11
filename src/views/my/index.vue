<template>
  <div>
    <!-- 未登录 -->
    <div v-if="!user" class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 登录 -->
    <div v-else class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" class="info-edit" round to="/user/profile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item" to="/">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item" to="/">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
      clickable
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          // on confirm
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  created() {
    if (this.user) {
      this.axios
        .get("/v1_0/user")
        .then((res) => {
          this.userInfo = res.data.data;
        })
        .catch((err) => {
          this.$store.state.user = null;
          this.$toast("验证信息过期，请重新登录");
        });
    }
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.header {
  height: 180px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 66px;
      height: 66px;
    }
    .text {
      margin-top: 8px;
      font-size: 14px;
      color: #fff;
    }
  }
}
.user-info {
  .base-info {
    height: 115px;
    padding: 38px 16px 12px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      .info-edit {
        color: #666;
      }
    }
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 66px;
        height: 66px;
        border: 2px solid #fff;
      }
      .name {
        margin-left: 10px;
        font-size: 15px;
        color: #fff;
      }
    }
  }
  .data-stats {
    // height: 65px;
    display: flex;
    .data-item {
      height: 65px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 18px;
      }
      .text {
        font-size: 12px;
      }
    }
  }
}
.grid-nav {
  height: 70px;
  margin-bottom: 10px;
  i.iconfont {
    font-size: 23px;
  }
  .icon-shoucang {
    color: #eb5253;
  }
  .icon-lishi {
    color: #ff9d1d;
  }
  span.text {
    font-size: 14px;
    color: #333;
  }
}
.logout-cell {
  margin-top: 5px;
  text-align: center;
  color: #d86262;
}
</style>
