$(function(){
	//搜索框效果
	//自执行函数  可以自动执行，不需要调用，避免全局污染
	(function(){
		var oMenu = $('#menu');
		var oMenuLi = $('#menu li');
		var oText = $('#search .form .text');
		var dataArr = [
			'例如：荷塘鱼坊烧鱼',
			'例如：荷塘鱼坊烧鱼11',
			'例如：荷塘鱼坊烧鱼22',
			'例如：荷塘鱼坊烧鱼33',
			'例如：荷塘鱼坊烧鱼44'
		];
		var iNow = 0;
		//设置默认值
		oText.attr('value',dataArr[0]);
		oMenuLi.on('click',function(){
			iNow = $(this).index();
			//oText.attr('value',dataArr[iNow]);//gradient active
			oText.val(dataArr[iNow]);
			
			console.log(iNow);
			$(this).attr('class','active').siblings().attr('class','gradient');
		});
		//光标移入移出的事件
		oText.on('focus',function(){
			if($(this).val() == dataArr[iNow] ){
				$(this).val('');
			}
		});
		oText.on('blur',function(){
			if($(this).val() == ''){
				$(this).val(dataArr[iNow]);
			}
		});
		
	})();
	//update 文字弹动效果
	(function(){
		var oDiv = $('.update');
		var oUl = oDiv.find('ul');
		var iH = 0;//li的高度
		var dataArr = [
			{"name":"萱萱","time":"5","title":"那些灿烂的瞬间","url":"http://www.163.com"},
			{"name":"李丽丽","time":"6","title":"那些灿烂的瞬间11","url":"http://www.163.com"},
			{"name":"萱萱","time":"7","title":"那些灿烂的瞬间22","url":"http://www.163.com"},
			{"name":"李丽丽","time":"8","title":"那些灿烂的瞬间33","url":"http://www.163.com"},
			{"name":"萱萱","time":"9","title":"那些灿烂的瞬间44","url":"http://www.163.com"},
			{"name":"李丽丽","time":"10","title":"那些灿烂的瞬间55","url":"http://www.163.com"},
			{"name":"萱萱","time":"11","title":"那些灿烂的瞬间66","url":"http://www.163.com"}
		];
		
		//将数据添加到ul里面
		var str = '';
		for(var i=0;i<dataArr.length;i++){
			str +='<li><a href="'+dataArr[i].url+'"><strong>'+dataArr[i].name+'</strong> <span>'+dataArr[i].time+'分钟前</span> 写了一篇新文章：'+dataArr[i].title+'…</a></li>';
		}
		oUl.html(str);
		
		//给按钮做点击事件
		var oBtnUp = $('#updateUpBtn');
		var oBtnDown = $('#updateDownBtn');
		var iNow = 0;//记录当前新闻的下标
		iH = oUl.find('li').height();
		//给向下的按钮添加点击事件
		oBtnDown.on('click',function(){
			doMove(1);			
		});
		oBtnUp.on('click',function(){
			doMove(-1);	
		});
		
		//定时器，循环运动
		var timer= null;//保存定时器的
		function autoPlay(){
			timer = setInterval(function(){
				doMove(1);
				
			},2000);
		}
		autoPlay();
		
		//onmouseover   onmouseout
		oDiv.hover(function(){
			//清除定时器
			clearInterval(timer);
		},function(){
			//重启定时器
			autoPlay();
		});
		
		 
		//移动的函数
		function doMove(num){
			iNow = iNow+num;//当前条目的下标
			//判断边界值
			if(iNow > dataArr.length-1){
				iNow = 0;
			}
			if(iNow < 0){ 
				iNow = dataArr.length-1;
			}
			//移动
			oUl.stop().animate({'top':-iH*iNow},2000,'elasticOut');
			
			
		}
		
	})();
	
	/* 需要调用的tab*/
	tab(1,'click');
	tab(2,'mouseover');
	tab(3,'mouseover');
	tab(4,'mouseover');
	
	//选项卡的切换
	/*  num 导航下标
	 * 	mth 悬停切换or点击切换？
	 * */
	function tab(num,mth){
		var oTabNav1 = $('.tabNav'+num);
		var otabCon1 = $('.tabCon'+num);
		var aLi = oTabNav1.find('li');
		//设置初始值
		otabCon1.hide().eq(0).show();
		//点击事件
		aLi.on(mth,function(){
			var iNow = $(this).index();
			$(this).addClass('active').removeClass('gradient');
			$(this).siblings().addClass('gradient').removeClass('active');
			//内容的样式修改   triangle_down_red   triangle_down_gray
			otabCon1.hide().eq(iNow).show();
			$(this).find('a').attr('class','triangle_down_red');
			$(this).siblings().find('a').attr('class','triangle_down_gray');
		});
	};
	
	
	/* bbs论坛*/
	(function(){
		$('.bbs>ol>li').on("mouseover",function(){
			$(this).addClass('active').siblings().removeClass('active');
		})
	})();
	
	/* 精彩推荐*/
	(function(){		
		/* 当前播放第几个*/
		var n=0;
		
		$('.pic>ul>li').eq(n).css('z-index','2');
		
		/* 悬停触发*/
		$('.pic>ol>li').on('mouseover',function(){
			n = $(this).index();
			picTab(n);
			clearInterval(timer);
		})
		$('.pic>ol>li').on('mouseleave',function(){
			interval();
		})
		/* 切换效果*/
		function picTab(n){
			$('.pic>ol>li').eq(n).addClass('active').siblings().removeClass('active');
			$('.pic>ul>li').eq(n).css('z-index','2').siblings().css('z-index','0');
		}
		
		/* 定时器*/
		var timer = null;
		interval();
		function interval(){
			var length = $('.pic>ul>li').length;
			timer = setInterval(function(){
				n++;n%=length;
				picTab(n)
			},2000)
		}
	})();/* 精彩推荐结束*/
	
	/* 红人烧客start*/
	var objs = $('.hot_area>ul>li');
	for(var i=0,l=objs.length;i<l;i++){
		var obj1 = objs[i];
		var obj2 = objs[i].getElementsByTagName('p')[0];
		var width = objs[i].offsetWidth;
		var height = objs[i].offsetHeight;
		mouse(obj1,obj2,width,height);
	}
	
	/* calendar*/
	$('.calendar>ol>li>img').on('mouseover',function(){
		var x = this.parentNode.offsetLeft+50;
		var y = this.parentNode.offsetTop-30;
		var src = $(this).attr('src');
		$('.today_info').css({'display':'block','left':x,'top':y});
		$('.today_info>img').attr('src',src);
		$('.text>p').html($(this).attr('info'));
//		$('.today_info').css('display','block');
	})
	$('.calendar>ol>li>img').on('mouseout',function(){
		$('.today_info').css('display','none');
	})
	
});
