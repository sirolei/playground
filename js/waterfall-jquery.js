$(window).on('load',function(){
	waterfall();
	$(window).on('scroll',function(){
		var maxIndex = checkScrollSlide();
		if ( maxIndex > 0 && maxIndex < 35){
			console.log("maxIndex is " + maxIndex);
			getImgs(maxIndex);
		}else if (maxIndex > 35){
			waterfall('main', 'box');
		}
	})
})

function waterfall(){
	var $boxs =$('#main>div');
	var w=$boxs.eq(0).outerWidth(true);
	var cols=Math.floor($("#main").outerWidth()/w);
	var hArr = [];
	$boxs.each(function(index, value){
		var h=$boxs.eq(index).outerHeight(true);
		if (index < cols){
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null, hArr);
			var minIndex = $.inArray(minH, hArr);
			$(value).css({'position':'absolute',
				'top':minH,
				'left':minIndex * w});
			hArr[minIndex] += $(value).outerHeight(true);
		}
	})
}

function checkScrollSlide(){
	var $boxs=$('#main>div');
	var $lastBox = $boxs.last();
	var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight(true) / 2);
	var scrollDis = $(window).scrollTop();
	var documentH = $(window).height();
	console.log(lastBoxDis);
	return (lastBoxDis < scrollDis + documentH)?($boxs.index($lastBox)):0;
}

function getImgs(maxIndex){
	var url = '/playground/waterfall/loadimg.php';
	$.get(url,{index:maxIndex},function(responseTxt){
		displayImgs(responseTxt);
	})
}

function displayImgs(data){
	var imgsData = JSON.parse(data);
	$.each(imgsData.data,function(index, value){
		var oBox=$('<div>').addClass('box').appendTo($('#main'));
		var img=$('<img>').attr('src','/playground/imgs/' + $(value).attr('src')).appendTo($(oBox));
	});
	waterfall();
}
