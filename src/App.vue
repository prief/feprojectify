<template>
    <div id='app'>
        <h2>testdev</h2>
        <img src="./assets/logo.png" alt="">
        <router-view />
        <ul>
            <li class="ico ico-s1"></li>
            <li class="ico ico-s2"></li>
            <li class="ico ico-s3"></li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import api from '../mock/api.js'
const a = ''
export default {
    name: 'App',
    // async created(){
    //     // let res = await axios.get(api.userInfo)
    //     console.log(res)
    // }
}
</script>

<style lang='scss'>
/* stylelint-disable  */
@import '~sprite2.scss';

$black : black;
$red : red;

h2{
    font-size: 20px;
    color:$red;
    background: $black;
    transform:rotate(180deg)
}
</style>
