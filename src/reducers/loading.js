import { LOADING, LOADED } from '../actions/constants';

export default function loading(state = {}, action = null) {
	if (!action.error && action.payload) {
		const loadingState = { ...state };

		switch (action.type) {
			case LOADING:
				loadingState[action.payload] = 'loading';
				break;
			case LOADED:
				loadingState[action.payload] = 'complete';
				break;
			default:
				break;
		}

		return loadingState;
	}

	return state;
}
