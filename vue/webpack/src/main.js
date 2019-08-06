//这是main.js是我们项目的JS入口文件

//1.导入jquery
//import *** from ***是ES6中导入模块的方式
//由于ES6太高级，浏览器解析不了，这一行会报错
import $ from 'jquery'

$(function(){
    $('li:odd').css('backgroundColor','cyan')
    $('li:even').css('backgroundColor',function(){
        return '#' + 'D97634'
    })
})
//webpack可以处理JS文件的互相依赖关系
//webpack能够处理JS的兼容问题，把高级浏览器不识别的语法转化为低级的，
//浏览器能识别的语法
