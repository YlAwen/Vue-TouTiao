<template>
  <van-button
    class="follow-btn"
    round
    size="small"
    v-if="isFollowed"
    @click="onFollow"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-else
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
</template>
<script>
export default {
  name: "FollowUser",
  components: {},
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async onFollow() {
      this.loading = true;
      try {
        if (this.isFollowed) {
          const response = await this.axios.delete(
            `/v1_0/user/followings/${this.userId}`
          );
          // console.log(response);
        } else {
          const response = await this.axios.post("/v1_0/user/followings", {
            target: `${this.userId}`,
          });
          // console.log(response);
        }
        this.$emit("update-is_followed", !this.isFollowed);
        // this.article.is_followed = !this.article.is_followed;
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          this.$toast("你不能关注你自己");
        } else {
          this.$toast("操作失败，请重试！");
        }
      }
      this.loading = false;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
