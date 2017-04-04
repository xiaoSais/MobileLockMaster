/**
 * Created by szs on 2017/3/28.
 */

    //获取标号为 0-8 的触摸点的中心坐标
    function coordinateGet() {
        var screen_width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth,
           screen_height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight,
                  center = [];
        for (var j=0; j<=2; j++) {
            for (var k=0; k<=2; k++) {
                var coord = {
                    x: screen_width / 2 + (k-1) * 94 ,
                    y: (screen_height -50) * (1+ 2 * j) / 6
                };
                center.push(coord);
            }
        }
        return center;
    }

    //直线判断函数,这里有四种直线类型
    function lineJudgement(touchArray) {
        var parameter=[];
        var c = coordinateGet();
        if (touchArray.length > 1) {
            var lastItem = touchArray[touchArray.length-1],
                 perItem = touchArray[touchArray.length-2],
                    adcX = c[lastItem].x - c[perItem].x,
                    adcY = c[lastItem].y - c[perItem].y;
          parameter.long = Math.sqrt(Math.pow(adcX,2)+Math.pow(adcY,2));

            //两点的纵坐标相同，此时只需要画一条横线
            if (adcY === 0) {
                parameter.type = 0;
                parameter.beginy = c[lastItem].y;
                adcX >= 0 ? parameter.beginx = c[perItem].x : parameter.beginx = c[lastItem].x;
            }

            //两点的横坐标相同，此时只需要画一条竖线
            else if (adcX === 0) {
                parameter.type = 1;
                parameter.beginx = c[lastItem].x;
                adcY >= 0 ? parameter.beginy = c[perItem].y : parameter.beginy = c[lastItem].y;
            }

            //斜率为正的时候画斜线
            else if ((adcX > 0 && adcY > 0) || (adcX < 0 && adcY < 0)) {
                var point;
                parameter.type = 2;
                if (adcX > 0) {
                     point = perItem;
                }
                else {
                     point = lastItem;
                }
                parameter.reg = Math.atan2(Math.abs(adcY),Math.abs(adcX)) * 180 / Math.PI;
                parameter.beginx = c[point].x;
                parameter.beginy = c[point].y;
            }

            //斜率为负的时候画斜线
            else {
                var point1;
                parameter.type = 3;
                if (adcX > 0) {
                    point1 = lastItem;
                }
                else {
                    point1 = perItem;
                }
                parameter.reg = Math.atan2(Math.abs(adcX),Math.abs(adcY)) * 180 / Math.PI;
                parameter.beginx = c[point1].x;
                parameter.beginy = c[point1].y;
            }
        }
       return parameter;
    }

    //画直线函数,有五个参数：直线类型、直线开始横坐标和纵坐标、以及直线长度、旋转角度
    function lineDraw(type,beginx,beginy,long,reg){

            //创建子节点
            var node = document.createElement("div");
            node.className = "line";
            node.style.width = long + "px";
            node.style.height = "5px";
            node.style.left = beginx + "px";
            node.style.top = beginy + "px";

            //根据不同的直线样式采用不同的绘制方式
            if (type == 0) {
                document.getElementById("show").appendChild(node);
            }

            else if (type == 1) {
                node.style.transform = "rotate(90deg)";
                node.style.webkitTransform = "rotate(90deg)";
                node.style.mozTransform = "rotate(90deg)";
                node.style.oTransform = "rotate(90deg)";
                node.style.webkitTransformOrigin = "left top";
                node.style.mozTransformOrigin = "left top";
                node.style.oTransformOrigin = "left top";
                document.getElementById("show").appendChild(node);
            }

            else if (type == 2 ) {
                node.style.transform = "rotate" + "(" + reg + "deg" + ")";
                node.style.webkitTransform = "rotate" + "("+ reg+ "deg" + ")";
                node.style.mozTransform = "rotate" + "(" + reg + "deg" + ")";
                node.style.oTransform = "rotate" + "(" + reg + "deg" + ")";
                node.style.webkitTransformOrigin = "left top";
                node.style.mozTransformOrigin = "left top";
                node.style.oTransformOrigin = "left top";
                document.getElementById("show").appendChild(node);
            }

            else {
                var q = 90 + reg;
                node.style.transform = "rotate" + "(" + q+ "deg" + ")";
                node.style.webkitTransform = "rotate" + "(" + q + "deg" + ")";
                node.style.mozTransform = "rotate" + "(" + q + "deg" + ")";
                node.style.oTransform = "rotate" + "(" + q + "deg" + ")";
                node.style.webkitTransformOrigin = "left top";
                node.style.mozTransformOrigin = "left top";
                node.style.oTransformOrigin = "left top";
                document.getElementById("show").appendChild(node);
            }
    }

    //passward 用来保存输入的密码
    var passward = [];

    //判断当前触摸的位置是否在触摸点内
    function isInDot(target) {
        var brr = coordinateGet();
        var px, py, dis,
            targetx = target.pageX,
            targety = target.pageY;
        for (var i = 0; i < 9; i++) {
            px = Math.pow((brr[i].x - targetx), 2);
            py = Math.pow((brr[i].y - targety), 2);
            dis = Math.sqrt((px + py));

            //当触摸位置与触摸点的距离小于 30 时，当前触摸位置在触摸点内
            if (dis <= 30) {

                //改变当前触摸点的样式
                 document.getElementById("dot"+i).style.border = "2px lawngreen solid";
                 document.getElementById("dot"+i).style.background = "#FFA726";

                 //将该触摸点的索引存入passward当中
                 passward.push(i);

                 //去除邻近相同的索引
                if (passward.length > 1) {
                    if (passward[passward.length-1] == passward[passward.length-2]){
                        passward.pop(i);
                    }

                    else {
                        var tem = lineJudgement(passward);
                        lineDraw(tem.type,tem.beginx,tem.beginy,tem.long,tem.reg);
                    }
                }
            }
        }

    }

    //事件激活函数
    function istouchstart(event) {
        var touches = event.targetTouches;
        var targets = event.touches;
        if (targets.length === 1) {
            isInDot(targets[0]);
        }
    }

    //移除子节点，以及子节点样式
    function removeChild() {
        var child = document.getElementsByClassName("line");
        for (var j = 0; j <= 8; j++) {
            document.getElementById("dot"+j).style.border="2px solid #FFA726";
            document.getElementById("dot"+j).style.background="#F0F0F2";
        }
        for(var i = 0, len = child.length; i < len; i++) {
            document.getElementById("show").removeChild(child[0]);
        }
    }

    //重置函数，密码清空，子节点移除，以及事件重新监听
    function reSet() {
        removeChild();
        passward = [];
        document.addEventListener('touchmove', istouchstart, false);
        document.addEventListener('touchend', isTouched, false);
    }

    //手指移开屏幕时触发的函数

    function isTouched() {
        var x = document.getElementById("czmm");
        var passJoin = passward.join("_");
        if (x.checked) {

            if (passward.length < 5) {
                document.getElementById("datail").innerHTML = "密码太短，至少需要五个点";
                localStorage.removeItem("localkey");
                reSet();
            }

            else if (localStorage.localkey == null) {
                document.getElementById("datail").innerHTML = "请再一次输入密码";
                localStorage.localkey = passJoin;
                reSet();
             }

            else if(localStorage.localkey === passJoin) {
                document.getElementById("datail").innerHTML = "密码重设成功";
                removeChild();
                document.addEventListener('touchmove', istouchstart, false);
                document.addEventListener('touchend', isTouched, false);
            }

            else {
                    localStorage.removeItem("localkey");
                    document.getElementById("datail").innerHTML = "两次密码输入不一致";
                    reSet();
            }
        }
        else if (localStorage.localkey === passJoin){
                    document.getElementById("datail").innerHTML = "密码验证成功";
                    reSet();
        }

        else {
                document.getElementById("datail").innerHTML = "密码验证失败";
                reSet();
         }
    }



    //页面加载时候进行touch事件监听
    window.onload=function () {
        localStorage.removeItem("localkey");
        document.getElementById("datail").innerHTML="请输入手势密码";
        document.addEventListener('touchmove', istouchstart, false);
        document.addEventListener('touchend', isTouched, false);
    };
