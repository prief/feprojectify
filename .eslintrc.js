module.exports = {
    env:{
        browser:true,
        node:true,
        es6:true,
    },
    extends:['eslint:recommended','plugin:vue/essential'],
    plugins:['vue'],
    parserOptions:{
        parser:'babel-eslint',
        sourceType:'module'
    },
    rules:{}
}