import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// let p = new Promise(function(res,rej){ /* eslint-disable-line */
//     setTimeout(()=>{
//         res('done')
//     },2000)
// })
// p.then(res=>{
//     console.log(res)
// })
import print from './print.js';
print();



if(module.hot){
    module.hot.accept('./print.js',function(){
        console.log('HMRHMRHMR...');
        print();
    })
}

console.log('--watch')

new Vue({
    el: '#app',
    router,
    render : h => h(App)
})