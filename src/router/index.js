/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-03-08 21:50:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-09 00:23:05
 */
import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import Home from '@/views/home/Home'
import Login from '@/views/common/Login.vue'
import Screenplay from '@/views/screenplay/Screenplay.vue'
import Rooms from '@/views/screenplay/Room.vue'
import Lhs from '@/views/template/lhs/Index.vue'
import Test from '@/views/test/Test.vue'

Vue.use(Router)

const routers = new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      redirect: '/login',
      children:[
        {
          path: '/login',
          name: 'Login',
          component: Login,
          meta:{needLogin:false}
        },
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta:{needLogin:true}
        },
        {
          path: '/screenplay',
          name: 'screenplay',
          component: Screenplay,
          meta:{needLogin:true}
        },
        {
          path: '/rooms',
          name: 'rooms',
          component: Rooms,
          meta:{needLogin:true}
        },
        {
          path: '/lhs',
          name: 'lhs',
          component: Lhs,
          meta:{needLogin:true}
        },
        {
          path: '/test',
          name: 'test',
          component: Test,
          meta:{needLogin:true}
        }
      ]
    },{
      path: '*',
      redirect: '/login',
    }
  ]
})
routers.beforeEach((to, from, next) => {
  let jubenshaUser = window.localStorage.getItem('jubenshaUser');
  if(to.meta.needLogin){
    if(jubenshaUser){
      next()
    }else{
      next({
        path:'/login',
        // 跳转时传递参数到登录页面，以便登录后可以跳转到对应页面
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next()
  }
})
export default routers;