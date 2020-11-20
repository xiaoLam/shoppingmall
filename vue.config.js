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
        'components' : '@/components',
        'common' : '@/common',
        'network' : '@/network',
        'views' : '@/views'
        // 在这里我们不需要配置router文件夹和store文件夹的别名
        // 因为我们在mian.js 中注册过之后, 就可以在全局中通过 this.$router 和 this.$store 获得router对象和store对象
      }
    }
  }
}