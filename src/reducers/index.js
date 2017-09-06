import { combineReducers } from 'redux';
import pages from './pages';
import posts from './posts';
import header from './header';
import navigation from './navigation';
import footer from './footer';
import loading from './loading';

const rootReducer = combineReducers({
	pages,
	posts,
	header,
	navigation,
	footer,
	loading
});

export default rootReducer;
