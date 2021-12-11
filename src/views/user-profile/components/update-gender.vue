<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="value"
      @change="onChange"
    >
      <div slot="cancel" style="color: skyblue">取消</div>
      <div slot="confirm" style="color: skyblue">确认</div>
    </van-picker>
  </div>
</template>
<script>
export default {
  name: "UpdateGender",
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
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
        const res = await this.axios.patch(
          "http://toutiao.itheima.net/v1_0/user/profile",
          {
            gender: this.localGender,
          }
        );
        this.$emit("input", this.localGender);
        this.$emit("close");
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
    onChange(picker, value, index) {
      this.localGender = index;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
