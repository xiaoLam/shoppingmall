// 引入工具方法
import { debounce } from "common/untils";

// 混入的监听图片加载完毕事件
export const imageLoadListenMixin = {
  data() {
    return {
      // 定义变量, 存储图片加载完毕后调用的方法
      ImageLoadListen: null,
      refresh : null
    }
  },
  deactivated() {
    this.$bus.$off("itemImageLoad", this.ImageLoadListen);
  },
  mounted() {
    // 监听goodslistitem中的图片加载完毕事件
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    this.ImageLoadListen = () => {
      this.refresh();
    };
  },
  activated() {
    this.$bus.$on("itemImageLoad", this.ImageLoadListen);
  }
}

// 将返回顶部按钮模块做混入
import BackTop from "components/context/backTop/BackTop";

export const BackTopMixin = {
  components : {
    BackTop
  },
  data() {
    return {
      // 定义第三变量, 控制返回顶部按钮的显示和隐藏
      showBackTop: false,
    }
  },
  methods : {
    // 点击返回顶部按钮的时候, 调用scroll组件中的scrollTo方法返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    // 下面这个方法需要在组件的滚动事件中调用, 传入position参数
    listenShowBackTop(position) {
      // 判断返回顶部按钮是否显示
      this.showBackTop = -position.y > 1000 ? true : false;
    },
  }
}