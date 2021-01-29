import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Main from '@/components/main'
import Xtgl from '@/components/xtgl'
import Zxle from '@/components/zxle'
import Zxcs from '@/components/zxcs'
import Yhgl from '@/components/yhgl'
import XtInfo from '@/components/info'
import XtZj from '@/components/zjman'
import Xttx from '@/components/txman'
import Xtskim from '@/components/stskim'
import XtInput from '@/components/xtInput'
import XtTestPro from '@/components/testPro'
import SjTestMan from '@/components/testMan'
import CreateTest from '@/components/createTest'
import SkimTest from '@/components/skimTest'
import TestSet from '@/components/testSet'
import TitleDisplay from '@/components/titleDisplay'
import UserMan from '@/components/userMan'
import AddUser from '@/components/addUser'
import OnlineTestSet from '@/components/onlineTestSet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/bsmMain',
      name: 'bsmMain',
      component: Main,
      meta:{
        requireAuth:true // true为这个页面需要登录权限
      }
    },
    {
      path: '/xtgl',
      name: 'xtgl',
      component: Xtgl,
      redirect: '/info', // 设置右边栏默认显示内容
      children: [
        {
          path: '/info',
          name: 'info',
          component: XtInfo,
          meta:{
            requireAuth:true // true为这个页面需要登录权限
          }
        },
        {
          path: '/txman',
          name: 'txman',
          component: Xttx,
          meta:{
            requireAuth:true // true为这个页面需要登录权限
          }
        },
        {
          path: '/zjman',
          name: 'zjman',
          component: XtZj,
          meta:{
            requireAuth:true // true为这个页面需要登录权限
          }
        },
        {
          path: '/stskim',
          name: 'stskim',
          component: Xtskim,
          meta:{
            requireAuth:true // true为这个页面需要登录权限
          }
        },
        {
          path: '/xtInput',
          name: 'xtinput',
          component: XtInput,
          meta:{
            requireAuth:true // true为这个页面需要登录权限
          }
        },
        {
          path: '/xtTestPro',
          name: 'testPro',
          component: XtTestPro,
          redirect: '/createTest',
          children: [
            {
              path: '/createTest',
              name: 'skimcreateTestTest',
              component: CreateTest,
              meta:{
                requireAuth:true // true为这个页面需要登录权限
              }
            },
            {
              path: '/skimTest',
              name: 'skimTest',
              component: SkimTest,
              redirect: '/testSet',
              children: [
                {
                  path: '/testSet',
                  name: 'testTest',
                  component: TestSet,
                  meta:{
                    requireAuth:true // true为这个页面需要登录权限
                  }
                },
                {
                  path: '/titleDisplay',
                  name: 'titleDisplay',
                  component: TitleDisplay,
                  meta:{
                    requireAuth:true // true为这个页面需要登录权限
                  }
                }
              ]
            }
          ]
        },
        {
          path: '/sjTestMan',
          name: 'testMan',
          component: SjTestMan,
          meta:{
            requireAuth:true // true为这个页面需要登录权限
          }
        },
        {
          path: '/onlineTestSet',
          name: 'onlineTestSet',
          component: OnlineTestSet,
          meta:{
            requireAuth:true // true为这个页面需要登录权限
          }
        }
      ]
    },
    {
      path: '/zxle',
      name: 'zxle',
      component: Zxle,
      meta:{
        requireAuth:true // true为这个页面需要登录权限
      }
    },
    {
      path: '/zxcs',
      name: 'zxcs',
      component: Zxcs,
      meta:{
        requireAuth:true // true为这个页面需要登录权限
      }
    },
    {
      path: '/yhgl',
      name: 'yhgl',
      component: Yhgl,
      redirect: '/userMan',
      children: [
        {
          path: '/userMan',
          name: 'userMan',
          component: UserMan,
          meta:{
            requireAuth:true // true为这个页面需要登录权限
          }
        },
        {
          path: '/addUser',
          name: 'addUser',
          component: AddUser,
          meta:{
            requireAuth:true // true为这个页面需要登录权限
          }
        }
      ]
    }
  ]
})
