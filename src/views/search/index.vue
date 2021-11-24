<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
      />
    </form>
    <!-- 搜索历史纪录 -->
    <!-- 联想建议 -->
    <!-- 历史记录 -->
  </div>
</template>
<script>
export default {
  name: "SearchIndex",
  components: {},
  props: {},
  data() {
    return {
      searchText: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    onSearch(val) {
      this.$toast(val);
    },
    onCancel() {
      this.$toast("取消");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.van-search__action {
  color: #fff;
}
</style>
