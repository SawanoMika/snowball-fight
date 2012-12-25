var ua = navigator.userAgent.toLowerCase();  //获取用户端信息
var info = {
    ie:/msie/.test(ua) && !/opera/.test(ua), //匹配IE浏览器
    op:/opera/.test(ua), //匹配Opera浏览器
    sa:/version.*safari/.test(ua), //匹配Safari浏览器
    ch:/chrome/.test(ua), //匹配Chrome浏览器
    ff:/gecko/.test(ua) && !/webkit/.test(ua)   //匹配Firefox浏览器
};
if (info.ie || info.op || info.sa) {
    window.location = "/static/unsupport.html";
}

if (!Modernizr.canvas) {
    window.location = "/static/unsupport.html";
}