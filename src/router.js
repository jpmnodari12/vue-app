import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Dispositivos from './views/Dispositivos.vue'


Vue.use(Router)

//Configurando rotas da aplicação
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      meta: { title: 'Dashboard' },
      component: Dashboard
    },
    {
      path: '/dispositivos',
      name: 'dispositivos',
      meta: { title: 'Dispositivos' },
      component: Dispositivos
    },
    {
      name: 'Login',
      path: '/login',
      meta: { title: 'Login' },
      component: () => import(/* webpackChunkName: "login" */ './pages/login/Login')
    },
    {
      name: 'Register',
      path: '/register',
      meta: { title: 'Register' },
      component: () => import(/* webpackChunkName: "register" */ './pages/register/Register')
    }
  ]
})

router.beforeEach((to, from, next) => {
  //Coloca no titulo o expenses
  document.title = `${to.meta.title} - Iot`

  //verifica o componente do estado atual da aplicação e se está logado, toma decisão de roteamento baseado nisso
  if (!window.uid && to.name !== 'Login' && to.name !== 'Register') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
