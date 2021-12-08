<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button :disabled="!message.length" @click="onPost" class="post-btn"
      >发布</van-button
    >
  </div>
</template>

<script>
export default {
  name: "CommentPost",
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await this.axios.post("/v1_0/comments", {
          target: this.target,
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null,
        });
        console.log(res.data.data);
        // 发布成功后 1.关闭弹出层 2.将内容显示到列表顶部 3.清空文本框
        this.message = "";
        this.$emit("post-success", res.data.data);
        this.$toast.success("发布成功");
      } catch (error) {
        this.$toast.fail("发布失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 16px 0 16px 16px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 75px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
