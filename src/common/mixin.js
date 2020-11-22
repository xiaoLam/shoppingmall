// 引入工具方法
import { debounce } from "common/untils";

export const imageLoadListenMixin = {
  data() {
    return {
      // 定义变量, 存储图片加载完毕后调用的方法
      ImageLoadListen: null,
      refresh : null
    }
  },
  mounted() {
    // 监听goodslistitem中的图片加载完毕事件
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    this.ImageLoadListen = () => {
      this.refresh();
    };
    this.$bus.$on("itemImageLoad", this.ImageLoadListen);
  }
}