window.onload = function(){
	waterfall('main', 'box');
	window.onscroll = function(){
		var maxIndex = checkScrollSlide();
		if ( maxIndex > 0 && maxIndex < 35){
			console.log("maxIndex is " + maxIndex);
			getImgs(maxIndex);
		}else if (maxIndex > 35){
			waterfall('main', 'box');
		}
	}
}

function waterfall(parent, box){
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent, box);
	//元素margin值
	var style = getElementStyle(oBoxs[0]);
	//获取列数
	var oBoxW = oBoxs[0].offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
	var cols = Math.floor( oParent.offsetWidth / oBoxW);

	//高度
	var hArr = [];
	for (var i = 0; i < oBoxs.length; i++) {
		if (i < cols){
			hArr.push(oBoxs[i].offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom));
		}else{
			var minH = Math.min.apply(null, hArr);
			//获取最小高度所在列数
			var index = getMinIndex(hArr, minH);
			//设置box 的绝对定位的偏移
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.left = index * oBoxW  + 'px';
			oBoxs[i].style.top = minH + 'px';

			hArr[index] += oBoxs[i].offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
		}
	};

}

function getByClass(parent, clsName){
	var boxArr = new Array(),
		oElements = parent.getElementsByTagName('*');
	//筛选parent中class为box的
	for (var i = 0; i < oElements.length; i++) {
		if (oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

function getMinIndex(arr, value){
	for (var i = 0; i < arr.length; i++) {
		if (value == arr[i]){
			return i;
		}
	};
}

function getElementStyle(element){
	var style = element.currentStyle || window.getComputedStyle(element);
	return style;
}

function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent, 'box');
	var lastBoxH = getTop(oBoxs[oBoxs.length - 1]) + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
	console.log("top is " + getTop(oBoxs[oBoxs.length - 1]));
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var clientHeight = document.documentElement.clientHeight;

	return (lastBoxH < scrollTop + clientHeight)?oBoxs.length-1:0;

}

function createXMLHttpRequest(){
	var xmlHttp;
	if (window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
		if (xmlHttp.overrideMimeType){
			xmlHttp.overrideMimeType('text/html');
		}
	}else if (window.ActiveXObject){
		try{
			xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
		}catch(e){
			try{
				xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
			}catch(e){

			}
		}
	}
	return xmlHttp;
}

function getImgs(index){
	var xmlHttp = createXMLHttpRequest();
	var url = '/playground/waterfall/loadimg.php?index=' + index;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			var responseTxt = xmlHttp.responseText;
			console.log(responseTxt);
			displayData(responseTxt);
		}
	}
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
	xmlHttp.send(); 
}

function displayData(imgData){
	var imgs = JSON.parse(imgData);
	//
	var oParent = document.getElementById('main');
	for (var i = 0; i < imgs.data.length; i++) {
		var oDiv = document.createElement('div');
		oDiv.className = 'box';
		var img = document.createElement('img');
		img.src = "/playground/imgs/" + imgs.data[i].src;
		oParent.appendChild(oDiv);
		oDiv.appendChild(img);
	};	
	waterfall('main', 'box');
}

//获取元素相对与页面顶部的距离
function getTop(e){
    var offset =e.offsetTop;
    if (e.offsetParent !=null){
        offset +=getTop(e.offsetParent);
    }
    return offset;
}