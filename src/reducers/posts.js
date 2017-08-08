import { RECEIVE_POSTS } from '../actions/constants';

const defaultState = {
	posts: [],
	pageNum: 1,
	totalPages: 1
};

export default function posts(state = defaultState, action) {
	switch (action.type) {
		case RECEIVE_POSTS: {
			const {
				pageNum, totalPages, posts
			} = action.payload;

			return Object.assign({}, state, {
				posts,
				pageNum,
				totalPages: parseInt(totalPages, 10)
			});
		}
		default:
			return state;
	}
}
