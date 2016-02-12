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
	var divElm = '.photo';

	// 写真領域消す
	$(divElm).css('opacity', '0');
	// 再描画
	setTimeout(function () {
		setPhoto(divElm, no);
	}, 100);
}

function setPhoto (divElm, no) {
	var path = './img/photos/photo_',
		imgElm = '.slidePhotos',
		loadElm = '.loading',
		h = $(imgElm).height();

	// loading表示
	$(loadElm).css('opacity', '1');
	// 画像タグ空に
	$(imgElm).attr('src', '');
	// 高さは保つ
	$(imgElm).css('height', h + 'px');
	// 初期処理
	if ($(imgElm).length === 0) {
		initPhotoArea(divElm, imgElm, loadElm);
	}
	// 画像タグにパス設定、高さをリセット
	$(imgElm).attr('src', path + no + '.jpg');
	$(imgElm).removeAttr('style');

	// ナビゲーション
	$('.now').removeClass('now');
	$('.circle').eq(no - 1).addClass('now');
}

function initPhotoArea (divElm, imgElm, loadElm) {
	var elm = $('<img>', {class: 'slidePhotos'});

	// divに画像タグ追加
	$(divElm).append(elm);
	// 画像ロード時 loading決して画像表示
	$(imgElm).on('load', function () {
		$(loadElm).css('opacity', '0');
		$(divElm).css('opacity', '1');
	});
}
