<template>
  <div class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
    </div>
    <div v-if="Object.keys(commentInfo).length !== 0">
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="" />
        <span class="user-name">{{ commentInfo.user.uname }}</span>
      </div>
      <div class="info-detail">
        <div class="detail-comment">{{ commentInfo.content }}</div>
        <div class="detail-other">
          <!-- 这里使用了过滤器, 其本质就是将commentInfo.created作为参数传入 filters中的showDate方法中, 然后将返回的结果进行展示 -->
          <span class="date">{{ commentInfo.created | showDate }}</span>
          <span>{{ commentInfo.style }}</span>
        </div>
        <div class="detail-img">
          <img
            v-for="(item, index) in commentInfo.images"
            :key="index"
            :src="item"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/untils";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(value) {
      let date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
};
</script>

<style scoped>
.comment-info {
  padding: 15px;
  border-top: 3px solid rgba(100, 100, 100, 0.1);
}
.info-header {
  height: 30px;
  text-align: 30px;
}
.header-title {
  float: left;
  font-size: 14px;
}
.header-more {
  float: right;
  font-size: 12px;
}
.info-user {
  padding: 10px 0;
  border-top: 2px solid rgba(100, 100, 100, 0.1);
}
.info-user img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #eee;
  vertical-align: middle;
}
.user-name {
  color: #333;
  font-size: 14px;
  margin-left: 5px;
}
.info-detail .detail-comment {
  font-size: 14px;
  line-height: 20px;
}
.info-detail .detail-other {
  margin-top: 10px;
  color: #aaa9aa;
  font-size: 12px;
}
.info-detail .detail-other .date {
  margin-right: 10px;
}
.detail-img {
  margin-top: 10px;
}
.detail-img img {
  width: 70px;
  margin-right: 5px;
}
</style>