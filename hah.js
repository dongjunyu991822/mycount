var tab1,//banner涓涓€涓猼ab鑿滃崟涓殑鏁版嵁
	tab2,//banner涓浜屼釜tab鑿滃崟涓殑鏁版嵁
	tab3,//banner涓涓変釜tab鑿滃崟涓殑鏁版嵁
	tab4,//banner涓鍥涗釜tab鑿滃崟涓殑鏁版嵁
	city,
	city2,
	shop,//鍒板簳缁翠慨鐨勫簵閾烘暟鎹�
	hot,//鐑棬鎵嬫満鐨勪功绫�
	ershou;//浜屾墜鑹搧鐨勬暟鎹�
/*--------------------------------banner------------------------*/
//鍥剧墖杞挱鏁堟灉	鐞冪悆璺熺潃鍙樿壊
var w = $("#mydiv").width();
var l = $("#wrap").find("img").length;
var i=1;
var bannerInterval = setInterval(function go(){
	$("#wrap").animate({
		left:-i*w,
	},500);
	$("#qiu").find("a").css("background","#f7f7f7");
	$("#qiu").find("a").eq(i).css("background","#333");
	i++;
	if (i==l) {
		i=0;
	}
},2000);
//鐞冪悆鐐瑰嚮浜嬩欢锛屽紩瀵煎埌褰撳墠鐐瑰嚮瀵瑰簲鐨勫浘鐗�
$("#qiu").find("a").on("click",function(){
	var n = $(this).index();
	$("#qiu").find("a").css("background","#f7f7f7");
	$(this).css("background","#333");
	$("#wrap").animate({
		left:-n*w,
	});
	i=n;//鐐瑰嚮杩囧悗锛屽皢褰撳墠瀵硅薄鐨勪笅鏍囧€艰祴鍊肩粰i锛屽畾鏃跺櫒缁х画浠庡綋鍓嶈繖涓紑濮嬭蛋
})

//banner涓殑tab鑿滃崟浜嬩欢
$(".banner>ul>li").on("mouseenter",function(){
	var i = $(this).index();
	$("#mydivs>div").hide();
	$("#mydivs>div").eq(i).show();
	$(".banner ul li span").eq(i).show();
	
}).on("mouseleave",function(){
	$("#mydivs>div").hide();
	$(".banner ul li span").hide();
})
$("#mydivs>div").on("mouseenter",function(e){
	var i = $(this).index();
	$(this).show();
	$(".banner ul li span").eq(i).show();
	
}).on("mouseleave",function(e){
	$("#mydivs>div").hide();
	$(".banner ul li span").hide();

});

/*------------------------banner涓殑tablist--------------------------*/
//绗竴涓猼ab鑿滃崟涓殑鏁版嵁鑾峰彇
$.ajax("data/tab1.json",{
	error : function(XMLHttpRequest, textStatus, errorThrown){
		console.log(XMLHttpRequest);
		console.log(textStatus);
		console.log(errorThrown);
	}, 
	success : function(data){
		tab1 = data;
		$("#listOne").load("tmp/tablist1_tmp.html",function(){
			var htmlStr = baidu.template("list1_tmp",tab1);
			$("#listOne").html(htmlStr);
		})
	}
});
//绗簩涓猼ab鑿滃崟涓殑鏁版嵁鑾峰彇
$.ajax("data/tab2.json",{
	error : function(XMLHttpRequest, textStatus, errorThrown){
		console.log(XMLHttpRequest);
		console.log(textStatus);
		console.log(errorThrown);
	}, 
	success : function(data){
		tab2 = data;
		$("#listTwo").load("tmp/tablist2_tmp.html",function(){
			var htmlStr = baidu.template("list2_tmp",tab2);
			$("#listTwo").html(htmlStr);
		})
	}
});
//绗笁涓猼ab鑿滃崟涓殑鏁版嵁鑾峰彇
$.ajax("data/tab3.json",{
	error : function(XMLHttpRequest, textStatus, errorThrown){
		console.log(XMLHttpRequest);
		console.log(textStatus);
		console.log(errorThrown);
	}, 
	success : function(data){
		tab3 = data;
		$("#listThree").load("tmp/tablist3_tmp.html",function(){
			var htmlStr = baidu.template("list3_tmp",tab3);
			$("#listThree").html(htmlStr);
		})
	},
});
//绗洓涓猼ab鑿滃崟涓殑鏁版嵁鑾峰彇
$.ajax("data/tab4.json",{
	error : function(XMLHttpRequest, textStatus, errorThrown){
		console.log(XMLHttpRequest);
		console.log(textStatus);
		console.log(errorThrown);
	}, 
	success : function(data){
		tab4 = data;
		$("#listFour").load("tmp/tablist4_tmp.html",function(){
			var htmlStr = baidu.template("list4_tmp",tab4);
			$("#listFour").html(htmlStr);
		})
	}
});

/*--------------------------鐑棬鎵嬫満鏁版嵁鑾峰彇-----------------------------*/
$.ajax("data/hot.json",{
	error : function(XMLHttpRequest, textStatus, errorThrown){
		console.log(XMLHttpRequest);
		console.log(textStatus);
		console.log(errorThrown);
	}, 
	success : function(data){
		hot = data;
		$("#hot").load("tmp/hot_tmp.html",function(){
			var htmlStr = baidu.template("hot_tmp",hot);
			$("#hot").html(htmlStr);
		})
	}
});

/*--------------------------浜屾墜鑹搧鏁版嵁鑾峰彇-----------------------------*/
$.ajax("data/ershou.json",{
	error : function(XMLHttpRequest, textStatus, errorThrown){
		console.log(XMLHttpRequest);
		console.log(textStatus);
		console.log(errorThrown);
	}, 
	success : function(data){
		ershou = data;
		$("#ershou").load("tmp/ershou_tmp.html",function(){
			var htmlStr = baidu.template("ershou_tmp",ershou);
			$("#ershou").html(htmlStr);
		})
	}
});
/*--------------------------鍒板簵缁翠慨搴楅摵鏁版嵁鑾峰彇----------------------------*/

$.ajax("data/shop.json",{
	error : function(XMLHttpRequest, textStatus, errorThrown){
		console.log(XMLHttpRequest);
		console.log(textStatus);
		console.log(errorThrown);
	}, 
	success : function(data){
		shop = data;
		$("#shop").load("tmp/shop_tmp.html",function(){
			var htmlStr = baidu.template("shop_tmp",shop);
			$("#shop").html(htmlStr);
		});
		for(var i in shop.shop_data){
			var marker = new AMap.Marker({
				icon:"img/icon.png",
			    map: map,//鍦ㄥ摢涓湴鍥句笂鍔�
			    position: [shop.shop_data[i].map_longitude,shop.shop_data[i].map_latitude],
			    title:"abc"
			});
			map.setZoomAndCenter(11, [shop.shop_data[i].map_longitude,shop.shop_data[i].map_latitude])
		}
	}
});
//搴楅摵鍒楄〃榧犳爣绉诲姩瑙﹀彂鐨勪簨浠�
$("#shop").on("mouseenter","figure",function(){
	$(this).css("background","#f7f7f7");
	$(this).find(".third").show();
}).on("mouseleave","figure",function(){
	$(this).css("background","");
	$(this).find(".third").hide();
})
/*--------------------------citylist-----------------------------*/
//鐐瑰嚮鍒囨崲鍩庡競鏄剧ず
$("#changeCity").on("click",function(){
	$(".cityList").show();
})
//鐐瑰嚮鍩庡競鍒楄〃闅愯棌
$("#closeList").on("click",function(){
	$(".cityList").hide();
})
$.ajax("data/city.json",{
	error : function(XMLHttpRequest, textStatus, errorThrown){
		console.log(XMLHttpRequest);
		console.log(textStatus);
		console.log(errorThrown);
	}, 
	success : function(data){
		city = data;
		$("#cityId").load("tmp/city_tmp.html",function(){
			var htmlStr = baidu.template("city_tmp",city);
			$("#cityId").html(htmlStr);
			$("#zmlist").find("span").hide();
			console.log($("#zmlist").find("span").length)
			$("#zmlist").find("span").eq(0).show();
		});		
	}
});
//鍒囨崲鍩庡競浜嬩欢浠ｇ爜
	$("#zimu").on("click", "a", function(e){
		e = e || window.event;
		//闃绘榛樿浜嬩欢
		e.preventDefault();
		//鑾峰彇褰撳墠鐐瑰嚮鎸夐挳鐨刬ndex
		var val = $(this).index();
		//鐐瑰嚮鐨勬樉绀猴紝娌＄偣鍑荤殑闅愯棌
		$("#zmlist").find("span").hide();
		
		$("#zmlist").find("span").eq(val).show();

	})
/*$.ajax("data/city.json",{
	error : function(XMLHttpRequest, textStatus, errorThrown){
		console.log(XMLHttpRequest);
		console.log(textStatus);
		console.log(errorThrown);
	}, 
	success : function(data){
		city2 = data.result.citylist;			
		$("#zmlist").load("tmp/city_tmp2.html",function(){							
				$("#zmlist").html(baidu.template("city_tmp2",{"city2": city2.A}))								
		})	
	}
});
$(".cityList").on("click", "#zimu a", function(){
	console.log(1);
	var word = $(this).html();
	$.ajax("data/city.json", {
		error: function(textStatus){
			console.log(textStatus);
		},
		success: function(data){
			city2 = data.result.citylist;
			//city.result.citylist鏄釜瀵硅薄A:
			for(var i in city2){
				if(word == i){
					$("#zmlist").load("tmp/city_tmp2.html",function(){							
							$("#zmlist").html(baidu.template("city_tmp2",{"city2": city2[i]}))								
					})
					break;	
				}
			}			
		}
	})
});*/
/*$(".city").on("click", "#zimu a", function(){
		var zimu = $(this).html();

		$.ajax("data/city.json", {
			error: function(textStatus){
				console.log(textStatus);
			},
			success: function(data){
				city = data.result.citylist;

				for(var i in city){
					if(zimu == i){
						$("#city").load("template/city_TMP.html", function(){
							$("#city").html(baidu.template("cityTmp", {"city": city[i]}));
						})
						break;
					}
				}
			}
		});
	})*/
/*-------------------------------map--------------------------------*/
$("#mapShow").click(function(event){
	$(".mapOuter").show();
	return false;
})
$(".mapInner p a").on("click",function(){
	$(".mapOuter").hide();
	return false;
})
//鍒涘缓鍦板浘瀵硅薄
var map = new AMap.Map("gdmap",{
	resizeEnable: true,
    zoom:11,
    center: [116.397428, 39.90923]
});
console.log(map);
//璁剧疆鍦板浘璇█锛�'en', 'zh_en', 'zh_cn'
map.setLang("zh_en");
//鍒涘缓鎺у埗鎺т欢
var scale = new AMap.Scale({
    	visible: true
	}),
	toolBar = new AMap.ToolBar({
   	 	visible: true
	}),

	overView = new AMap.OverView({
	    visible: true
	});

map.addControl(scale);
map.addControl(toolBar);
map.addControl(overView);
//鏂瑰悜鐩樻樉绀洪殣钘�

//宸ュ叿鏉℃樉绀洪殣钘�
//toolBar.hideDirection();
toolBar.showDirection();

//鏄剧ず闅愯棌楣扮溂鎸夐挳
overView.show();
//overView.hide();
//鎵撳紑鎴栨樉绀洪拱鐪�
//overView.open();
overView.close();
window.map=map;

//璁剧疆鍩庡競鍚嶇О
map.setCity();
 // 璁剧疆缂╂斁绾у埆鍜屼腑蹇冪偣
//map.setZoomAndCenter(14, [116.205467, 39.907761]);
//map.setZoom(12);
//map.setCenter([116.205467, 39.907761])

//骞崇Щ鍍忕礌鍜屽钩绉诲埌鏌愬潗鏍�
//map.panBy(-300, 300);
//map.panTo([116.405467, 39.907761]);
// 鍦ㄦ柊涓績鐐规坊鍔� marker 
/*var marker = new AMap.Marker({
    map: map,//鍦ㄥ摢涓湴鍥句笂鍔�
    position: [116.205467, 39.907761],
    title:"abc"
});*/

//鍒涘缓鍦板浘鍐呴儴鑷姩鎻愮ず杈撳叆妗�
var auto = new AMap.Autocomplete({
    input: "tipinput"
});

AMap.event.addListener(auto, "select", function(e){
    if (e.poi && e.poi.location) {
        map.setZoom(15);
        map.setCenter(e.poi.location);
        console.log(e);
        var marker = new AMap.Marker({
        	position:e.poi.location,
        	title:e.poi.name
        })
    }
})
//鍒涘缓澶栭儴鑷姩鎻愮ず杈撳叆妗�
var auto1 = new AMap.Autocomplete({
    input: "blinput"
});
AMap.event.addListener(auto1, "select", function(e){
    if (e.poi && e.poi.location) {
        map.setZoom(15);
        map.setCenter(e.poi.location);
        console.log(e);
        var marker = new AMap.Marker({
        	position:e.poi.location,
        	title:e.poi.name
        })
    }
})




