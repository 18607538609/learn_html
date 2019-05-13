window.onload = function(){
    var index = 0, // 当前显示图片的索引
        timer = null,  // 定时器
        prev = byId("prev"), // 上一张
        next = byId("next"), // 下一张
        pics = byId("banner").getElementsByTagName('div'),
        dots = byId("dots").getElementsByTagName("span"),
        main = byId("main"),
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


// 鼠标划入main, 停止轮播
 addHandler(main, "mouseover", stopAutoPlay);

// 鼠标离开main, 开启轮播 
addHandler(main, "mouseout", startAutoPlay);

// 自动开启轮播
startAutoPlay();

};

