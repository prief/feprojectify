const api = require('./api.js')
module.exports = [
    {
        method:'get',
        url: api.userInfo,
        data: require('./data/userInfo.js')
    }
]