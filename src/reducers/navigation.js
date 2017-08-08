import { GET_NAVIGATION, INIT_SCROLLING } from '../actions/constants';

export default function header(state = {}, action) {
	if (!action.error && action.payload) {
		switch (action.type) {
			case GET_NAVIGATION: {
				const items = action.payload;
				return { ...state, items };
			}
			case INIT_SCROLLING: {
				const enabled = action.payload.scrolling;
				const scrolling = state.scrolling;
				return { ...state, scrolling: { ...scrolling,	enabled	} };
			}

			default:
				return state;
		}
	}
	return state;
}
