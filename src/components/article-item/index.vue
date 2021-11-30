<template>
  <van-cell class="article-item" :to="'/article/' + article.art_id">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image fit="cover" :src="img" class="cover-item-img" />
        </div>
      </div>
      <div class="lable-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      fit="cover"
      class="right-cover"
      v-if="article.cover.type === 1"
      slot="default"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  filters: {
    relativeTime(value) {
      return dayjs().to(dayjs(value));
    },
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    padding-left: 13px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .lable-info-wrap span {
    font-size: 11px;
    color: #b4b4b4;
    margin-right: 12px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 2px;
      }
      .cover-item-img {
        width: 100%;
        height: 73px;
      }
    }
  }
}
</style>
