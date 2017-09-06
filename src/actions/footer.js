import { GET_FOOTER, WP_URL } from './constants';

function receiveFooterData(data) {
	return {
		type: GET_FOOTER,
		payload: data
	};
}

export function getFooter(id = 'sidebar-footer') {
	return function (dispatch) {
		return fetch(WP_URL.replace('wp/v2', `wp-rest-api-sidebars/v1/sidebars/${id}`))
			.then(response => Promise.all(
				[response.headers.get('X-WP-TotalPages'), response.json()]
			))
			.then(data => dispatch(
				receiveFooterData(data[1])
			));
	};
}
