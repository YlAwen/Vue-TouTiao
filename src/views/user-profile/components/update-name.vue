<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    >
    </van-nav-bar>
    <!-- 导航栏 -->

    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>

    <!-- 输入框 -->
  </div>
</template>
<script>
export default {
  name: "UpdateName",
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.value,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        if (!this.localName.length) {
          this.$toast("昵称不能为空");
          return;
        }
        const res = await this.axios.patch(
          "http://toutiao.itheima.net/v1_0/user/profile",
          {
            name: this.localName,
          }
        );
        this.$emit("input", this.localName);
        this.$emit("close");
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.field-wrap {
  padding: 10px;
}
</style>
