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
 


