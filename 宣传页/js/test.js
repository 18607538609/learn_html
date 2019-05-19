
var screenAnimateElements = {
    ".screen-1": [
        ".screen-1__heading",
        ".screen-1__phone",
        ".screen-1__shadow"
    ]
};

function setScreenAnimate(screenCls) {
    var screen = document.querySelector(screenCls); // 获取当前屏的元素
    // alert(screen);
    var animateElements = screenAnimateElements[screenCls]; // 需要设置动画的元素
    // alert(animateElements);
    var isSetAnimateClass = false; //是否有初始化子元素的样式
    var isAnimateDone = false; //当前屏幕下所有子元素的状态是Done?

    screen.onclick =  function(){
        // alert("m");
          // 初始化样式, 增加init A A_init
          if(isSetAnimateClass === false){
            //   alert(1);
                for(var i = 0, len =animateElements.length ; i < len; i++) {
                    var element = document.querySelector(animateElements[i]);
                    // alert(element);

                    var baseCls = element.getAttribute("class");
                    // alert(baseCls);

                    element.setAttribute("class", baseCls + " " + animateElements[i].substr(1) + "_animate_init");
                    isSetAnimateClass = true;
                    return;
            }
        }

        // 切换所有 animateElements 的 init -> done A A_done
        if(isAnimateDone === false){
            for(var i = 0, len = animateElements.length; i < len; i++){
                var element = document.querySelector(animateElements[i]);
                baseCls = element.getAttribute("class");
                element.setAttribute("class", baseCls.replace("_animate_init", "_animate_done"));
            }
            isAnimateDone = true;
            return;
        }

        // 切换所有 animateElements 的 done -> init A A_init
        if(isAnimateDone === true){
            for(var i = 0, len = animateElements.length; i< len; i++)
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute("class");
                element.setAttribute("calss", baseCls.replace("_animate_done", "_animate_init"))
        }
        isAnimateDone = false;
        return
    }
}

setScreenAnimate(".screen-1")