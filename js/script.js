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
		console.log(photoNo);
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
	var path = './img/photos/photo_';
	// 写真の入れ替え
	$('.photo').css('opacity', '0');
	setTimeout(function () {
		$('.photo').html('<img src="' + path + no + '.jpg" class="slidePhotos">');
		$('.photo').css('opacity', '1');

		// ナビゲーション
		$('.now').removeClass('now');
		$('.circle').eq(no - 1).addClass('now');
	}, 200);
}
