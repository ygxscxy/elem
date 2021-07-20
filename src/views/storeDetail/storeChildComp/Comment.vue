<template>
  <div class="store-evaluate">
    <!-- 降价 -->
    <div class="rate-box flex a-c">
      <div class="rate-info flex">
        <div class="rate-num">
          <span>{{ rating.overall_score }}</span>
        </div>
        <div class="star">
          <p>商家评分</p>
          <Star :rating="rating.overall_score"></Star>
        </div>
      </div>

      <div class="other-rate">
        <ul class="flex">
          <li class="taste">
            <p>味道</p>
            <p>4.5</p>
          </li>
          <li class="packing">
            <p>包装</p>
            <p>4.6</p>
          </li>
          <li class="distribution">
            <p>配送</p>
            <p>4.9</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 用户评论区 -->
    <div class="user-comment">
      <!-- 标签  -->
      <div class="tags">
        <ul class="flex">
          <li
            @click="clickTitle(index)"
            v-for="(item, index) in tags"
            :key="item.tagIdentity.id"
          >
            <span
              :class="{
                badactiveClass: index == 3,
                activeClass: index == currenTitle,
              }"
              >{{ item.name }}{{ item.count === -1 ? "" : item.count }}</span
            >
          </li>
        </ul>
      </div>
      <div class="other-centent">
        <span class="correct fa fa-check-circle-o"></span>
        <span>只看有内容的评价</span>
      </div>
      <!-- 内容 -->
      <div class="comment-content">
        <ul>
          <li v-for="(item, index) in comments" :key="item.rateId">
            <UserComment :commentItem="item"></UserComment>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserComment from "components/content/userComment/UserComment.vue";
import { getComment, formatCommentData } from "network/comment/index.js";
import Star from "components/content/store/Star.vue";
export default {
  name: "comment",
  props: {},
  components: {
    Star,
    UserComment,
  },
  data() {
    return {
      comments: [],
      tags: [],
      rating: {},
      currenTitle: 0,
    };
  },
  created() {
    this.getCommentdata();
  },

  methods: {
    getCommentdata() {
      getComment({
        url: "/api/comments",
      }).then((res) => {
        let { comments, rating, tags } = new formatCommentData(res.data);
        // console.log(comments, rating, tags);
        this.comments = comments;
        this.rating = rating;
        this.tags = tags;
      });
    },
    clickTitle(index) {
      this.currenTitle = index;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.comment-content {
  padding-bottom: 49px;
}
.other-centent {
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(248, 246, 246);
  font-size: 14px;
}
.correct {
  color: rgb(118, 213, 114);
  font-size: 12px;
  margin-right: 5px;
}
.badactiveClass {
  background-color: rgb(204, 204, 204) !important;
  color: rgb(204, 204, 227);
}

.activeClass {
  background-color: rgb(0, 151, 255) !important;
  color: white !important;
}
.tags {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  border-bottom: 2px solid rgb(248, 246, 246);
}
.tags span {
  display: inline-block;
  height: 20px;
  padding: 5px;
  text-align: center;
  line-height: 20px;
  margin-left: 5px;
  color: rgb(141, 142, 143);
  font-size: 12px;
  background-color: rgb(235, 245, 255);
}
.tags ul {
  flex-wrap: wrap;
}
.user-comment {
  border-top: 5px solid rgb(230, 228, 228);
  height: 200px;
}

/* 商家评价样式 */

.other-rate {
  height: 100%;
  width: 60%;
  padding-top: 40px;
}
.other-rate ul li {
  width: 34%;
}
.other-rate ul li p:nth-last-child(1) {
  padding-top: 5px;
}
.star {
  padding-top: 25px;
  padding-left: 10px;
  font-size: 12px;
}
.rate-info {
  width: 45%;
  height: 100%;
  text-align: center;
}
.star p {
  margin-bottom: 5px;
}
.rate-num {
  color: rgb(255, 96, 0);
  font-size: 35px;
  margin-right: 5px;
  text-align: center;
  line-height: 80px;
}
.rate-box {
  height: 80px;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
  text-align: center;
}
.store-evaluate {
  width: 100%;

  box-sizing: border-box;
}
</style>