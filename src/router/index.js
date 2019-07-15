import Vue from 'vue'
import Router from 'vue-router'
import First from '../pages/First.vue'
import About from '../pages/About.vue'

Vue.use(Router)

export default  new Router({
    routes:[
        {
            path:'/',
            component:First
        },
        {
            path:'/about',
            component:About
        }
    ]
})