import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NavigationOverlay extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		navClasses: new Set(['navbar', 'fixed-top', 'navbar-light', 'invisible'])
	// 	};
	// }
	//
	// componentDidMount() {
	// 	window.addEventListener('scroll', this.handleScroll.bind(this));
	// }
	//
	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.handleScroll.bind(this));
	// }

	render() {
		return (
			<div>
				<Link to="/" className="nav-link" activeClassName="active" onlyActiveOnIndex>Home</Link>
				<Link to="/projects" className="nav-link" activeClassName="active">Projects</Link>
			</div>

		);
	}
}
