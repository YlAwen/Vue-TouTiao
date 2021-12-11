<template>
  <div class="update-photo">
    <img class="img" :src="img" alt="" ref="img" />
    <div class="toolbar">
      <div @click="$emit('close')">取消</div>
      <div @click="onConfirm">完成</div>
    </div>
  </div>
</template>
<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  name: "UpdatePhoto",
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updateUserPhoto(blob);
      });
    },
    async updateUserPhoto(blob) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const formData = new FormData();
        formData.append("photo", blob);
        const res = await this.axios.patch("/v1_0/user/photo", formData);
        // console.log(res);
        // 关闭弹出层，更新视图
        this.$emit("close");
        this.$emit("update-photo", res.data.data.photo);
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
  },
  created() {},
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
};
</script>
<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
}
.img {
  max-width: 100%;
  display: block;
}
.toolbar {
  position: fixed;
  bottom: 0px;
  left: 0;
  display: flex;
  justify-content: space-between;
  right: 0;
  div {
    width: 50px;
    height: 45px;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
}
</style>
