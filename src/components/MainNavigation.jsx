import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar } from 'react-bootstrap';
import NavigationOverlay from '../components/NavigationOverlay';

import './MainNavigation.scss';

export default class MainNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navClasses: new Set(['navbar', 'fixed-top', 'navbar-light', 'invisible'])
		};
	}

	componentDidMount() {
		if (this.props.routeProps &&
			this.props.routeProps.name &&
			this.props.routeProps.name === 'home'
		) {
			window.addEventListener('scroll', this.handleScroll.bind(this), false);
		}
	}

	componentDidUpdate() {
		if (this.props.routeProps &&
			this.props.routeProps.name &&
			this.props.routeProps.name !== 'home'
		) {
			window.removeEventListener('scroll', this.handleScroll.bind(this), false);
		}
	}

	handleScroll(event) {
		if (this.props.routeProps.name === 'home' && this.props.navigation.scrolling.enabled) {
			const scrollTop = event.srcElement.body.scrollTop;
			const currentClasses = this.state.navClasses;
			const windowHeight = document.getElementsByClassName('hero')[0].clientHeight;

			if (scrollTop > (windowHeight - 200)) {
				currentClasses.delete('invisible');
			} else {
				currentClasses.add('invisible');
			}

			this.setState({
				navClasses: currentClasses
			});
		}
	}

	render() {
		return (
			<header id="mainNav" className={[...this.state.navClasses].join(' ')}>
				<nav className="container">
					<nav className="nav blog-nav">
						<Link to="/" className="nav-link" activeClassName="active" onlyActiveOnIndex>Home</Link>
						<Link to="/projects" className="nav-link" activeClassName="active">Projects</Link>
					</nav>
				</nav>

				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">React-Bootstrap</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
				</Navbar>
				<NavigationOverlay />
			</header>
		);
	}
}

MainNavigation.propTypes = {
	routeProps: React.PropTypes.object,
	navigation: React.PropTypes.object,
};
