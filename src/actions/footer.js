import { GET_FOOTER, WP_URL } from './constants';
import { createFetch } from './fetch';

export function getFooter(id = 'sidebar-footer') {
	return createFetch(GET_FOOTER, {
		url: WP_URL.replace('wp/v2', `wp-rest-api-sidebars/v1/sidebars/${id}`)
	});
}
