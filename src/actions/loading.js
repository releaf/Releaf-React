import { LOADING, LOADED } from './constants';

export function isLoading(name) {
	return {
		type: LOADING,
		payload: name,
	};
}

export function isLoaded(name) {
	return {
		type: LOADED,
		payload: name,
	};
}

