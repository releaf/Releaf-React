import $ from 'jquery';

export function scrollTo(destination) {
	const offset = $(destination).offset().top;
	$('html, body').animate({
		scrollTop: offset
	}, 1000);
}
