import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {{#each list}}
    {
      path: '/{{name}}',
      name: '{{name}}',
      component: (resolve) => require(['@/pages/{{name}}'], resolve)
    },
    {{/each}}
  ]
})
