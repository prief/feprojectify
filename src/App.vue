<template>
    <div id='app'>
        <h2>test</h2>
        <img src="./assets/logo.png" alt="">
        <router-view />
    </div>
</template>

<script>
import axios from 'axios'
import api from '../mock/api.js'
export default {
    name: 'App',
    async created(){
        let res = await axios.get(api.userInfo)
        console.log(res)
    }
}
</script>

<style lang='scss'>
$black : black;
$red : red;

h2{
    font-size: 20px;
    color:$red;
    background: $black;
    transform:rotate(180deg)
}
</style>
