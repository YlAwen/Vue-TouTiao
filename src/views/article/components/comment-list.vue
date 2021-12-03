<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="加载失败，请点击重试"
  >
    <CommentItem :comment="item" v-for="(item, index) in list" :key="index" />
  </van-list>
</template>
<script>
import CommentItem from "./comment-item";
export default {
  name: "CommentList",
  components: { CommentItem },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        if (this.offset === null) {
          const response = await this.axios.get(
            `/v1_0/comments?type=${"a"}&source=${this.source}&limit=${
              this.limit
            }`
          );
          let results = response.data.data.results;
          // console.log(response);
          this.list.push(...results);
          this.loading = false;
          this.$emit("onload-success", response.data.data);
          if (results.length) {
            this.offset = response.data.data.last_id;
          } else {
            this.finished = true;
          }
        } else {
          const response = await this.axios.get(
            `/v1_0/comments?type=${"a"}&source=${this.source}&limit=${
              this.limit
            }&offset=${this.offset}`
          );
          let results = response.data.data.results;
          // console.log(response);
          this.list.push(...results);
          this.loading = false;
          this.$emit("onload-success", response.data.data);
          if (results.length) {
            this.offset = response.data.data.last_id;
          } else {
            this.finished = true;
          }
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        console.log(error);
      }
    },
  },
  created() {
    this.onLoad();
  },
  mounted() {},
};
</script>
<style lang="less" scoped></style>
