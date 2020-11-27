# shoppingmall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 创建项目
+ 使用这里使用的是vue-cli>=3 脚手架
+ 命令行输入 vue create shoppingmall
  - 新建一个名为 shoppingmall的项目
    + 注意项目名不能有大写字母, 否则会报错
  - 使用的vue是 2.x 而不是vue3.x, 因为我看到代码提示vue3.x后面有个preview字样, 就是说是测试版
  - 安装的组件只安装了 ESlint, 就是ES6语法转换为ES5语法

### 将项目与github仓库链接起来
+ 登陆github网站
+ 新建一个仓库
+ 在项目根目录下命令行输入
  - git remote add origin 仓库地址
  - git branch -M main
  - git push -u origin main
+ 第一次上传可能需要填写 github的账户和密码
  - 按照提示输入账号密码即可
+ 执行完以上步骤后, 回到github的仓库进行刷新, 即可看到上传的项目文件


### 划分目录结构
+ 创建好项目的第一件事就是划分目录结构
+ 这一步很简单, 但是很重要, 对我们后面项目的维护十分重要
+ 以下是src目录中的目录结构
+ assets文件夹: 放资源的文件夹, 图片, 样式等
  - css文件夹
  - img文件夹
+ common文件夹: 这个文件夹是用于放入项目公共js方法的
+ components文件夹: 这个文件夹是放项目公共组件的
  - common文件夹: 这个文件夹是放其他项目也能用的组件
  - context文件夹: 这个文件夹是放跟这个项目相关的组件的
+ network文件夹: 这个文件夹放与网络请求相关的文件
+ router文件夹: 这个文件夹放与路由相关文件
+ store文件夹: 这个文件夹放vuex共享数据的文件
+ view文件夹: 这个文件夹放大视图组件的

### 初始化CSS样式, 引入两个css样式文件
+ github上有一个很好用的初始化CSS样式的叫 normalize.css 的初始化样式
+ 我们可以下载这个样式导入到我们的项目中
+ 我们还定义了自己的 base.css 样式
+ 在App.vue 根组件中的 style 标签中, 通过 @import "url" 来引入样式

### 配置项目别名
+ 下一步就是配置项目的别名, 方便我们后续对项目文件的引用
+ 在 vue-cli>=3 中, 我们需要在项目根目录下创建一个名叫 vue.config.js 的文件
+ 在这个文件中编写配置
``` js
// 这里是vue.config.js 的代码
module.exports = {
  configureWebpack: {
    resolve: {
      // 在这里配置项目的后缀
      // extensions: []
      // 脚手架已经帮我们配置过后缀了, 所以一般我们都不需要再配置, 除非我们还有其他的文件后缀需要省略

      // 在这里配置项目目录的别名
      alias: {
        // vue已经帮我们配置过 '@' : 'src' 了
        // 我们可以使用这个@来配置其他的别名
        'assets' : '@/assets',
        'common' : '@/common',
        'network' : '@/network',
        'view' : '@/view'
        // 在这里我们不需要配置router文件夹和store文件夹的别名
        // 因为我们在mian.js 中注册过之后, 就可以在全局中通过 this.$router 和 this.$store 获得router对象和store对象
      }
    }
  }
}
```

### 配置项目代码风格格式
+ 在vue-cli2 中, 初始化项目, 会帮我们生成 .editorconfig 文件
+ 但是在 vue-cli>=3 中, 不会帮我们生成这个文件
  - 推测是因为, vue想着反正帮你们生成了, 你们自己还要改一遍, 干脆不帮你们自动生成了, 你们从公司别的项目拷过来一份吧, 这样正好跟公司的代码风格统一
+ 所以这里我们直接拷贝过来一份
+ 这个文件也是很重要的, 它规定了我们代码风格的统一, 方便后期项目的维护

### 引入tabbar 和 项目模块的划分
+ 引入之前封装好的tabbar模块, 注意修改引入的tabbar组件中的路径
+ 命令行输入 npm install vue-router --save (运行时依赖) 安装vue-router
+ 在views文件夹中创建各个大视图
+ 在router/index.js 中配置映射关系

### 更改vue项目的小图标
+ 直接将小图标文件 favicon.ico 复制替换在public文件夹中的文件即可
+ 可以看到, public/index.html 文件中引入小图标的位置有一个奇怪的语法
+ link rel="icon" href="<%= BASE_URL %>favicon.ico"
+ <%= BASE_URL %> 这句代码的意思是指向当前目录的 favicon.ico
+ 实质上html并没有这种语法, 而且vue打包的时候会将这句代码进行转换, 所以vue脚手架会这样生成这句代码

### 首页开发-首页导航栏的封装和使用
+ 因为导航栏在每个view中都能使用, 而且可以在别的项目中使用
+ 所以我们把这个导航栏的组件放在 components/common 中
+ 在componnets/common 中创建文件夹 navbar , 在这个文件夹中创建 NavBar.vue 组件
+ 这个组件很简单, 为了其他导航栏中可以插入其他的小图标和小箭头, 所以我给这个组件设置了三个插槽
+ 插槽设置样式的注意点: 插槽会被别的内容替换, 所以其样式要写在包裹这个插槽的div上
+ 具体代码可以看 src/components/common/navbar/NavBar.vue
+ 如果需要给这个首页导航栏设置一些别的样式, 比如背景颜色, 字体颜色, 可以在引用的组件中编写样式覆盖即可

### 请求首页的多个数据
+ 我们通过网络请求数据需要使用axios组件
+ 项目根目录下命令行输入 npm install axios --save
+ 在network/request 中封装基本网络请求
+ 我们不要将具体的网络请求编写在组件中, 这样不易于以后的管理和维护
+ 我们在network文件夹中创建针对某个组件的网络请求js文件
+ 在该文件中编写关于该组件的网络请求
+ 然后在组件中调用这个js文件的方法即可
+ 具体代码可以看src/network 中的代码

### 如何在组件中存储网络请求回来的数据
+ 我们会在组件创建完毕后 调用created生命周期函数, 在这个函数内我们调用网络请求方法
+ 但是由于垃圾回收机制, 当created生命周期函数执行结束后, 里面的局部变量变量会被回收, 局部变量存储的数据也将回收
+ 所以我们要在组件中的data中预先定义一些变量, 存储网络请求返回过来的数据

### 首页轮播图的展示
+ 轮播图的组件可以看src/components/common/swiper 中的组件
+ swiper中的index.js文件只是为了引用组件的时候方便
+ 为了views视图组件中代码的整洁, 视图组件只会编写主要的逻辑
+ 组件内部的逻辑我们会抽离出来
+ 所以首页中的轮播图调用我们会抽离出来, 放在 home/childComponents 文件夹中
+ 轮播图模块有点复杂的, 建议看源码

### 首页推荐模块组件
+ 这个组件与首页联系大, 而且在其他的组件中不能用, 所以放在home/childComponents 文件夹中
+ 直接在home/childComponents 中创建 RecommendView.vue 组件
+ 编写好引入到Home.vue 即可

### 首页的featureView模块组件
+ 见 home/childComponents/FeatureView 代码
+ 将组件引入到Home.vue 中即可

### 引入组件和注册组件的规范
+ 引入组件的时候要有意识地将有关联的组件import引入放在同一个地方, 方便以后的查找
+ 在注册组件的时候也一样

### 首页的 tabControl 模块组件
+ 这个组件能在其他的view中使用, 但是不能在其他的项目中使用, 所以我们将它放到components/context/tabControl中
+ 我们做到这里会发现, 现在我们滚动页面的时候是有问题的
  - 比如, 我们在滑动轮播图的时候, 页面也会跟着滑动
  - 而且底部的NavTab会遮住我们的组件
  - 我们以后会解决, 现在先不用管
+ 我们在这里简单地实现了 tabControl组件, 在页面向下滚动的时候, 组件能够粘附在顶部的效果
+ 我们在这里使用的是 postion : sticky 这个CSS3样式, 并且设置 top值
  - 这个样式达到的效果是, 在平时盒子会随着页面滚动, 当页面顶部等于设置的top值的时候
  - 盒子就会变成 position: fixed

### 首页开发-保存商品的数据结构设计
+ 我们可以看到首页商品展示中具有三个模块分别是: 流行/新款/精选
+ 这里的数据是有点复杂的
+ 虽然数据是有三个模块, 但是我们不能在用户点击某个模块的时候才开始请求该模块的数据, 然后再进行展示, 这样数据传输造成延迟会很高, 用户体验不好, 所以
+ 我们这里的做法是, 把所有的数据请求过来, 然后在一个对象goods中,再对这些数据进行划分, 划分为 "pop"/"news"/"sell" 对象, 这些对象中又有list数组, 在这个数组中存放数据 
+ 划分出来的数据也是有很多的, 我们不可能一次性将所有数据全部展示出来
+ 所以我们在划分的对象中添加一个属性, page, 用于记录用户当前需要展示哪一页的数据
+ goods
  - "pop"
    + page  这个page属性用于记录用户当前需要加载的数据的页数
    + list  数据就存放在这个数组中
  - "news"
    + page
    + list
  - "sell"
    + page
    + list

### 首页开发- 网络请求商品goods并保存于组件中
+ 在network/home 中编写号网络请求方法后
+ 在home组件的生命周期created中调用该方法的时候, 意识到, 生命周期函数中不应该编写请求完数据的具体操作
+ 生命周期函数中应该只写主要的逻辑, 具体的操作应该写到组件的methods中
+ 所以我们给生命周期函数中的方法封装到了组件的methods中
+ 具体看 views/home/Home.vue 中的代码

### 首页开发- goods展示
+ 思路: goods数据的传输过程如下
+ 在Home.vue组件创建完毕的时候调用created生命周期函数请求数据, 通过props将数据中的list数据传输给GoodsList.vue, 再在GoodsList.vue中通过props将数据中的每一个goods传输给GoodsListItem.vue
+ 在GoodsList.vue组件中通过v-for遍历出每一个goods, 传输给GoodsListItem.vue, 在GoodsListItem中处理
+ 具体看代码 components/context/goods 中的代码


### 首页开发 - goodslist切换
+ 思路: 通过监听TabControl的自定义事件, 来更改展示的goodslist
+ 关键的一步是, 定义一个第三变量来承接控制更改goodslist的任务

### 在项目中我们发现原生的滚动不好用
+ 所以我们使用了一个第三方框架 better-scroll
+ https://better-scroll.github.io/docs/zh-CN/ 官方文档有详细说明

### vue生命周期函数要点
+ 在created生命周期函数中是获取不了DOM的
+ 要在mounted生命周期函数中获取DOM

### better-scroll使用的坑
+ 要在mounted中获取DOM元素
+ 数据请求过来的先后顺序导致better-scroll计算可滚动高度的错误
+ 这个是因为数据请求过来的时候图片还没有加载到DOM中, 但是这个时候就已经创建了better-scroll实例了, 而且创建好的实例内部就已经设置好了content的高度, 而且不会自动刷新
+ 这时图片加载到DOM中, 页面实际的高度变大,但是better-scroll实例中规定的高度没变
+ 所以会导致滚动失效
+ 解决方案: 
  - 第一种方法,给mounted中的创建better-scroll实例设置一个定时器即可(不推荐)
  - 第二种方法, 在每次

### 首页开发- 返回顶部按钮
+ 在 components/context/backTop 中创建 BackTop.vue 组件, 设置好样式
+ 在点击该组件后, 调用Scroll.vue中的better-scroll实例中的scrollTo(x,y,time)方法
  - scrollTo(x,y,time)方法中的 x和y参数指要回到的位置, time参数指这个过程的持续时间
+ 实现思路一
  - 在BackTop组件中监听点击事件, 然后通过自定义事件传给Home.vue组件
  - 然后在Home.vue组件中通过 this.$refs 取到Scroll组件中的better-scroll实例
  - 调用该实例的scrollTo方法
+ 实现思路二
  - 在Home.vue组件中直接监听BackTop.vue组件的点击
    + 注意: 监听组件的事件, 要加上 .native 修饰符
  - 然后直接通过 this.$refs 取到Scroll组件中的better-scroll实例
  - 调用该实例的scrollTo方法

### 防抖函数 debounce
+ 如果我们频繁地去调用某个函数, 或者频繁地去进行网络请求
+ 这样对浏览器压力大, 对服务器的压力也大
+ 所以我们可以通过防抖函数来限制单位时间内只进行一次操作
+ 防抖函数的原理:
  - 定义一个定时器包裹想要执行的方法
  - 在每一次进入防抖函数的时候, 都进行一次判断, 如果上一次的定时器还没有结束, 则清除上一次的定时器
  - 重新定义定时器, 直到最后一次请求
``` js
// 防抖函数需要传入两个参数, 第一个参数是想要调用的函数, 第二个参数是时间间隔
debounce(func, delay) {
  // 定义第三变量, 记录定时器是否存在
  let timer = null;
  return function (...args) {
    // 进行判断, 如果上一次的定时器还存在, 那么则清除上一次的定时器
    // 保证只有一个定时器在运行
    if (timer) clearTimeout(timer);

    // 设置定时器, 在定时器结束的时候, 调用需要的函数
    timer = setTimeout(() => {
      // 使用apply来调用函数, 防止函数中的上下文指向错误
      func.apply(this, args);
    }, delay);
  };
},
```
+ 在使用了防抖函数后
+ 我们重置better-scroll时调用 其中的 refresh() 方法的频率大大减少
+ 还解决了切换MainBar的时候, 由于图片加载过快, 而导致 scroll实例还没有挂载而报错没有refresh() 方法的bug
``` js
mounted() {
  // 监听goodslistitem中的图片加载完毕事件
  const refresh = this.debounce(this.$refs.scroll.refresh, 50);
  this.$bus.$on("itemImageLoad", () => {
    refresh();
  });
},
```

### 首页开发- 上拉加载更多
+ 利用better-scroll 中的 pullingUp 方法监听, 拉到了底部
+ 将该方法通过自定义方法 this.$emit 发送出去
+ 在Home.vue 中接收
+ 接收到自定义方法后, 回调gethomegoods 方法即可

### 解决TabControl吸顶问题
+ 首先我们需要获取到 TabControl的offsetTop值, 用来判断什么时候修改TabControl的样式
+ 如果需要获取组件中的元素的属性值, 需要使用每个组件对象中的$el来获取其中的元素
+ 这里又引出了另外一个问题, 在获取组件元素中的offsetTop值的时候, 该组件上面的图片还没有加载出来, 所以获取的offsetTop值是不包含图片的高度的
+ 所以我们要监听该组件上面的图片的 $load事件, 在图片加载完毕的时候再获取offsetTop值
+ 然后我们根据这个offsetTop值来动态地决定TabControl是否添加fixed样式
+ 但是我们发现, 在better-scroll组件中的fixed样式是无效的, 添加了fixed样式的组件会随着滚动滚到页面的外面
+ 所以我们用了另外一种方法去解决这个吸顶问题
+ 我们在better-scroll组件的外面复制了一个 TabControl 组件
+ 通过v-show, 让这个克隆组件在没有滚到要吸顶的位置的时候, 隐藏起来
+ 在滚到要吸顶的位置的时候, 让这个克隆组件显示
+ 这样做完之后, 又引发了另外一个问题, 因为这两个TabControl组件是两个个体, 所以如果在其中一个组件进行TabControl切换的时候, 另外一个是不会切换的
+ 所以我们在点击TabControl切换的时候, 进行了一步操作, 就是让两个组件的 controlIndex = index 这样就可以达到同步的效果
``` js
tabClick(index) {
  // 根据index改变展示的goodslist
  switch (index) {
    case 0:
      this.currentType = "pop";
      break;
    case 1:
      this.currentType = "new";
      break;
    case 2:
      this.currentType = "sell";
      break;
  }
  // 让两个TabControl组件同步起来
  this.$refs.tabControl.contorlIndex = index;
  this.$refs.tabControlClone.contorlIndex = index;
}
```

### 保留Home的状态
+ 使用 keep-alive 来保持切换MainTabBar的时候Home的滚动位置
+ 为了更加地确保保持滚动位置
+ 我们通过记录首页的滚动位置, 使用keep-alive中的activated和deactivated方法
+ 在离开Home.vue组件的时候, 记录当前滚动的位置
+ 在进入Home.vue组件活跃的时候使用better-scroll中的scrollTo() 方法滚动到记录的位置
 

### 跳转到详情页并携带id
+ 首先创建详情页组件 在views/detail 中创建一个 Detail.vue的组件
+ 设置路由映射关系
+ 设置为动态路由 通过冒号 : 来获取id
+ 监听GoodsListItem组件中的goods的点击事件
+ 在点击后通过 this.$router.push("/detail/" + this.goodsitem.iid); 进行路由转换, 并且带上iid
+ 在Detail.vue组件中通过 this.$route.params.iid 获取到iid, 并且存储在data中

### 导航栏的封装
+ 使用封装好的NavBar组件即可
+ 详情页组件封装好在views/detail/childComponents/DetailNavBar.vue中

### 数据请求
+ 在network文件夹中新建一个 detail.js 文件, 里面编写Detail.vue组件请求数据的方法

### 轮播图的展示
+ 在Detail.vue组件中请求数据, 抽离出轮播图需要的数据, 然后将数据通过 props 传输给 DetailSwiper.vue组件
+ 在DetailSwiper.vue组件中使用封装好的轮播图组件

### 详情页商品信息
+ 在详情页网络请求文件detail.js中
+ 创建一个class 传入一些杂乱的数据, 返回一个筛选过的有序的数据对象
+ 返回的是商品详情页中的BaseInfo中的数据
+ 在Detail.vue组件中请求数据, 将请求到的杂乱数据中抽离出商品信息的数据实例成一个对象
+ 将这个对象通过props传给DetailGoodsInfo.vue组件

### 详情页的商家信息
+ 跟详情页商品信息做法差不多

### 给详情页使用better-scroll
+ 与在首页中使用better-scroll差不多
+ 注意点: 如果发现, 滚动不了的情况
+ 请检查, 是否有给父盒子写入确定的高度
+ 如果父盒子有确定的高度还是出现滚动不了的情况
+ 那么就监听详情页轮播图图片的加载事件, 在加载完成后调用better-scroll中的refresh方法重置一下better-scroll实例

### 详情页的商品更多信息组件
+ 跟详情页商品信息做法差不多
+ 但是这个商品更多信息组件, 里面有很多图片
+ 所以要给这些图片监听加载完成事件
+ 然后将事件信息传给Detail.vue, 让其执行better-scroll中的refresh方法重置better-scroll实例中设定的盒子高度

### 详情页的商品参数组件
+ 看源码就行

### 详情页商品评论组件
+ 没有什么特别的
+ 注意点: 从服务器传输过来的时间都是时间戳格式的, 所以我们需要将其进行转化才把它显示出来
+ 这里使用的是在common/untils.js 中封装好的一个转化方法
+ 而且在DetailCommentInfo.vue组件中使用了过滤器
``` html
<!-- 这里使用了过滤器, 其本质就是将commentInfo.created作为参数传入 filters中的showDate方法中, 然后将返回的结果进行展示 -->
<span class="date">{{ commentInfo.created | showDate }}</span>
```

``` js
filters: {
  showDate(value) {
    let date = new Date(value * 1000);
    return formatDate(date, "yyyy-MM-dd hh:mm");
  },
},
```

### 在详情页的推荐模块图片加载完毕后也会向首页发送图片加载完毕时间
+ 所以导致无法保存首页滚动位置的bug
+ 因为详情页的推荐模块图片加载完后会通过事件总线$bus向详情页组件发送图片加载完毕事件, 但是, 发送的这个图片加载完毕事件的事件名, 跟首页监听的事件名是一样的, 所以首页也会监听到这个事件, 导致首页组件会调用better-scroll中的refresh方法, 所以导致无法保存首页滚动的位置
+ 解决方案1:
  - 通过 $route.path.indexOf() 判断当前所在的路由, 在事件总线中发送不一样的事件名, 在Home.vue和Detail.vue中分别监听
``` js
 imageload() {
  // this.$bus.$emit("itemImageLoad");

  // 通过 this.$route.path.indexOf() 判断当前所在的路由是哪个
  if (this.$route.path.indexOf("/home") >= 0) {
    // 发送不同的事件总线 事件名
    // 在不同的组件中分别监听
    this.$bus.$emit("homeitemImageLoad");
  } else if (this.$route.path.indexOf("/detail") >= 0) {
    this.$bus.$emit("detailitemImageLoad");
  }
},
```

+ 解决方案2: 
  - 在各个组件创建的时候监听图片加载事件
  - 在组件被销毁或者离开活跃状态的时候通过 this.$bus.$off("事件名",对应回调函数) 来取消监听
``` js
mounted() {
  // 监听goodslistitem中的图片加载完毕事件
  const refresh = debounce(this.$refs.scroll.refresh, 50);
  // 存储要调用的方法
  this.ImageLoadListen = () => {
    refresh();
  };
  // 通过事件总线监听图片加载完毕事件, 并回调方法
  this.$bus.$on("itemImageLoad", this.ImageLoadListen);
},
destoryed() {
  // 在组件被销毁的时候, 取消事件总线的监听
  this.$bus.$off("itemImageLoad", this.ImageLoadListen);
},
```

+ 以上两种方法都可以解决这个BUG

### mixin混入
+ 如果使用上面所写的第二种方法的的话, 会导致多个组件中有重复的代码
+ 我们的代码要尽量的优雅, 所以要减少重复代码的出现
+ 所以我们使用vue 中提供的mixin混入方法
+ 原理: 在mixin对象中的data和方法等, 会混入到导入的组件中
+ 具体操作
  - 在common文件夹中新建一个名为 mixin.js 的文件
  - 在里面编写好想要被混入的对象并暴露出去
  - 在组件中导入
``` js
// 这是mixin.js中的代码
// 引入工具方法
import { debounce } from "common/untils";

export const imageLoadListenMixin = {
  // 不仅可以混入方法, 还可以混入data
  data() {
    return {
      // 定义变量, 存储图片加载完毕后调用的方法
      ImageLoadListen: null,
    }
  },
  mounted() {
    // 监听goodslistitem中的图片加载完毕事件
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.ImageLoadListen = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.ImageLoadListen);
  }
}
```

### 实现点击详情页标题滚动到对应的位置
+ 实现思路, 禁停标题的点击, 将点击事件传给Detail.vue组件
+ 在Detail.vue组件中调用 better-scroll 实例中的 scrollTo() 方法实现滚动到对应的位置
+ 难点: 在哪里获取正确的对应标题的offsetTop值
+ 我们尝试在生命周期函数created中获取对应 offsetTop值
  - 但是在created中, 元素DOM还没有挂载出来, 所以是获取不到元素的offsetTop值
+ 然后我们尝试在生命周期函数mounted中获取对应的 offsetTop值
  - 虽然在mounted中元素DOM挂载了, 但是DOM还没有被渲染, 所以也是获取不了offsetTop值
+ 我们尝试在获取数据的地方使用 $nextTick 函数来获取
  - $nextTick 函数会在DOM元素渲染完毕后调用
  - 但是DOM元素虽然渲染完毕了, 但是元素内部的图片还没有加载出来, 所以获取到的offsetTop值是不包含图片高度的, 所以这个offsetTop值是不正确的
+ 我们尝试在生命周期函数update中获取
  - updated函数会在数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用
  - 但是这个获取到的高度是不包含未加载的图片高度的, 所以获取的offsetTop值是错误的
+ 最终我们在在每一张图片加载完毕的时候获取一次offsetTop值
  - 在每一张图片加载完毕后获取一次, 这样就可以确保能获取到正确的offsetTop值
  - 但是这样获取的次数过于频繁
  - 我们可以使用防抖函数解决获取次数频繁的问题

### 在获取好每个theme的offsetTop值后
+ 就监听页面的滚动事件
+ 在页面发生滚动的时候进行一次判断
+ 将页面当前所在的位置和每一个theme的offsetTop值做一个比较
``` js
// 监听详情页面的滚动事件
detailScroll() {
  // 获得当前页面滚到的位置
  const positionY = -this.$refs.scroll.getScrollY();
  // 根据当前页面滚到的位置和各个theme的对应位置作一个判断
  for (let i = 0; i < this.themeYs.length; i++) {
    // 普通的做法
    if (
      this.$refs.detailNavBar.currentType !== i &&
      ((i < this.themeYs.length - 1 &&
        positionY >= this.themeYs[i] &&
        positionY < this.themeYs[i + 1]) ||
        (i == this.themeYs.length - 1 && positionY >= this.themeYs[i]))
    ) {
      this.$refs.detailNavBar.currentType = i;
    }
  }

  // hack做法, 给themeYs这个数组push一个很大的值, 就不需要像上面代码那样做那么多判断了
  // 这种做法会放弃掉一点点内存, 但是会增加性能  空间换时间
  for (let i = 0; i < this.themeYs.length - 1; i++) {
    if (
      this.$refs.detailNavBar.currentType !== 1 &&
      positionY >= this.themeYs[i] &&
      positionY < this.themeYs[i + 1]
    ) {
      this.$refs.detailNavBar.currentType = i;
    }
  }
},
```

### 底部BottomBar模块
+ 很简单, 创建好模块导入即可
+ 注意这个模块不需要导入在better-scroll中
+ 注意修改better-scroll中content的固定高度
  - 否者滚动的页面会有一部分被BottomBar模块遮住

### 返回顶部按钮模块
+ 我们可以直接在Home.vue中拿过来直接用
+ 但是我们发现从Home.vue中拿这个返回顶部模块的时候复制的代码很多
+ 这样就导致了代码重复量很大
+ 所以我们给返回顶部按钮模块做了混入 mixin
``` js
// 这些是mixin.js中的代码
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
```

### 将商品添加至购物车中
+ 实现思路
+ 监听DetailBottomBar中'加入购物车'元素的点击事件
  - 因为在DetailBottomBar组件中是没有商品的数据的, 所以需要把点击事件传给Detail.vue组件
+ 将点击事件通过 this.$emit() 发送出去, 在Detail中接收这个事件
+ 因为购物车中展示的数据与详情页中展示的数据是不一样的
+ 所以我们将需要展示的数据整合到一个product对象中
  - 注意要记得把商品的id也要整合到对象中, 虽然购物车不会展示id, 但是这个是后端判断用户添加了什么商品的唯一标识


### 因为我们要将这个product对象传给购物车组件
+ 所以我们需要Vuex来管理这个公共数据


### 接着详情页的开发
+ 我们在Detail.vue组件中监听了点击加入购物车的事件
+ 并将需要在购物车页面展示的数据整理成一个对象
+ 下载安装vuex
+ 配置好 store/index.js 文件
+ 在Detail.vue中在监听到点击加入购物车事件后将数据对象通过 $state.commit("事件名", 参数列) 传给vuex共享数据对象
  - 注意所有修改共享数据对象 state中的数据只能通过muations中的方法修改

### 在共享数据对象中
+ 在mutation对数据是否重复做出判断, 如果没有重复则, 给数据对象添加一个新的属性count用于记录数量
+ 如果重复了, 则给该商品的数据对象的count属性 +1
``` js
utations : {
  addCart(state, payload) {

    // 在这里我们要判断添加的商品是否重复
    // 如果没有重复, 就给该商品对象添加一个新的属性count 来记录它的数量
    // 如果重复了, 就给该商品的属性count + 1
    // 下面列举三种方法都能够达到目标
    
    // 第一种方法
    // 这个方法的重要点是在 oldProduct = item 这句是浅拷贝
    /* let oldProduct = null
    for (let item of state.productList) {
      if (item.id === payload.id) {
        oldProduct = item
      }
    }

    if (oldProduct) {
      oldProduct.count += 1
    }else {
      payload.count = 1
      state.productList.push(payload)
    } */

    // 第二种方法
    // 通过数组方法 find
    let oldProduct = state.productList.find((item) => {
      return payload.id == item.id
    })

    if (oldProduct) {
      oldProduct.count += 1
    }else {
      payload.count = 1
      state.productList.push(payload)
    }
  }
}
```

### 以上的方法都是写在mutations里面的
+ 但是vue官方推荐, mutations里面只写简单的操作
+ 所以我们将以上的方法写在actions中, 并将最后一步更新state的操作发送给mutations来完成
  - 注意向actions中发送事件不是用commit, 而是用dispatch
``` js
mutations : {
    countAdd(state,payload) {
      payload.count += 1
    },
    addToCart(state,payload) {
      state.productList.push(payload)
    }
  },
  actions : {
    addCart(context, payload) {
      let oldProduct = context.state.productList.find((item) => {
        return payload.id == item.id
      })

      if (oldProduct) {
        context.commit("countAdd", oldProduct)
      }else {
        payload.count = 1
        context.commit("addToCart", payload)
      }
    }
  }
```

### 为了代码的规范化
+ 我们还将vuex中的 mutations, actions, modules 等都分别抽离成各自的js文件
+ 我们还定义了mutations方法常量, 避免方法名过多而导致写错导致的bug

### 购物车页的NavBar
+ 引入 components/common/navbar/NavBar 组件
+ 填充NavBar组件中的center插槽
+ 添加需要的样式

### 购物车页的NavBar中显示商品数量
+ 我们可以用两种方法去达到这个目标
+ 第一种方法:
  - 直接通过 $store.state.productList.length 拿到store共享数据对象中productList数组, 再拿到其length
+ 第二种方法:
  - 在store共享对象中定义getters, 在getters中定义productLength方法, 这个方法也是拿productList数组的长度的
  - 然后再购物车页组件中通过 $store.getters.productLenght 拿到需要的长度
+ 我们发现上面的两种方法代码都不够优雅
+ 所以我们使用了 vuex中的 mapGetters 辅助函数
+ mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
+ 使用方法
  - 定义好getters中的方法
  - 在想要使用的组件中 通过 import { mapGetters } from "vuex" 引入
  - 在组件中的components中 通过 ...mapGetters(["方法名"]) 来将getters中的方法映射到组件中
  - 如果想要更改方法名, 也可以使用对象的方式映射 ...mapGetters({ 新的方法名 : "方法名"})
  - 然后就可以在组件中直接通过mustache语法直接使用到vuex中getters中的方法
``` js
// 使用vuex中getters的辅助函数
// 从vuex中引入mapGetters对象
import { mapGetters } from "vuex";

computed: {
// mapGetters中有两种方法取getters中的方法
// 数组方法
// ...mapGetters(["productLength"]),

// 如果想要给getters中的方法用一个新的名字, 那么就要用对象语法
...mapGetters({
  cartLength: "productLength",
}),
```

### 购物车页面商品的展示
+ 这里创建了productList和productListItem组件
+ 为了购物车商品列表的滚动, 我们还用了better-scroll这个组件
  - 这里用bette-scroll组件同样也出现了商品列表不可以滚动的问题
  - 这里问题的原因是, 在点击添加到购物车按钮后, 将数据传给了productList组件再传给productListItem组件进行渲染展示
  - 但是better-scroll并没有根据新增的商品进行重置高度
  - 所以我们解决这个bug的方法是, 在每次进入到购物车页面的时候给better-scroll重置一下高度
  - 这里的解决难点是在于应该在那里编写或者重置的方法
  - 显然不可以在created和mounted生命周期函数中编写, 因为我们的购物车页面使用了keep-alive保持了状态的, 所以每次离开和进入购物车页面的时候并不会重新创建和销毁这个页面, 所以就不可能进入created和mounted生命周期函数
  - 所以我们是在 activated 函数中调用better-scroll中的refresh方法的, 就是当购物车页面进入活跃的时候重置

### 商品列表checked按钮, 选中和不选中的切换
+ 重点是, 修改这个选中和不选中一定通过修改模型对象来达到修改的效果
+ 我这里用的方法是, 监听checked按钮的点击 -> 将事件传入actions -> 将事件传入mutations -> 修改state中对应的对象数据

### 底部工具栏的封装
+ 这里创建了CartBottomBar组件
+ 这个组件包括了三个部分, 全选按钮, 价格总计, 选中商品的数量总计
+ 其中价格总计和选中的商品数量总计, 都是通过数组方法遍历处理state中的productList数组来完成的

### 底部工具栏全选按钮
+ 因为全选按钮修改的是共享数据对象state的状态, 所以我们也是通过mutations来修改
+ 思路: 监听全选按钮的点击 -> 在组件methods中作判断 -> 将事件传给mutations -> 修改state的状态

### toast组件的基本构造及其封装
+ 在components/common/toast 中封装了一个toast组件
+ 在Detail组件中引用toast组件, 编写用于存储的第三变量
+ 向toast传入必要的参数
+ 然后在Detail中通过控制传入的参数来控制toast组件

### 我们发现这个toast组件是十分常用的
+ 而如果我们像上面的方法使用toast的话很麻烦
+ 所以我们将toast封装成一个插件, 将其挂载在Vue中, 也就是封装成一个全局组件
+ 这样我们就可以随意使用这个toast了

+ toast组件代码
``` html
<template>
  <div class="toast" v-show="isShow">{{ message }}</div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, delay = 2000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, delay);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;

  padding: 8px 10px;
  border-radius: 8px;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>


```

+ components/common/toast/index.js 代码
``` js
import Toast from "./Toast"

const obj = {}

// 如何自己封装一个插件
obj.install = function(Vue) {
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.new的方式, 根据组件构造器, 创造出来一个组件对象
  const toast = new toastContrustor()

  // 3.将组件对象, 手动挂载到某一个元素上
  toast.$mount(document.createElement("div"))

  // 4.toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj
```

+ main.js 代码
``` js
// 引入自己封装的toast插件
import toast from "components/common/toast/index.js"
// 通过Vue.use() 调用 Toast中的install方法
Vue.use(toast)
```

### 个人页面的开发
+ 这个页面只是简单的开发, 并没有实际的交互
+ 主要是因为没有对应的接口
+ 所以这个页面只是一个简单的静态的页面

### 分类页面的开发
+ 这个页面的难点在于各种数据的存放和传输问题
+ 不过这个数据的存放问题我们在首页的开发的时候已经遇到过处理过了
+ 所以这个分类页面只要看源码都能看懂, 我写了很多备注


### 解决移动端300ms延迟
+ 使用fastClick插件
+ 第一步安装这个插件
  - 在项目根目录下命令行输入 npm install fastclick --save
+ 第二步在main.js中导入这个插件
+ 第三步执行插件的 attach 方法

``` js
// main.js 的代码
// 引入fastclick插件
import FastClick from "fastclick"
// 使用fastclick插件
FastClick.attach(document.body)
```

### 使用图片懒加载
+ 什么是图片懒加载
  - 就是当需要这个图片显示的时候, 再加载这个图片
  - 可以节省用户流量
+ 使用:
  - 第一步: 安装vue-lazyload插件
    + 项目目录下命令行输入 npm install vue-lazyload --save
  - 第二步: main.js中引入该插件并通过Vue.use() 调用该插件的install方法
  - 第三步: 在需要使用懒加载的图片标签中的src属性, 改为 v-lazy
+ Vue.use() lazyload的时候还可以附加option, 属性具体功能可以查看GitHub上面的文档

``` js
// 引入图片懒加载模块
import VueLazyLoad from "vue-lazyload"
// 通过Vue.use() 调用图片懒加载模块中的install方法
Vue.use(VueLazyLoad)
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
```

``` html
<ul>
  <li v-for="img in list">
    <img v-lazy="img.src" >
  </li>
</ul>
```

### px2vw CSS单位转换插件
+ 如果我们需要我们的项目页面中的模块大小可以根据视图的大小改变的话
+ 就需要将我们所有的CSS单位由px改为视图单位vw
+ 但是如果我们一个个地改的话是不现实的
+ 所以我们使用postcss-px-to-viewport插件来帮我们达到这个效果
+ postcss-px-to-viewport使用
  - 第一步安装: 在当前项目根目录下命令行输入 npm install postcss-px-to-viewport --save-dev
  - 第二步: 在根目录中创建postcss.config.js 配置文件, 具体的配置可以查看postcss-px-to-viewport的GitHub文档
  - 第三步: 编写需要的配置
  - 第四步: 执行 npm run serve 或者 npm run build
``` js
// 这里是postcss.config.js文件的代码
module.exports = {
  plugins: {
    autoprefixer: {},
	  "postcss-px-to-viewport": {
		  viewportWidth: 375,  // 视窗的宽度，对应的是我们设计稿的宽度.
		  viewportHeight: 667, // 视窗的高度，对应的是我们设计稿的高度.(也可以不配置)
		  unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
		  viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
		  selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 指定不需要转换的类,后面再讲.
		  minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude : [/TabBar/,/NavBar/] // 指定不需要转换的组件, 需要写成正则表达式
	  },
  }
}
```

### 如何将项目部署在服务器上
+ 什么是服务器
  - 服务器本质上就是一台主机
  - 这个主机安装了服务器管理软件
  - 这个主机24小时不关闭
  - 为用户提供服务
+ 一般来说中小型公司都没有自己的服务器, 因为服务器维护成本很高, 一般是租借 阿里云/华为云/腾讯云 这些大公司的服务器
+ 所以我们也可以将自己的电脑安装服务器管理软件
  - 将自己的项目部署在自己的电脑上
+ 我们现在使用的是nginx软件
  - http://nginx.org/en/download.html 官网上下载nginx
  - 解压
  - 双击运行nginx.exe
    + 看到屏幕有闪了一下就启动成功了
+ 在我们的项目目录下命令行输入 npm run build 打包我们的项目
+ 将打包好的dist文件夹放到 刚刚解压好的nginx根文件夹中
+ 我们可以通过修改 nginx/conf/nginx.conf 这个文件中的
``` 
location / {
  root   dist; // 修改这里来改变默认的root目录
  index  index.html index.htm;
}
```
+ 在cmd终端cd到nginx目录 命令行输入 nginx -s reload 来重置一下nginx
+ 在浏览器地址栏输入 loaclhost 就可以看到我们的项目首页了
+ 以上就是将自己的电脑作为服务器 -> window -> nginx(服务器)


