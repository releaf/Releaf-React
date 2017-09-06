import { GET_FOOTER } from '../actions/constants';

export default function footer(state = {}, action) {
	if (!action.error && action.type) {
		switch (action.type) {
			case GET_FOOTER: {
				const items = action.payload;
				return { ...state, items };
			}
			default:
				return state;
		}
	}
	return state;
}
