<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      @click-left="onClickLeft"
      left-arrow
      title="IT头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <FollowUser
            :userId="article.art_id"
            class="follow-btn"
            :isFollowed="article.is_followed"
            @update-is_followed="article.is_followed = $event"
          />
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
            v-if="article.is_followed"
            @click="onFollow"
            :loading="followLoading"
            >已关注</van-button
          >
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-else
            :loading="followLoading"
            @click="onFollow"
            >关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <CommentList
          :list="commentList"
          :source="article.art_id"
          @onload-success="totalCount = $event.total_count"
          @replay-click="onReplyClick"
        />
        <!-- 文章评论列表 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="isPostCommentShow = true"
            class="comment-btn"
            type="default"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <CollectArticle
            :articleId="article.art_id"
            v-model="article.is_collected"
          />
          <LikeArticle v-model="article.attitude" :articleId="article.art_id" />
          <van-icon name="share" color="#777777"></van-icon>
        </div>

        <!-- /底部区域 -->

        <!-- 发布评论 -->
        <van-popup position="bottom" v-model="isPostCommentShow"
          ><CommentPost :target="article.art_id" @post-success="onPostSuccess"
        /></van-popup>
        <!-- 发布评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%"
      ><CommentReply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
    /></van-popup>
    <!-- 评论回复 -->
  </div>
</template>

<script>
import FollowUser from "../../components/follow-user/index";
import CollectArticle from "../../components/collect-article/index";
import LikeArticle from "../../components/like-article/index";
import CommentList from "./components/comment-list";
import CommentPost from "./components/comment-post";
import CommentReply from "./components/comment-replay.vue";
import { ImagePreview } from "vant";
export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply,
  },
  // 给所有的后代组件提供数据
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      article: {},
      loading: false,
      errStatus: 0,
      followLoading: false,
      isReplyShow: false,
      totalCount: 0,
      isPostCommentShow: false,
      commentList: [],
      currentComment: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    previewImage() {
      // 得到所有img节点绑定事件
      const imgs = this.$refs["article-content"].querySelectorAll("img");
      const images = [];
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
      // console.log(images);
    },
    onClickLeft() {
      this.$router.back();
    },
    loadArticle() {
      this.loading = true;
      this.errStatus = 0;
      this.axios
        .get(`/v1_0/articles/${this.articleId}`)
        .then((res) => {
          // console.log(res.data.data);
          this.article = res.data.data;
          // 请求成功后，给所有图片加上ImagePreview
          setTimeout(() => {
            this.previewImage();
          }, 0);
          this.loading = !this.loading;
        })
        .catch((err) => {
          // console.log(err.response);
          if (err.response && err.response.status === 404) {
            this.errStatus = 404;
          }
          this.loading = !this.loading;
        });
    },
    async onFollow() {
      this.followLoading = true;
      try {
        if (this.article.is_followed) {
          const response = await this.axios.delete(
            `/v1_0/user/followings/${this.article.art_id}`
          );
          // console.log(response);
        } else {
          const response = await this.axios.post("/v1_0/user/followings", {
            target: `${this.article.art_id}`,
          });
          // console.log(response);
        }
        this.article.is_followed = !this.article.is_followed;
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          this.$toast("你不能关注你自己");
        } else {
          this.$toast("操作失败，请重试！");
        }
      }
      this.followLoading = false;
    },
    onPostSuccess(data) {
      this.isPostCommentShow = false;
      this.commentList.unshift(data.new_obj);
    },
    onReplyClick(comment) {
      this.currentComment = comment;
      console.log(comment);
      this.isReplyShow = true;
    },
  },
  filters: {},
};
</script>
<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 9px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 12px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 28px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 61px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 17px 0 24px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
  }
}
</style>
