const express = require('express')
const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')
const config = require('./config.js')
const Mock = require('mockjs')
const multipartMiddleware = multiparty()
const app = express()

const mock = (data,params)=>{
    if(Object.prototype.toString.call(data)== '[object Object]'){
        return Mock.mock(data)
    }else if(typeof data === 'function'){
        return Mock.mock(data(params))
    }else{
        return 'data error'
    }
}

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

config.forEach(({method,url,data})=>{
    if(method ==='get'){
        app.get(url,(req,res)=>{
            res.json(mock(data,req.query))
        })
    }else if(method ==='post'){
        app.post(url,multipartMiddleware,(req,res)=>{
            res.json(mock(data,req.body))
        })
    }else if(method ==='jsonp'){
        app.get(url,(req,res)=>{
            const query = req.query
            const mockData = JSON.stringify(mock(data,req.query))
            const cb = "typeof " + query.callback + ' ==="function" && '+query.callback+'('+ mockData +')'

            res.send(cb)
        })
    }
})

let port = 55556
process.argv.forEach((arg,index,arr)=>{
    if(arg === '--port'){
        port = arr[index+1] || 55556;
        return false
    }
})

module.exports = app.listen(port,()=>{
    console.log("mockServer listenning on http://localhost:"+ port)
})