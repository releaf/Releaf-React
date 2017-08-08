import { combineReducers } from 'redux';
import pages from './pages';
import posts from './posts';
import header from './header';
import navigation from './navigation';

const rootReducer = combineReducers({
	pages,
	posts,
	header,
	navigation
});

export default rootReducer;
