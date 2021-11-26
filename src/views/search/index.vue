<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult :searchText="searchText" v-if="isResultShow"></SearchResult>
    <!-- 联想建议 -->
    <SearchSuggestion
      :searchText="searchText"
      v-else-if="searchText"
      @search="onSearch"
    ></SearchSuggestion>
    <!-- 搜索历史纪录 -->
    <SearchHistory
      @clearSearchHistories="SearchHistories = []"
      :SearchHistories="SearchHistories"
      @search="onSearch"
      v-else
    ></SearchHistory>
  </div>
</template>
<script>
import SearchHistory from "./components/search-history";
import SearchResult from "./components/search-result";
import SearchSuggestion from "./components/search-suggestion";
export default {
  name: "SearchIndex",
  components: { SearchHistory, SearchResult, SearchSuggestion },
  props: {},
  data() {
    return {
      searchText: "",
      isResultShow: false,
      SearchHistories:
        JSON.parse(localStorage.getItem("TOUTIAO_SEARCH_HISTORIES")) || [],
    };
  },
  computed: {},
  watch: {
    SearchHistories() {
      localStorage.setItem(
        "TOUTIAO_SEARCH_HISTORIES",
        JSON.stringify(this.SearchHistories)
      );
    },
  },
  methods: {
    onSearch(val) {
      this.searchText = val;
      if (this.SearchHistories.indexOf(val) !== -1) {
        this.SearchHistories.splice(this.SearchHistories.indexOf(val), 1);
        this.SearchHistories.unshift(val);
      } else {
        this.SearchHistories.unshift(val);
      }

      // this.$toast(val);
      // console.log(val);
      this.isResultShow = true;
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
.search-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.search-container {
  padding-top: 54px;
}
</style>
