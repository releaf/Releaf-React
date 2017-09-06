import { RECEIVE_PAGE } from '../actions/constants';

export const DEFAULT_PAGE = 'defaultPage';

const defaultPage = {
	content: {
		rendered: 'Sorry, but we can\'t find the page you\'re looking for.'
	},
	title: {
		rendered: 'Oops!'
	}
};

const defaultState = {
	[DEFAULT_PAGE]: defaultPage
};

export default function pages(state = defaultState, action) {
	switch (action.type) {
		case RECEIVE_PAGE: {
			const { pageName, page } = action.payload;

			return { ...state, [pageName]: page };
		}
		default:
			return state;
	}
}
