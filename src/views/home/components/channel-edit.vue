<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        @click="isEdit = !isEdit"
        plain
        round
        size="mini"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in channels"
        :key="item.id"
        @click="onMyChannelClick(item, index)"
      >
        <van-icon
          v-show="isEdit && item.id !== 0"
          name="clear"
          slot="icon"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="item in recommendChannels"
        icon="plus"
        :key="item.id"
        :text="item.name"
        @click="onAddChannel(item)"
      />
    </van-grid>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    channels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      const newChannels = [];
      // 遍历所有频道
      this.allChannels.forEach((channel) => {
        // find找到满足条件鲜儿元素项
        const res = this.channels.find((myItem) => {
          return myItem.id === channel.id;
        });
        // 如果我的频道没有这个频道
        if (!res) {
          newChannels.push(channel);
        }
      });
      return newChannels;
    },
  },
  watch: {},
  methods: {
    onAddChannel(item) {
      this.channels.push(item);
      // 数据持久化处理
      if (this.user) {
        // 已登录，数据存到服务器
        this.axios
          .patch("/v1_0/user/channels", {
            channels: [
              {
                id: item.id,
                seq: this.channels.length,
              },
            ],
          })
          .then((res) => {
            // console.log(res.data);
          })
          .catch((err) => {
            this.$toast("操作失败，请稍后重试");
            // console.error(err);
          });
      } else {
        // 未登录，数据存到本地
        localStorage.setItem("TOUTIAO_CHANNELS", JSON.stringify(this.channels));
      }
    },
    onMyChannelClick(item, index) {
      // console.log(item, index);
      if (this.isEdit && index !== 0) {
        // 编辑状态，删除频道
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        this.channels.splice(index, 1); 
        if (this.user) {
          // 已登录，数据更新线上
          this.axios
            .delete(`/v1_0/user/channels/${item.id}`)
            .then((res) => {})
            .catch((err) => {
              this.$toast("操作失败，请稍后重试");
            });
        } else {
          // 已登录，数据更新本地
          localStorage.setItem(
            "TOUTIAO_CHANNELS",
            JSON.stringify(this.channels)
          );
        }
      } else if (!this.isEdit) {
        // 非编辑状态，切换频道
        this.$emit("update-active", index, false);
      }
    },
  },
  created() {
    this.axios
      .get("/v1_0/channels")
      .then((res) => {
        // console.log(res.data.data.channels);
        this.allChannels = res.data.data.channels;
      })
      .catch((err) => {
        this.$toast("数据获取失败");
      });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 43px 0;
  .title-text {
    font-size: 16px;
    color: #333;
  }
  .edit-btn {
    width: 52px;
    height: 24px;
    font-size: 13px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 80px;
    height: 43px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-grid-item__text,
      .text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 15px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon {
          font-size: 14px;
          margin-right: 3px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
