/*
TCB 二手良品
2016年-11月-25日
author：董俊玉
*/
$(function() {
	//图片轮播
	//获取外层元素的宽度
	var widths = $(".lunbo").width(),
		lis = $(".wrap").find("img").length,
		i = 0,
		t = setInterval(function go() {
			if (i >= lis) {
				i = 0;
			} else {
				$(".wrap").animate({
					//让ul的left值每次改变变量width的倍数;
					left: -i * widths,
				}, 500);
				//找到锚点进行样式改变
				$(".maodian").find("a").css("background", "#f7f7f7");
				$(".maodian").find("a").eq(i).css("background", "#fc6621");
				i++;
			}

		}, 2000);
	//当点击锚点时，锚点的颜色进行切换并且相对应图片切换
	$(".maodian").find("a").on("click", function() {
		//取得点击时相应的下标
		var n = $(this).index();
		//找到所有的a背景色为默认颜色
		$(".maodian").find("a").css("background", "#f7f7f7");
		//当前a的背景颜色改变
		$(this).css("background", "#fc6621");
		//当前点击完成后重新执行定时器
		$(".wrap").animate({
			left: -n * widths,
		});
		i = n;
	});
	//搜素框提示信息
	var auto = new AMap.Autocomplete({
		input: "aipinput"
	});
	//模板手机信息ajax动态获取，主题里面的商品列表
	//封装商店列表的回调函数
	function storelist(data) {
		$(".leftul").load("oneTmp.html", function() {
			var htmlStr = baidu.template("firstTmp", data);
			$(".leftul").html(htmlStr);
			//鼠标滑动出现立即购买，
			$(".leftul>li").hover(function() {

					$(this).css({
						boxShadow: "0px 1px 19px gray"
					});
					$(this).find("div>span>a").show();
					$(this).find("div>span>span:nth-of-type(2)").hide();
					$(this).find("div>span>del").hide();
				},
				function() {
					$(this).css({
						boxShadow: ""
					});
					$(this).find("div>span>a").hide();
					$(this).find("div>span>span:nth-of-type(2)").show();
					$(this).find("div>span>del").show();
				});
		});
	}
	//翻页ajax封装请求函数
	function goon(url, currentPage) {
		$.ajax({
			type: "get",
			url: url,
			success: function(myInfo) {
				storelist(myInfo, currentPage);
			}
		});
	}
	//商品默认排序列表显示
	store();
	//封装商品列表的ajax请求数据函数
	function store() {
		$.ajax({
			type: "get",
			url: "json/getgood.json",
			success: function(myInfo) {
				storelist(myInfo);
			}
		});
	}
	//封装公共的ajax请求函数,不做其他元素处理
	function postResponse(mytype, myurl, element, tmphtml, tmpId) {
		$.ajax({
			type: mytype,
			url: myurl,
			success: function(data) {
				$(element).load(tmphtml, function() {
					var htmlStr = baidu.template(tmpId, data);
					$(element).html(htmlStr);
				});
			}
		})
	}
	//封装品牌点击公共的ajax请求函数,做其他元素处理，
	function getResponse(myurl, tmphtml, tmpId, current, positions) {
		$.ajax({
			type: "get",
			url: myurl,
			success: function(info) {
				$(".apple").load(tmphtml, function() {
					var htmlStr = baidu.template(tmpId, info);
					$(".apple").html(htmlStr);
					//选择品牌时把选择的品牌名字显示
					$(".name").text(current.text());
					//相应的几成新改变
					$(".leftul>li>p").css({
						backgroundPosition: positions
					});
					//点击X关闭
					$(".close").on("click", function() {
						//选择页面关闭
						$(".apple").hide();
						//原先页面显示
						$("#lianjie").show();
						//调用按照默认顺序封装的ajax商品列表
						store();
					});
				});
				//点击选项手机售卖信息相应改变
				storelist(info);
			}
		});
	}
	//当点击价格的时候按照价格排序的文件显示
	$(".price").on("click", function() {
		$(this).text("价格↓");
		$(this).css("color", "#4daf7c").siblings("span").css("color", "black");
		$.ajax({
			type: "get",
			url: "json/price.json",
			success: function(data) {
				storelist(data);
			}
		});
	});
	//当点击默认排序的时候按照默认顺序显示
	$(".order").on("click", function() {
			$(this).siblings("span").text("价格↑");
			$(this).css("color", "#4daf7c").siblings("span").css("color", "black");
			store();
		})
		//翻页列表
	$.ajax({
		type: "get",
		url: "../json/salesgood.json",
		success: function(data) {
			$(".computer").load("twoTmp.html", function() {
				var htmlStr = baidu.template("twoTmp", data);
				$(".computer").html(htmlStr);
				//鼠标滑过列表阴影显示
				$("#fanye>div>ul>li").hover(function() {
					$(this).css({
						boxShadow: "0px 1px 19px gray"
					});
					$(this).find("div>a").show();
					$(this).find("div>p").hide()
				}, function() {
					$(this).css({
						boxShadow: ""
					});
					$(this).find("div>a").hide();
					$(this).find("div>p").show();
				});
				//鼠标滑过左边的箭头进行背景处理
				$("#fanye>div").not(":nth-of-type(2)").hover(function() {
					//背景颜色改变
					$(this).css({
						background: "#e8e8e8",
					});
					//左边背景图标位置改变
					$(".leftgo").css({
						backgroundPosition: "0px 7px"
					});
					//左边背景图标位置改变
					$(".rightgo").css({
						backgroundPosition: "-12px 7px"
					});
				}, function() {
					$(this).css({
						background: ""
					});
					$(".leftgo").css({
						backgroundPosition: ""
					});
					$(".rightgo").css({
						backgroundPosition: ""
					});
				});
				//当点击翻页标示，Left的值改变
				//取得一个li的宽度
				var w = 560;
				var index = 1;
				var scrollwidth = $(".middle").scrollLeft();
				var width = $(".middle>ul").width();
				//当点击右边翻页时，left值改变
				$("#fanye>div").eq(2).on("click", function() {
					if (index < data.result.flash_list.length / 4) {
						$(".middle>ul").animate({
							left: -index * w
						});
						index++;
					}
				});
				//当点击左边翻页时，left值改变
				$("#fanye>div").eq(0).on("click", function() {
					var lefts = $(".middle>ul").offset().left;
					if (index > 1) {
						$(".middle>ul").animate({
							left: (lefts + 560) + "px"
						});
					}
				});


			});
		}
	});
	//用户评价动态加载
	postResponse("get", "../json/user.json", ".assess", "threeTmp.html", "threeTmp");

	//动态加载手机品牌信息
	$.ajax({
		type: "get",
		url: "../json/getgood.json",
		success: function(data) {
			$("#lianjie").load("fourTmp.html", function() {
				var htmlStr = baidu.template("navigation", data);
				$("#lianjie").html(htmlStr);
				//当点击某一块相应的信息会显示出来
				$("#lianjie>div>ul>li").not("first-of-type").on("click", function(e) {
					//阻止默认事件
					e.preventDefault();
					//点击时才会触动数据加载
					$("#lianjie").hide();
					$(".apple").show();
					//记录当前的点击元素
					var current = $(this).children("a");
					//当发生点击事件时进行模板的加载与ajax请求
					if (current.text() == "苹果") {
						getResponse("json/apple.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "三星") {
						getResponse("json/samsung.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "华为") {
						getResponse("json/huawei.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "小米") {
						getResponse("json/mi.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "oppo") {
						getResponse("json/oppo.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "vivo") {
						getResponse("json/vivo.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "魅族") {
						getResponse("json/meizu.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "乐视") {
						getResponse("json/letv.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "诺基亚") {
						getResponse("json/nokia.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "索尼") {
						getResponse("json/suoni.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "360手机") {
						getResponse("json/360phone.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "努比亚") {
						getResponse("json/Nubia.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "联想") {
						getResponse("json/think.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "LG") {
						getResponse("json/lg.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "HTC") {
						getResponse("json/htc.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "酷派") {
						getResponse("json/Coolpad.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "美图秀秀") {
						getResponse("json/meitu.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "金立") {
						getResponse("json/gionee.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "微软") {
						getResponse("json/windows.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "戴尔") {
						getResponse("json/daier.json", "sixTmp.html", "sixTmp", current, "");
					} else if (current.text() == "朵唯") {
						getResponse("json/doov.json", "sixTmp.html", "sixTmp", current, "");
					};
					//判断点击的是哪一个选择加载相应的json文件
					if (current.text() == "全新") {
						getResponse("json/allnew.json", "sevenTmp.html", "sevenTmp", current, "0px 0px");
					} else if (current.text() == "99成新") {
						getResponse("json/99new.json", "sevenTmp.html", "sevenTmp", current, "0 -57px");
					} else if (current.text() == "95成新") {
						getResponse("json/95new.json", "sevenTmp.html", "sevenTmp", current, "0 -115px");
					} else if (current.text() == "9成新") {
						getResponse("json/9new.json", "sevenTmp.html", "sevenTmp", current, "0 -171px");
					} else if (current.text() == "85成新") {
						getResponse("json/85new.json", "sevenTmp.html", "sevenTmp", current, "0 -229px");
					} else if (current.text() == "8成新及以下") {
						getResponse("json/8newdown.json", "sevenTmp.html", "sevenTmp", current, "0 -290px");
					}
					//根据价格进行筛选及模板的加载
					if (current.text() == "500元以下") {
						getResponse("json/500xia.json", "eightTmp.html", "eightTmp", current, "");
					} else if (current.text() == "500-1000元") {
						getResponse("json/1000xia.json", "eightTmp.html", "eightTmp", current, "");
					} else if (current.text() == "1000-1500元") {
						getResponse("json/1500xia.json", "eightTmp.html", "eightTmp", current, "");
					} else if (current.text() == "1500-2000元") {
						getResponse("json/2000xia.json", "eightTmp.html", "eightTmp", current, "");
					} else if (current.text() == "2000-3000元") {
						getResponse("json/3000xia.json", "eightTmp.html", "eightTmp", current, "");
					} else if (current.text() == "3000元及以上") {
						getResponse("json/3000shang.json", "eightTmp.html", "eightTmp", current, "");
					}

				});

			});
		}
	});

	//用户购买信息滚动数据动态加载
	$.ajax({
		type: "get",
		url: "json/gundong.json",
		success: function(data) {
			$(".roll").load("fiveTmp.html", function() {
				var htmlStr = baidu.template("fiveTmp", data);
				$(".roll").html(htmlStr);
				//列表上下轮播效果
				//找到列表li的高度
				var h = 54;
				//找到li的总个数
				var lis = $(".roll").find("li").length;
				var i = 0;
				var time = setInterval(function() {
					if (i <= lis - 4) {
						$(".roll").animate({
							top: -i * 54
						});
						i++
					} else {
						i = 0;
					}
				}, 2000)



			});
		}
	});

	//遮罩层效果
	$(".getInfo").on("click", function() {
		$("#mydiv").show();
	});
	$("#mydiv>div>span").on("click", function() {
		$("#mydiv").hide();
	});
	//鼠标滑过翻页背景颜色改变
	$("#myp>a").hover(function() {
		$(this).addClass("myc");
	}, function() {
		$(this).removeClass("myc");
	});
	//点击地图，出现地图
	$(".map").on("click", function(e) {
		e.preventDefault();
		$("#ditu").show();
		//地图
		var map = new AMap.Map("container", {
			resizeEnable: true,
			zoom: 11,
			center: [116.397428, 39.90923]
		});
		//设置地图语言 en：英文, 'zh_en'：中英混合, 'zh_cn 中文
		map.setLang("zh_en");
		//创建控制控件
		//比例尺
		var scale = new AMap.Scale({
				visible: true
			}),
			//工具条
			toolBar = new AMap.ToolBar({
				visible: true
			}),
			//鹰眼
			overView = new AMap.OverView({
				visible: true
			});
		map.addControl(scale);
		map.addControl(toolBar);
		map.addControl(overView);
		//工具条操作
		//方向盘显示隐藏
		toolBar.hideDirection();
		toolBar.showDirection();
		//工具条标尺显示隐藏
		toolBar.hideRuler();
		toolBar.showRuler();
		//鹰眼操作
		//显示隐藏鹰眼
		overView.hide();
		overView.show();
		//打开或者关闭鹰眼
		overView.open();
		overView.close();
		window.map = map;
		//使用setCity设置地图中心城市
		map.setCity("北京");
		//改变地图中心及缩放级别
		map.setZoomAndCenter(14, [116.205467, 39.907761]);
		map.setZoom(12);
		map.setCenter([116.205467, 39.907761]);
		//平移像素
		map.panBy(200, 200);
		//平移到某坐标
		map.panTo([116.205467, 39.907761]);

		//创建自动提示输入框
		var auto = new AMap.Autocomplete({
			input: "tipinput"
		});
		AMap.event.addListener(auto, "select", function(e) {
			if (e.poi && e.poi.location) {
				map.setZoom(15);
				map.setCenter(e.poi.location);
				console.log(e.poi.location);
				var marker = new AMap.Marker({
					map: map,
					position: e.poi.position,
					title: e.poi.name
				})
			}
		});
		//创建第一个maker

		//创建显示图标的数组
		var province = [{
			"name": "匹夫涮肉(西三旗店)",
			"center": "116.346171,40.063255",
			"type": 0

		}, {
			"name": "天安门广场",
			"center": "116.397477,39.908692",
			"type": 0
		}, {
			"name": "香山公园",
			"center": "116.189141,39.990246",
			"type": 0
		}, {
			"name": "清华大学",
			"center": "116.32676,40.003305",
			"type": 0
		}, {
			"name": "北京首都机场",
			"center": "116.587922,40.081577",
			"type": 0
		}];
		var marker = [];
		//循环 数组里面取得对象里面相应的值
		for (var i = 0; i < province.length; i++) {
			var marker;
			if (province[i].type === 0) {
				var icon = new AMap.Icon({
					image: "../images/timg.png",
					size: new AMap.Size(24, 24)
				});
				marker = new AMap.Marker({
					icon: icon,
					position: province[i].center.split(','),
					offset: new AMap.Pixel(-12, -12),
					title: province[i].name,
					map: map
				})
			} else {
				marker = new AMap.Marker({
					position: province[i].center.split(','),
					title: province[i].name,
					map: map
				});
			}
		}

	});
	$("#ditu>div>span").on("click", function() {
		$("#ditu").hide();
	});


});
$(function() {
	/*//jsonp回调函数
	function getCity(data) {
		window.cityData = data;
	}
	//发送jsonp请求
	var targ = document.createElement("script");
	targ.src = "http://bang.360.cn/aj/get_area/?citycode=shang_hai&callback=getCity";
	document.body.appendChild(targ);*/
	//翻页
	var count = 1;

	function pager(pageId, pageSize, totleNum, currentPage) {
		var pageCount = Math.ceil(totleNum / pageSize),
			currentPage = currentPage || "1",
			barFrame = '<a href="###" class="myb go">首页</a>' +
			'<a href="###" class="mya go">上一页</a>' +
			'<a href="###" class="mya go">下一页</a>' +
			'<a href="###" class="myb go">尾页</a>';
		$("#" + pageId).html(barFrame);
		var startIndex = currentPage <= 5 ? 1 : currentPage - 4;
		var str = "";
		//当前页码高亮显示
		for (var n = 0; n < 10 && startIndex <= pageCount; n++) {
			str += startIndex == currentPage ? '<a href="###" class="myc">' + startIndex + '</a>' : '<a href="###">' + startIndex + '</a>';
			startIndex++;
		}
		$("#" + pageId).find("a").eq(2).before(str);
		//首页按钮显示条件判断
		currentPage < 5 ? $(".go").eq(0).hide() : $(".myb").eq(0).show();
		//上一页按钮显示条件判断
		currentPage > 1 ? $(".go").eq(1).show() : $(".go").eq(1).hide();
		//下一页和尾页按钮显示判断条件
		currentPage == pageCount ? $(".go").eq(3).hide().end().eq(2).hide() : $(".go").eq(3).show().end().eq(2).show();
		//尾页按钮判断条件
		currentPage + 5 >= pageCount ? $(".go").eq(3).hide() : $(".go").eq(3).show();
	}
	pager("myp", 5, 100, 1);
	$("#myp").attr("val", 1);
	//点击时页数
	$("#myp").on("click", "a", function() {
		var curindex = $("#myp").attr("val");
		var newindex = $(this).text();
		//$(this).addClass("myc").siblings("a").removeClass("myc");
		switch (newindex) {
			case "首页":
				pager("myp", 5, 100, 1);
				$("#myp").attr("val", 1);
				break;
			case "上一页":
				pager("myp", 5, 100, parseInt(curindex) - 1);
				$("#myp").attr("val", parseInt(curindex) - 1);
				break;
			case "下一页":

				pager("myp", 5, 100, parseInt(curindex) + 1);
				console.log(parseInt(curindex));
				$("#myp").attr("val", parseInt(curindex) + 1);
				break;
			case "尾页":
				pager("myp", 5, 100, Math.ceil(100 / 5));
				$("#myp").attr("val", Math.ceil(100 / 5));
				break;
			default:
				pager("myp", 5, 100, parseInt(newindex));
				$("#myp").attr("val", newindex);
				break;

		}
		//执行店铺刷新
	});
});