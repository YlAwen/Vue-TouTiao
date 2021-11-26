<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="isDeleteShow" @click="$emit('clearSearchHistories')"
        >全部删除</span
      >&nbsp;&nbsp;&nbsp;
      <span v-if="isDeleteShow" @click="isDeleteShow = !isDeleteShow"
        >完成</span
      >
      <van-icon
        v-if="!isDeleteShow"
        name="delete"
        @click="isDeleteShow = !isDeleteShow"
      ></van-icon>
    </van-cell>
    <van-cell
      v-for="(item, index) in SearchHistories"
      :key="index"
      :title="item"
      @click="onSearchItemClick(item, index)"
      ><van-icon v-if="isDeleteShow" name="close"></van-icon>
    </van-cell>
  </div>
</template>
<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    SearchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除数据
        this.SearchHistories.splice(index, 1);
      } else {
        // 进入搜索
        this.$emit("search", item);
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
