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
import XtTestMan from '@/components/testMan'
import CreateTest from '@/components/createTest'
import SkimTest from '@/components/skimTest'
import TestSet from '@/components/testSet'
import TitleDisplay from '@/components/titleDisplay'
import UserMan from '@/components/userMan'
import AddUser from '@/components/addUser'

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
      component: Main
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
          component: XtInfo
        },
        {
          path: '/txman',
          name: 'txman',
          component: Xttx
        },
        {
          path: '/zjman',
          name: 'zjman',
          component: XtZj
        },
        {
          path: '/stskim',
          name: 'stskim',
          component: Xtskim
        },
        {
          path: '/xtInput',
          name: 'xtinput',
          component: XtInput
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
              component: CreateTest
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
                  component: TestSet
                },
                {
                  path: '/titleDisplay',
                  name: 'titleDisplay',
                  component: TitleDisplay
                }
              ]
            }
          ]
        },
        {
          path: '/xtTestMan',
          name: 'testMan',
          component: XtTestMan
        }
      ]
    },
    {
      path: '/zxle',
      name: 'zxle',
      component: Zxle
    },
    {
      path: '/zxcs',
      name: 'zxcs',
      component: Zxcs
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
          component: UserMan
        },
        {
          path: '/addUser',
          name: 'addUser',
          component: AddUser
        }
      ]
    }
  ]
})
