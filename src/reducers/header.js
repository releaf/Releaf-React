import { SET_HEADER } from '../actions/constants';

export default function header(state = {}, action) {
	switch (action.type) {
		case SET_HEADER: {
			const {
				name, description, homeLink
			} = action.payload;
			return Object.assign({}, state, {
				name,
				description,
				homeLink
			});
		}
		default:
			return state;
	}
}
