import { isLoading, isLoaded } from './loading';
import { RECEIVE_POSTS } from './constants';

export function createFetch(type = null, { url } = {}, metaData = null) {
	const fetchUrl = url;
	let totalPages = '';
	return (dispatch) => {
		dispatch(isLoading(type));
		return fetch(fetchUrl)
			.then((response) => {
				if (type === RECEIVE_POSTS) {
					totalPages = response.headers.get('X-WP-TotalPages');
				}
				if (response.status >= 400) {
					return response.json()
						.then((payload) => {
							console.warn(payload);
						});
				} else {
					return response.json()
						.then((payload) => {
							dispatch({ type, payload, meta: metaData, totalPages });
						})
						.then(() => {
							dispatch(isLoaded(type));
						});
				}
			})
			.catch((error) => {
				console.warn(error);
			});
	};
}
