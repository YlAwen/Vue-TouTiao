<template>
  <div>
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="scroll-wrap">
      <CommentItem :comment="comment" />
      <span class="text">全部回复</span>
      <CommentList :source="comment.com_id" type="c" :list="commentList" />
    </div>

    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button @click="isPostShow = true" round class="post-btn" size="small"
        >写评论</van-button
      >
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
    <!-- 发布评论 -->
  </div>
</template>
<script>
import CommentItem from "./comment-item";
import CommentList from "./comment-list.vue";
import CommentPost from "./comment-post.vue";
export default {
  name: "CommentReply",
  components: { CommentItem, CommentList, CommentPost },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    onPostSuccess(data) {
      // console.log(data);
      // 更新回复数量
      this.comment.reply_count++;
      // 关闭图层
      this.isPostShow = false;
      // 将内容展示到顶部
      this.commentList.unshift(data.new_obj);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 44px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  height: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
.text {
  font-size: 16px;
  height: 60px;
  display: inline-block;
  line-height: 60px;
  margin-left: 10px;
}
</style>
