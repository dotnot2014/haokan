// 提取HTML中的纯文本
function getHtmlText(html){
      var re1 = new RegExp("<.+?>","g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
      var msg = html.replace(re1,'');    //执行替换成空字符
      return msg;
}

module.exports = {
  getHtmlText: getHtmlText
}
