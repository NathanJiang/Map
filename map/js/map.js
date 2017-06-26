var jumpurl;
window.onload =function () {
    var R = Raphael("map", 600, 500);
	//调用绘制地图方法
    paintMap(R);
	
	var textAttr = {
        self: this, 
        "fill": "#000",
        "font-size": "10px",
        "cursor": "pointer"
    }; 
    for (var state in china) {
		china[state]['path'].color = Raphael.getColor(0.9);
				
        (function (st, state) {
			
			//获取当前图形的中心坐标
            var xx = st.getBBox().x + (st.getBBox().width / 2);
            var yy = st.getBBox().y + (st.getBBox().height / 2);

            //***修改部分地图文字偏移坐标
            switch (china[state]['name']) {
                case "江苏":
                    xx += 5;
                    yy -= 10;
                    break;
                case "海南":
                    xx -= 15;
                    yy -= 10;
                    break;                    
                case "北京":
                    xx += 5;
                    yy -= 10;
                    break;                    
                 case "江西":
                    xx -= 3;
                    yy -= 10;
                    break;
                case "河北":
                    xx -= 10;
                    yy += 20;
                    break;
                case "天津":
                    xx += 20;
                    yy += 5;
                    break;
                case "上海":
                    xx += 20;
                    break;
                case "广东":
                    yy -= 10;
                    break;
                case "澳门":
                    yy += 10;
                    break;
                case "香港":
                    xx += 20;
                    yy += 5;
                    break;
                case "甘肃":
                    xx -= 40;
                    yy -= 30;
                    break;
                case "陕西":
                    xx += 5;
                    yy += 10;
                    break;
                case "内蒙古":
                    xx -= 15;
                    yy += 65;
                    break;
                default:
            }
			//写入文字
			china[state]['text'] = R.text(xx, yy, china[state]['name']).attr(textAttr);

            st[0].onclick = function () {
                st.animate({fill: st.color, stroke: "#eee"}, 500);
                china[state]['text'].toFront();
                var str=china[state]['name'];
               /* OpenDiv(500,300,'./do.php',str);*/
                xmlHttp=GetXmlHttpObject();
                if (xmlHttp==null){
                     alert ("浏览器不支持异步加载请求。。。");
                     return;
                }
                var url="./map/search.php?q="+str;
                xmlHttp.open("GET",url,true);
                xmlHttp.send(null);
                xmlHttp.onreadystatechange=stateChanged;
            };

			st[0].onmouseover = function () {
                st.animate({fill: st.color, stroke: "#eee"}, 300);
				china[state]['text'].toFront();
                
            };
            st[0].onmouseout = function () {
                st.animate({fill: "#97d6f5", stroke: "#eee"}, 300);
				china[state]['text'].toFront();
                
            };

         })(china[state]['path'], state);
    }
}

function GetXmlHttpObject(){
    var xmlHttp=null;
    try{
         // Firefox, Opera 8.0+, Safari
         xmlHttp=new XMLHttpRequest();
     }
    catch (e){
     //Internet Explorer
         try{
             xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
         }
         catch (e){
             xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
         }
    }
    return xmlHttp;
}

function getHref(obj){
    jumpurl=obj.getAttribute('href');
}

function stateChanged(){
    if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var data=xmlHttp.responseText;
        var result="";
        /*result='<div id="pagewrap" class="pagewrap">';
        result=result+'<div class="container show" id="page-1">';
        data=eval(data);*/
        if(data=="null"){
            var index=Math.floor(Math.random()*13)+1;
            result="<img class='no_img' src=./map/images/"+index+".jpg  />"
            result=result+"<p class='no_tip'>抱歉，小智还没有将本省的学校录入。。。</p>";
        }
        else{
            data = JSON.parse(data);
            for(var i=0;i<data.length;i++){
                result=result+"<div class='school_box'><div class='pageload-link' onclick='getHref(this)' href="+data[i].url+" ><img class='back_img'  src="+data[i].image+" /><img class='front_img'  src="+data[i].logourl+" /></div></div>";
            }

        }

        document.getElementById("Hint").innerHTML=result;
        /* 动态载入js */
        var js = document.createElement("script");
        document.getElementsByTagName("head")[0].appendChild(js);
        js.src = './map/js/animation.js';

        (function() {
            var pageWrap = document.getElementById( 'pagewrap' ),
                pages = [].slice.call( pageWrap.querySelectorAll( 'a.container' ) ),
                currentPage = 0,
                triggerLoading = [].slice.call( pageWrap.querySelectorAll( 'div.pageload-link' ) ),
                loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 300, speedOut : 600, easingIn : mina.easeinout, easingOut : mina.bounce } );
            function init() {
                triggerLoading.forEach( function( trigger ) {
                    trigger.addEventListener( 'click', function( ev ) {
                        ev.preventDefault();
                        document.body.style.background="#4fc3f7";
                        loader.show();
                        setTimeout( function() {
                            self.location=jumpurl; 
                        }, 1000 );
                    } );
                } );    
            }
            init();
        })();
    } 
}

/*
function getElementsByClassName(node, classname) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}*/