import { GET_NAVIGATION, WP_URL, TOGGLE_MENU } from './constants';
import { createFetch } from './fetch';

export function getNavigation() {
	return createFetch(GET_NAVIGATION, {
		url: WP_URL.replace('wp/v2', 'navigation/primary')
	});
}

export function onMenuClick() {
	return {
		type: TOGGLE_MENU
	};
}
