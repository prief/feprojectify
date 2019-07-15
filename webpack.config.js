const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development',
    entry:{
        app:'./src/app.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    devtool:'eval-source-map',
    devServer:{
        contentBase: path.join(__dirname,'dist'),
        port:55555,
        hot:true,
        proxy:{
            '/api':'http://localhost:55556'
        }
    },
    module :{
        rules:[
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                    'babel-loader'
                ]
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:8092,
                            name:'img/[hash:9].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:8092,
                            name:'media/[hash:9].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:8092,
                            name:'font/[hash:9].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}