import Vue from 'vue'
import Router from 'vue-router'
import First from '../pages/First.vue'
import About from '../pages/About.vue'
import Hello from '../pages/Hello.vue'

Vue.use(Router)

export default  new Router({
    mode:"history",
    routes:[
        {
            path:'/',
            component: First
        },
        {
            path:'/hello',
            component: Hello
        },
        {
            path:'/about',
            component:About
        }
    ]
})