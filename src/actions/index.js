// import fetch from 'isomorphic-fetch';
import { WP_URL, RECEIVE_PAGE, RECEIVE_POSTS, SET_HEADER } from './constants';
import { createFetch } from './fetch';
// const { Promise } = require('es6-promise').Promise;


// const POSTS_PER_PAGE = 10;

function receivePage(pageName, pageData) {
	return {
		type: RECEIVE_PAGE,
		payload: {
			pageName,
			page: pageData
		}
	};
}

function shouldFetchPage(state, pageName) {
	const pages = state.pages;

	return !pages.hasOwnProperty(pageName);
}

export function fetchPageIfNeeded(pageName, embed = false) {
	return function (dispatch, getState) {
		if (shouldFetchPage(getState(), pageName)) {
			const extraParams = embed ? '&_embed' : '';
			return fetch(`${WP_URL}/pages?filter[name]=${pageName}${extraParams}`)
				.then(response => response.json())
				.then(pages => dispatch(receivePage(pageName, pages[0])));
		}
		return false;
	};
}

export function fetchPosts(pageNum = 1, postType = 'posts', postsPerPage = 10) {
	return createFetch(RECEIVE_POSTS, {
		url: `${WP_URL}/${postType}?filter[paged]=${pageNum}&per_page=${postsPerPage}`
	}, { pageNum });
}

export function getHeader() {
	return createFetch(SET_HEADER, {
		url: WP_URL.replace('wp/v2', '')
	});
}

