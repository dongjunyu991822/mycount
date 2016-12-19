//封装低版本IEajax 创建通信对象兼容	
	function creatIE(){
		//如果是非IE版本用XMLHttpRequest创建请求对象
		if(typeof XMLHttpRequest != "undefined"){
			return new XMLHttpRequest();
		//如果不支持第一种场景，用ActiveXObject创建请求对象
		}else if(typeof ActiveXObject != "undefined"){
			//把兼容的版本号封装成数组的形式循环遍历
			var str = ["MSXML.XMLHttp.6.0","MSXML.XMLHttp.3.0","MSXML.XMLHttp"];
			for(var n in str){
				try{
					var xhr = new ActiveXObject(str[n]);
					//返回成功对象
					return xhr;
				}catch(e){
					console.log(e);
				}
			}
		}else{
			//两种创建方式都不支持ajax请求
			console.log("对不起，您的浏览器版本暂不支持ajax请求");
		}
	}
	//封装两种请求方式 get 与 post 的兼容版本
	/*type:请求方式get post
	  url：请求数据的路径
	  isAysn：是否同步 默认是true 异步 ，false是异步
	  data：当请求方式是post时，传入send函数里面的参数
	  callback：回调函数 参数是请求成功并接收完成后接收的文件
	*/
	function postRequest(type , url, isAsyn, data,callback){
		//通信对象请求
		var xhr = creatIE();
		//利用readyState创建监听函数
		xhr.onreadystatechange = function(){
			if ((xhr.status == 200 || xhr.status == 304) && xhr.readyState ==4) {
				//当请求成功接收完成执行该函数
				callback && callback(JSON.parse(xhr.responseText));
			}
		};
		if(type.toLowerCase() == "get"){
			url+="?"
			for(var n in data){
				url+= n+"="+data[n]+"&";
			}
			url = url.substr(0,url.length-1);
			data = null;
		}else{
			data = JSON.stringify(data);
		}
		//初始化通信对象
		xhr.open(type,url,isAsyn);
		//发送请求
		xhr.send(data);
	}