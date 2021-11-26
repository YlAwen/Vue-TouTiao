<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in Suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highLight(text)"></div>
    </van-cell>
  </div>
</template>
<script>
// 防抖
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      Suggestions: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (value) {
        this.axios
          .get(`/v1_0/suggestion?q=${value}`)
          .then((res) => {
            // console.log(res.data.data.options);
            this.Suggestions = res.data.data.options;
          })
          .catch((err) => {
            this.$toast("数据获取失败，请稍后重试");
          });
      }, 200),
    },
  },
  methods: {
    highLight(text) {
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(
        reg,
        `<span class="active">${this.searchText}</span>`
      );
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
/deep/.active {
  color: #3296fa !important;
}
</style>
