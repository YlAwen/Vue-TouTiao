<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancle="$emit('close')"
      @confirm="onConfirm"
    >
      <div slot="confirm" style="color: skyblue">确认</div>
      <div slot="cancel" style="color: skyblue">取消</div>
    </van-datetime-picker>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "UpdateBirthday",
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
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
            birthday: dayjs(this.currentDate).format("YYYY-MM-DD"),
          }
        );
        this.$emit("input", dayjs(this.currentDate).format("YYYY-MM-DD"));
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
<style lang="less" scoped></style>
