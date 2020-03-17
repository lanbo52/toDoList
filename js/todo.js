// 获取文本框
var type_box = document.querySelector(".type_box");
// 文本框聚焦时去掉提示文字
type_box.addEventListener("focus", function() {
  this.removeAttribute("placeholder");
});
// 文本框失焦时恢复提示文字
type_box.addEventListener("blur", function() {
  this.setAttribute("placeholder", "添加您的ToDo...");
});

// 获取ul
var undone = document.querySelector(".undone");

// 输入或未输入文字按回车键的结果
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    if (type_box.value != "") {
      // 创建一个新的"li"
      var new_li = document.createElement("li");
      // 把新的"li"添加到ul
      undone.appendChild(new_li);
      // 给这个新的li赋值，赋的值是文本框输入的文字
      new_li.innerHTML = type_box.value + "<a href='javascript:;'>删除</a>";
      type_box.value = "";
      //   删除代办
      var as = document.querySelectorAll("a");
      for (var i = 0; i < as.length; i++) {
        as[i].addEventListener("click", function() {
          undone.removeChild(this.parentNode);
        });
      }
    } else {
      alert("您还没有输入任何文字哦!");
    }
  }
});
// 点击当前未完成列表，添加到已完成
var done = document.querySelector(".done");
// 因为这里的li是新增的动态标签，所以不能直接添加事件，需要委托事件给非动态父级
undone.addEventListener("click", function(e) {
  // 这里对点击的标签类型进行判断，防止点击a里面的删除，把删除文本也添加到下面的已完成列表
  if (e.target.nodeName == "LI") {
    var lis_inner = e.target.innerHTML;
    var done_li = document.createElement("li");
    done.appendChild(done_li);
    done_li.innerHTML = lis_inner;
    undone.removeChild(e.target);
  }
});

done.addEventListener("click", function(e) {
  if (e.target.nodeName == "LI") {
    var li_rev = e.target
    undone.insertBefore(li_rev, undone.children[0]);
  } else {
    done.removeChild(e.target.parentNode);
  }
});
