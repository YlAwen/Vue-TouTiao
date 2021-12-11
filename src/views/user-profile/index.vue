<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      class="page-nav-bar"
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->

    <input type="file" hidden ref="file" @change="onFileChange" />

    <!-- 个人信息 -->
    <van-cell @click="$refs.file.click()" title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      @click="isUpdateNameShow = true"
      title="昵称"
      :value="user.name"
      is-link
    ></van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    ></van-cell>
    <van-cell
      @click="isUpdateBirthdayShow = true"
      title="生日"
      :value="user.birthday"
      is-link
    ></van-cell>
    <!-- 个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup
      position="bottom"
      v-model="isUpdateNameShow"
      style="height: 100%"
    >
      <UpdateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup position="bottom" v-model="isUpdateGenderShow">
      <UpdateGender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
      />+
    </van-popup>
    <!-- 编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup position="bottom" v-model="isUpdateBirthdayShow">
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
    <!-- 编辑生日 -->

    <!-- 编辑头像 -->
    <van-popup
      position="bottom"
      v-model="isUpdatePhotoShow"
      style="height: 100%"
    >
      <UpdatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- 编辑头像 -->
  </div>
</template>
<script>
import UpdateName from "./components/update-name.vue";
import UpdateGender from "./components/update-gender";
import UpdateBirthday from "./components/update-birthday.vue";
import UpdatePhoto from "./components/update-photo";
export default {
  name: "UserProfile",
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  props: {},
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async loadUserProfile() {
      try {
        const res = await this.axios.get("/v1_0/user/profile");
        // console.log(res.data.data);
        this.user = res.data.data;
      } catch (error) {
        this.$toast("数据获取失败");
      }
    },
    onFileChange() {
      const file = this.$refs.file.files[0];
      // console.log(file);
      const data = window.URL.createObjectURL(file);
      // console.log(data);
      this.img = data;
      this.isUpdatePhotoShow = true;
      this.$refs.file.value = "";
    },
  },
  created() {
    this.loadUserProfile();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.avatar {
  width: 30px;
  height: 30px;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>
