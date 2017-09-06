import { combineReducers } from 'redux';
import pages from './pages';
import posts from './posts';
import header from './header';
import navigation from './navigation';
import footer from './footer';

const rootReducer = combineReducers({
	pages,
	posts,
	header,
	navigation,
	footer
});

export default rootReducer;
