import fetch from 'isomorphic-fetch';
import { WP_URL, RECEIVE_PAGE, RECEIVE_POSTS, SET_HEADER } from './constants';

const { Promise } = require('es6-promise').Promise;


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

function receiveHeaderData(siteData) {
	return {
		type: SET_HEADER,
		payload: {
			name: siteData.name,
			description: siteData.description,
			homeLink: siteData.home
		}
	};
}

function receivePosts(pageNum, totalPages, posts) {
	return {
		type: RECEIVE_POSTS,
		payload: {
			pageNum,
			totalPages,
			posts
		}
	};
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
	return function (dispatch) {
		return fetch(`${WP_URL}/${postType}?filter[paged]=${pageNum}&per_page=${postsPerPage}`)
			.then(response => Promise.all(
				[response.headers.get('X-WP-TotalPages'), response.json()]
			))
			.then(postsData => dispatch(
				receivePosts(pageNum, postsData[0], postsData[1])
			));
	};
}

export function getHeader() {
	return function (dispatch) {
		return fetch(WP_URL.replace('wp/v2', ''))
			.then(response => Promise.all(
				[response.headers.get('X-WP-TotalPages'), response.json()]
			))
			.then(siteData => dispatch(
				receiveHeaderData(siteData[1])
			));
	};
}

