/*
 	1.mouseenter(不兼容)判断鼠标移入时候的位置(x,y)
	2.把移入的正方形当成圆形，并计算鼠标位置和圆心位置关系(Math.atan2)
	3.把弧度转换成角度，分成4个象限，求出鼠标移入时候的象限
	4.把需要移入的遮罩层(绝对定位)定位到需要的象限那里
	5.通过运动函数让其覆盖到方框中间。
	6.移出同理
	
	缺点：只判断了正方形
	兼容没做，思路可行
 * */

/*
 * obj1监控对象
 * obj2将要移入的对象
 * obj1的宽度，
 * obj1的高度
 * 移出的时候是否有动画
 * */
function mouse(obj1,obj2,width,height,flag){
	obj1.onmouseenter = function(ev){
		var oEvent = ev||event;
		var q=getMousePos(this,oEvent);
		switch(q){
			case 0:
				obj2.style.left = width+'px';
				obj2.style.top='0';			
			break;
			case 1:
				obj2.style.left='0'
				obj2.style.top = height+'px';		
			break;
			case 2:
				obj2.style.left = -width+'px';
				obj2.style.top='0';		
			break;
			case 3:
				obj2.style.left='0'
				obj2.style.top= -height+'px';		
			break;
		}
		move(obj2,{left:0,top:0})
	};
	obj1.onmouseleave = function(ev){
		var oEvent = ev||event;
		var q=getMousePos(this,oEvent);
		switch(q){
			case 0:
				move(obj2,{left:width,top:0})
			break;
			case 1:
				move(obj2,{left:0,top:height})
			break;
			case 2:
				move(obj2,{left:-width,top:0})
			break;
			case 3:
				move(obj2,{left:0,top:-height})
			break;
		}
	}
	
	/* 获取进入方向*/
	function getMousePos(obj,ev){
		var w = obj.offsetWidth;
		var h = obj.offsetHeight;
		var x = obj.offsetLeft+w/2-ev.pageX;
		var y = obj.offsetTop+h/2-ev.pageY;
		return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
	};
	
	/* */
	function move(obj,json){
		var start={};
		var dis={};
		for(var name in json){
			start[name]=parseFloat(getComputedStyle(obj,false)[name]);
			switch(name){
				case 'left':
					start[name]=obj.offsetLeft;
				break;
				case 'top':
					start[name]=obj.offsetTop;
				break;
			}	
			dis[name]=json[name]-start[name];
		}
		var count = Math.round(300/(1000/30));
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			for(var name in json){
				var a=n/count;
				var cur = start[name]+dis[name]*a;
				obj.style[name]=cur+'px';
			}
			if(n==count){
				clearInterval(obj.timer);
			}
		},1000/30)
	}
}