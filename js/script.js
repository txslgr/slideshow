$(function () {
	init();
});

function init () {
	var photosLength = 5,
		photoNo = 1;

	changePhoto(photoNo);
	$('.circle').eq(photoNo - 1).addClass('now');

	$('.prevImg, .nextImg').on('click', function (e) {
		photoNo = changeNum(e.target.className, photosLength, photoNo);
		changePhoto(photoNo);
	});

	$('.circle .ln').on('click', function (e) {
		var no = Number(e.target.innerHTML);
		if (no >= 1 && no <= 5) {
			photoNo = no;
			changePhoto(no);
		}
	});
}

function changeNum (cn, ln, no) {
	if (cn === 'prevImg') {
		no = no > 1 ? no - 1 : ln;
	} else if (cn === 'nextImg') {
		no = no < ln ? no + 1 : 1;
	}
	return no;
}

function changePhoto (no) {
	var path = './img/photos/photo_',
		imgElm = '.slidePhotos',
		divElm = '.photo',
		loadElm = '.loading';
	var h = $(imgElm).height();
	// 写真の入れ替え
	$(divElm).css('opacity', '0');
	setTimeout(function () {
		$(loadElm).css('opacity', '1');
		$(imgElm).attr('src', '');
		$(imgElm).css('height', h + 'px');
		if ($(imgElm).length === 0) {
			var elm = $('<img>', {class: 'slidePhotos'});
			$(imgElm).css('height', 'auto');
			$(divElm).append(elm);
			$(imgElm).on('load', function () {
				$(loadElm).css('opacity', '0');
				$(divElm).css('opacity', '1');
			});
		}
		$(imgElm).attr('src', path + no + '.jpg');

		// ナビゲーション
		$('.now').removeClass('now');
		$('.circle').eq(no - 1).addClass('now');
	}, 100);
}