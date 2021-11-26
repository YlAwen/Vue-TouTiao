<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell
        v-for="article in list"
        :key="article.art_id"
        :title="article.title"
      />
    </van-list>
  </div>
</template>
<script>
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    onLoad() {
      // 1. 请求获取数据
      this.axios
        .get(
          `/v1_0/search?page=${this.page}&per_page=${this.perPage}&q=${this.searchText}`
        )
        .then((res) => {
          console.log(res.data.data.results);
          this.list.push(...res.data.data.results);
          this.loading = false;
          if (res.data.data.results) {
            this.page++;
          } else {
            this.finished = true;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
        });
      // 2. 将数据添加到数组列表中
      // 3. 将本次加载的 loading 关闭
      // 4. 判断是否还有数据
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
