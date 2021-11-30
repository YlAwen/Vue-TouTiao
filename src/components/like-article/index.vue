<template>
  <!-- <van-icon color="#777" name="good-job-o" /> -->
  <van-icon
    :color="value === 1 ? '#e5645f' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onCollect"
  />
</template>
<script>
export default {
  name: "LikeArticle",
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async onCollect() {
      try {
        let status = -1;
        if (this.value === 1) {
          // 已点赞，取消点赞
          const response = await this.axios.delete(
            `/v1_0/article/likings/${this.articleId}`
          );
          // console.log(response);
        } else {
          // 未点赞，点赞文章
          const response = await this.axios.post("/v1_0/article/likings", {
            target: this.articleId,
          });
          // console.log(response);
          status = 1;
        }
        this.$emit("input", status);
        this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");
      } catch (error) {
        console.log(error);
        this.$toast.fail("操作失败，请重试！");
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
