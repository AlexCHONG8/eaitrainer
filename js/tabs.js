// 标签页切换功能
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  
  // 隐藏所有标签内容
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // 移除所有标签按钮的"active"类
  tablinks = document.getElementsByClassName("tab-button");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  // 显示当前标签内容并添加"active"类到按钮
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// 默认打开第一个标签
document.addEventListener("DOMContentLoaded", function() {
  const firstTab = document.getElementsByClassName("tab-button")[0];
  if (firstTab) {
    firstTab.click();
  }
});