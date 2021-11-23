<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import ArticleItem from "@/components/article-item/index";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isreFreshLoading: false,
      refreshSuccessText: "刷新成功",
    };
  },
  computed: {},
  watch: {},
  methods: {
    onLoad() {
      // 1.请求获取数据
      this.axios
        .get(
          `/v1_0/articles?channel_id=${this.channel.id}&timestamp=${
            this.timestamp || Date.now()
          }`
        )
        .then((res) => {
          // 2.把数据放入list中
          this.list.push(...res.data.data.results);
          // 3. 本次加载结束后把加载状态设置为结束
          this.loading = false;
          // 4.判断数据是否全部加载完成
          if (res.data.data.results.length) {
            // 更新获取下页时间戳
            this.timestamp = res.data.data.pre_timestamp;
          } else {
            // 没有数据了
            this.finished = true;
          }
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
          this.loading = false;
        });
    },
    onRefresh() {
      // 1. 请求获取数据
      this.axios
        .get(
          `/v1_0/articles?channel_id=${this.channel.id}&timestamp=${Date.now()}`
        )
        .then((res) => {
          // 2. 将数据追加到列表的顶部
          this.list.unshift(...res.data.data.results);
          // 3. 关闭下拉刷新的loading状态
          this.isreFreshLoading = false;
          // 4. 更新下拉刷新成功提示的文本
          this.refreshSuccessText = `刷新成功,更新了${res.data.data.results.length}条数据`;
        })
        .catch((err) => {
          this.isreFreshLoading = false;
          this.refreshSuccessText = "刷新失败";
        });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.article-list {
  height: 80vh;
  overflow-y: auto;
}
</style>
