import { RECEIVE_POSTS } from '../actions/constants';

const defaultState = {
	posts: [],
	pageNum: 1,
	totalPages: 1
};

export default function posts(state = defaultState, action) {
	switch (action.type) {
		case RECEIVE_POSTS: {
			return Object.assign({}, state, {
				posts: action.payload,
				pageNum: action.meta.pageNum,
				totalPages: parseInt(action.totalPages, 10)
			});
		}
		default:
			return state;
	}
}
