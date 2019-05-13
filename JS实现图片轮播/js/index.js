window.onload = function(){
    var index = 0;


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


function byId(id){
    return typeof(id) ==="string"?document.getElementById(id):id;
}
};

