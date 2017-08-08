import { INIT_SCROLLING, GET_NAVIGATION, WP_URL } from './constants';

function receiveNavigationData(navData) {
	return {
		type: GET_NAVIGATION,
		payload: navData
	};
}

export function getNavigation() {
	return function (dispatch) {
		return fetch(WP_URL.replace('wp/v2', 'wp-api-menus/v2/menus/2'))
			.then(response => Promise.all(
				[response.headers.get('X-WP-TotalPages'), response.json()]
			))
			.then(navData => dispatch(
				receiveNavigationData(navData[1])
			));
	};
}

export function initScrolling(enabled) {
	return {
		type: INIT_SCROLLING,
		payload: {
			scrolling: enabled
		}
	};
}
