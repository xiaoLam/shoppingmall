import Vue from "vue"
import VueRouter from "vue-router"

// 通过懒加载的方式导入模块
const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Profile = () => import("views/profile/Profile")
const Detail = () => import("views/detail/Detail")

Vue.use(VueRouter)

const routes = [
  {
    path : "",
    redirect : "/home"
  },
  {
    path : "/home",
    component : Home
  },
  {
    path : "/category",
    component : Category
  },
  {
    path : "/cart",
    component : Cart
  },
  {
    path : "/profile",
    component : Profile
  },
  {
    // 设置详情页映射关系, 通过动态路由
    path : "/detail/:iid",
    component : Detail
  }
]

const router = new  VueRouter({
  routes,
  mode: "history"
})

export default router