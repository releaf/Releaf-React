import { GET_NAVIGATION, INIT_SCROLLING, TOGGLE_MENU } from '../actions/constants';

export default function header(state = { showMenu: false }, action) {
	if (!action.error && action.type) {
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
			case TOGGLE_MENU: {
				const showMenu = !state.showMenu;
				return { ...state, showMenu };
			}

			default:
				return state;
		}
	}
	return state;
}
