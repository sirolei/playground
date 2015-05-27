$(window).on('load',function(){
	getImgs();
})



function turn(elem){
	var cls = elem.className;
	if (/photo_center/.test(cls)){
		if (/photo_front/.test(cls)){
			cls = cls.replace(/photo_front/, 'photo_back');
		}else {
			cls = cls.replace(/photo_back/, 'photo_front');
		}
	}
	
	var index = $(elem).index();
	// console.log(index);
	elem.className = cls;
	//将点击的图片设置为最中间图片
	//点击的若不是当前最中的图片，则对图片重新排序，并将点击的图片居中
	if (! /photo_center/.test(cls)){
		// console.log('click the ');
		//去除点击图片的内敛样式
		$(elem).removeAttr('style');
		sortImgs(index);
	}
	sortNavs(index, false);
}

function getImgs(){
	
	var url = '/playground/coolGallery/data.php';
	$.get(url, function(responseTxt){
		displayImgs(responseTxt);
		// console.log(responseTxt)
	});
}

function displayImgs(responseTxt){
	var imgs = JSON.parse(responseTxt);
	$.each(imgs.data,function(index, value){
		// console.log(index);
		var jpg_num = index + 1;
		var oPhoto = $('<div>').addClass('photo photo_front').attr('id', 'jpg_' + jpg_num).attr('onclick', 'turn(this)').appendTo($('.wrap'));
		
		var oPhotoWrap = $('<div>').addClass('photo_wrap').appendTo($(oPhoto));
		var oPhotoSideFront = $('<div>').addClass('side side_front').appendTo($(oPhotoWrap));
		var oPhotoSideBack = $('<div>').addClass('side side_back').appendTo($(oPhotoWrap)); 
		var oPImage = $('<p>').addClass('image').appendTo($(oPhotoSideFront));
		// console.log($(value).attr('src'));
		// console.log($(value).attr('caption'));
		// console.log($(value).attr('desc'));
		var img = $('<img>').attr('src', '/playground/imgs/' + $(value).attr('src')).appendTo($(oPImage));
		var oPCation = $('<p>').addClass('caption').html($(value).attr('caption')).appendTo($(oPhotoSideFront));
		var oPDesc = $('<p>').addClass('desc').html($(value).attr('desc')).appendTo($(oPhotoSideBack));

		//添加控制按钮
		var navBtn = $('<span>').addClass('i').attr('id','nav_' + jpg_num).attr('onclick', 'turn(document.getElementById(\'jpg_'+ jpg_num + '\'))').appendTo($('.nav'));
		
	});
	// console.log(imgs.data.length);
	var randomIndex = getRandomNum(imgs.data.length);
	sortImgs(randomIndex);
	sortNavs(randomIndex, false);
}

function sortImgs(n){
	clearCenter();
	var oPhoto = $("#jpg_"+n);
	$(oPhoto).addClass('photo_center');
	$(oPhoto).css('-webkit-transform','scale(1.3) rotate(360deg)') ;
	$(oPhoto).css('-moz-transform','scale(1.3) rotate(360deg)') ;
	$(oPhoto).css('-ms-transform','scale(1.3) rotate(360deg)') ;

	getNotCenterPhoto(n-1);
}

function getRandomNum(maxNum){
	var random = Math.floor(Math.random()*maxNum + 1);
	// console.log(random);
	return random;
}

function clearCenter(){
	var centerPhotos = $(".photo_center");
	if (centerPhotos.length > 0){
		$(centerPhotos).removeClass('photo_center');
	}
}

function getNotCenterPhoto(n){
	var allPhotos = $(".photo").toArray();

	// console.log(allPhotos);
	/* 去除center_photo这张图片*/
	var centerPhopto = allPhotos.splice(n,1)[0];
	// console.log(centerPhopto);
	/* 划分左区域的图片*/
	var leftPhotos = allPhotos.splice(0, Math.ceil(allPhotos.length/2));
	// console.log(leftPhotos);
	/* 划分右区域的图片*/
	var rightPhotos = allPhotos;
	var ranges = range();
	// console.log(rightPhotos);

	for(s in leftPhotos){
		var photo = leftPhotos[s];
		photo.style.left = getRandow(ranges.left.x) + 'px';
		photo.style.top = getRandow(ranges.left.y )+ 'px';
		photo.style['transform'] = photo.style['-webkit-transform'] = 'scale(1) rotate('+getRandow([-80, 150]) + 'deg)';
		
		if ($(photo).hasClass('photo_back')){
			// console.log("has photo_back");
			$(photo).removeClass('photo_back');
			$(photo).addClass('photo_front');
		}
	}     

	for(s in rightPhotos){
		var photo = rightPhotos[s];
		photo.style.left = getRandow(ranges.right.x) + 'px';
		photo.style.top = getRandow(ranges.right.y )+ 'px';
		photo.style['transform'] = photo.style['-webkit-transform'] = 'scale(1) rotate('+getRandow([-80, 150]) + 'deg)';
		

		if ($(photo).hasClass('photo_back')){
			// console.log("has photo_back");
			$(photo).removeClass('photo_back');
			$(photo).addClass('photo_front');
		}
	}

}
/*	获取随机值的范围*/
function range(){
	var range = { left:{ x:[], y:[] }, right:{ x:[], y:[] }};
	var wrap = {
		w:$(".wrap").innerWidth(),
		h:$(".wrap").innerHeight(),
	};

	var photo = {
		w:$(".photo").eq(0).innerWidth(),
		h:$(".photo").eq(0).innerHeight(),
	};
	// range.left.x = [0-photo.w, wrap.w/2 - photo.w/2];
	// range.left.y = [0-photo.h, wrap.h];

	// range.right.x = [wrap.w/2 + photo.w/2, wrap.w + photo.w];
	// range.right.y = [0-photo.h, wrap.h];
	range.left.x = [0, wrap.w/2 - photo.w/2];
	range.left.y = [0, wrap.h];

	range.right.x = [wrap.w/2 + photo.w/2, wrap.w];
	range.right.y = [0, wrap.h];
	
	return range;
}

function getRandow(range){
	var max = Math.max(range[0], range[1]);
	var min = Math.min(range[0], range[1]);
	var diff = max - min;
	var random = Math.ceil( Math.random() * diff + min );
	// console.log(random);
	return random;
}

function sortNavs(n, isClicked){
	var nav = document.getElementById('nav_'+ n);
	var allNavs = $('.i');
	var cls = nav.className;
	if ($(nav).hasClass('i_current') && !($(nav).hasClass('i_back'))){
		// console.log('has i_current');
		$(nav).addClass('i_back');
	}else if ($(nav).hasClass('i_back')){
		// console.log('has i_back');
		$(nav).removeClass('i_back');
	}else {
		//将所有兄弟的nav_current 或者nav_back 清楚，并将自己的设置为nav_current
		
		allNavs.removeClass('i_current');
		allNavs.removeClass('i_back');
		$(nav).addClass('i_current');
		if (isClicked){
			$(nav).addClass('i_back');
		}
		
	}
}