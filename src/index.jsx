/* eslint import/no-named-as-default:0, import/no-named-as-default-member:0, new-cap:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router } from 'react-router';
import configureStore from './store/configureStore';
import Index from './containers/Index';
import IndexPageContainer from './containers/IndexPageContainer';
import ProjectsPageContainer from './containers/ProjectsPageContainer';
import '../sass/fonts.css';
import '../sass/bootstrap.css';
import '../sass/base.scss';

const history = new createBrowserHistory();
const store = configureStore();
const rootElement = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Index} name="home">
				<IndexRoute component={IndexPageContainer} name="home" />
				<Route path="projects" component={ProjectsPageContainer} name="projects" />
			</Route>
		</Router>
	</Provider>,
	rootElement);
