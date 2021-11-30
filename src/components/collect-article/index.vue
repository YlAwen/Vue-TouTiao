<template>
  <van-icon
    :color="value ? '#ffa500' : ''"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
  />
</template>
<script>
export default {
  name: "CollectArticle",
  components: {},
  props: {
    value: {
      type: Boolean,
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
        if (this.value) {
          // 已收藏，取消收藏
          const response = await this.axios.delete(
            `/v1_0/article/collections/${this.articleId}`
          );
          // console.log(response);
        } else {
          // 未收藏，添加收藏
          const response = await this.axios.post("/v1_0/article/collections", {
            target: this.articleId,
          });
          // console.log(response);
        }
        // 更新视图
        this.$emit("input", !this.value);
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
      } catch (error) {
        this.$toast.fail("操作失败，请重试！");
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
