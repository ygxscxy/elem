<template>
  <div class="comment flex">
    <!-- 头像区域 -->
    <div class="comment-left-user-icon">
      <img
        :src="
          $formatImgSrc(commentItem.avatar) ||
          'https://cube.elemecdn.com/c/6b/8384f98b8dedfd87fc1450926648cjpeg.jpeg?x-oss-process=image/format,webp/resize,w_60,h_60,m_fixed'
        "
        alt=""
      />
    </div>
    <!-- 右侧评论内容区域 -->
    <div class="comment-content">
      <!-- 第一行 -->
      <div class="username-datetime">
        <p>{{ commentItem.username }}</p>
        <p class="release-time">2020-10-10</p>
      </div>
      <!-- 第二行 -->
      <div class="rate">
        <Star :rating="commentItem.rating"></Star>
        <span :style="{ color: ratingcontent(commentItem.rating).color }">{{
          ratingcontent(commentItem.rating).txt
        }}</span>
      </div>
      <!-- 第三行 -->
      <div class="user-content">
        <p>{{ commentItem.rating_text }}</p>
      </div>
      <!-- 第四行 -->
      <div v-if="commentItem.reply" class="store-reply">
        <p>商家回复：{{ commentItem.reply.content }}</p>
      </div>
      <!-- 第五行 -->
      <div class="show-food-img" v-if="commentItem.order_images.length >= 1">
        <img
          v-for="imgSrc in commentItem.order_images"
          v-if="imgSrc.image_hash.includes('//') === false"
          :src="$formatImgSrc(imgSrc.image_hash) || imgSrc.image_hash"
          alt=""
        />
        <!-- <img v-else :src="mgSrc.image_hash" alt="" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import Star from "components/content/store/Star.vue";

export default {
  props: {
    commentItem: Object,
  },
  components: {
    Star,
  },

  methods: {
    // 评价标签
    ratingcontent(rating) {
      const content = [
        { txt: "吐槽", color: "rgb(137,159,188)" },
        { txt: "较差", color: "rgb(137, 159, 188)" },
        { txt: "一般", color: "rgb(251, 154, 11)" },
        { txt: "满意", color: "rgb(251, 154, 11)" },
        { txt: "超赞", color: "rgb(255, 96, 0)" },
      ];
      return content[rating - 1];
    },
  },
};
</script>

<style scoped>
.show-food-img img {
  width: 100px;
  height: 100px;
}
.store-reply p {
  width: 100%;
  margin-top: 10px;
  background-color: rgb(243, 243, 243);
  font-size: 12px;
  padding: 10px;
  line-height: 18px;
  box-sizing: border-box;
}
.user-content {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  line-height: 20px;
  box-sizing: border-box;
}
.rate {
  width: 100%;
  margin-top: 20px;
  font-size: 12px;
}
.rate >>> .rating-gray i {
  /* background-image: linear-gradient(to right, red, yellow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
}
.release-time {
  color: rgb(192, 193, 194);
  font-size: 12px;
}
.comment {
  border-bottom: 2px solid rgb(248, 246, 246);
  box-sizing: border-box;
  padding: 10px;
}
.comment-left-user-icon {
  width: 20%;
  height: 100%;
  text-align: center;
}

.comment-left-user-icon img {
  width: 30px;
  height: 30px;
}

.comment-content {
  width: 80%;
  height: 100%;
}
.comment-content p:nth-of-type(1) {
  float: left;
}
.comment-content p:nth-of-type(2) {
  float: right;
}
</style>