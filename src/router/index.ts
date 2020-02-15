import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes: any[] = []
// 获取该目录下所有路由文件
const requireRouter = require.context('../views', true, /\.ts$/)

// 将对应路由对象保存到routes数组中
for (const key of requireRouter.keys()) {
  routes.push(requireRouter(key).default)
}

const router = new VueRouter({
  routes: [
    ...routes,
    {
      path: '*',
      name: 'not-found',
      component: () => import('@/views/not-found/index.vue')
    }
  ]
})

export default router
