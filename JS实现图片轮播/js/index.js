window.onload = function(){
    var index = 0, // 当前显示图片的索引
        timer = null,  // 定时器
        prev = byId("prev"), // 上一张
        next = byId("next"), // 下一张
        pics = byId("banner").getElementsByTagName('div'),
        dots = byId("dots").getElementsByTagName("span"),
        main = byId("main"),
        banner = byId("banner"),
        menuContent = byId("menu-content"),
        menuItems = menuContent.getElementsByClassName("menu-item"),
        subMenu = byId("sub-menu"),
        innerBox = subMenu.getElementsByClassName("inner-box"),
        picLen = pics.length;
        // console.log(picLen); //3
        
        // console.log(dots);
        
        
// 添加事件兼容性
function addHandler(element, type, handler){
    if (element.addEventListener){
        element.addEventListener(type, handler, true);
    }else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    }else {
        element['on' + type] = handler;
    }
};


// 清除定时器, 停止自动轮播
function stopAutoPlay() {
    if (timer) {
        clearInterval(timer);
    }
}

// 开启自动轮播
function startAutoPlay(){
    timer = setInterval(function(){
        index++;
        if (index >= picLen) index = 0;
        // console.log(index);
        changeImage();
        
    }, 3000)
};


function changeImage(){
    // 遍历所有图片, 将图片隐藏, 将圆点上的类清除
    for(var i=0; i<picLen; i++){
        pics[i].style.display = "none";
        dots[i].className = "";
    };
    // 显示当前图片
    pics[index].style.display = "block";
    // 当前圆点高亮显示
    dots[index].className = "active";
}


function byId(id){
    return typeof(id) ==="string"?document.getElementById(id):id;
}

// 点击下一张按钮显示下一张
addHandler(next, "click", function(){
    index++;
    if (index >= picLen)  index = 0;
    changeImage();
    // console.log(index);
    // pics[0].style.display = "none";

    // for(var i=0; i<picLen; i++){
    //     pics[i].style.display = "none";
    //     dots[i].className = "";
    // };
    // pics[index].style.display = "block";
    // dots[index].className = "active";
    
})

// 点击上一张图片显示上一张
addHandler(prev, "click", function(){
    index--;
    if (index < 0) index = picLen -1;
    // console.log(index);
    changeImage();
    // for(var i = 0; i < picLen; i++){
    //     pics[i].style.display = "none";
    //     dots[i].className = "";
    // }

    // pics[index].style.display = "block";
    // dots[index].className = "active";
})

// 点击圆点索引切换图片
for(var i = 0; i < picLen; i++){
    dots[i].setAttribute("data-id", i);
    addHandler(dots[i], "click", function () { 
        // console.log(i); // 作用域的问题 i的结果始终 3
        // alert(this.id);
        // alert(this.getAttribute("data-id"));
        index = this.getAttribute("data-id");
        // alert(index);
        changeImage();
     });
}


// 鼠标滑过主菜单
for(var i = 0, idx; i<menuItems.length; i++){
    // 给所有主菜单定义属性, 标明它的索引
    menuItems[i].setAttribute("data-index", i);
    addHandler(menuItems[i], "mouseover", function(){
        // console.log(i);
        // 显示子菜单所在的背景
        subMenu.className = "sub-menu";
        
        // 获取当前主菜单的索引
        idx = this.getAttribute("data-index");
        // alert(idx);
        // 遍历所有子菜单innerBox, 将其隐藏
        for(var i = 0; i < innerBox.length; i++){
            innerBox[i].style.display = "none";

            // 所有主菜单样式恢复原样(取消背景)
            menuItems[i].style.background = "none";
        }

        // 找到当前子菜单让其显示出来
        innerBox[idx].style.display = "block";

        // 给鼠标滑过的主菜单设置透明背景样式
        menuItems[idx].style.background = "rgba(0, 0, 0, .1)";


    })
};

// 鼠标离开banner隐藏子菜单
addHandler(banner, "mouseout", function(){
    // alert("m")
    subMenu.className = "sub-menu hide";
});

// 鼠标离开主菜单menuContent隐藏子菜单
addHandler(menuContent, "mouseout", function(){
    subMenu.className = "sub-menu hide";
});

// 鼠标滑入子菜单, 子菜单显示
addHandler(subMenu, "mouseover", function(){
    this.className = "sub-menu";
});

// 鼠标离开子菜单, 子菜单隐藏
addHandler(subMenu, "mouseout", function(){
    this.className = "sub-menu hide";
});

// 鼠标划入main, 停止轮播
 addHandler(main, "mouseover", stopAutoPlay);

// 鼠标离开main, 开启轮播 
addHandler(main, "mouseout", startAutoPlay);

// 自动开启轮播
startAutoPlay();
};

