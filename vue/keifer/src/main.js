



import $ from  'jquery'


import  './css/index.css'
//1安装 cnpm i style-loader css-loader -D
//2打开webpack.config.js配置文件,在里面新增一个配置节点
//叫做module,是一个对象，在这个module对象身上,有个rules
//属性，这个数组存放了所有第三方文件匹配和处理规则

import './css/index.less'
//cnpm i less
//cnpm i less-loader -D

import  './css/index.scss'
//cnpm i sass-loader -D
//cnpm i node-sass -D
// 不写 node_modules 这一层目录 ，默认 就会去 node_modules 中查找
import 'bootstrap/dist/css/bootstrap.css'


$(function(){
    $('li:odd').css('backgroundColor','blue')
    $('li:even').css('backgroundColor',function(){
        return '#'+'D97634'
    })
})

//注意:webpack处理第三方文件类型的过程
//1发现这个文件不是JS文件，然后去配置文件中，
//查找有没有对应的第三方loader规则
//2找到，调用对应loader处理这种文件类型
//3调用loader从后往前调用
//4直接交给webpack打包输出到bundle.js中去
