import React, { Component } from 'react';
import NavigationOverlay from '../components/NavigationOverlay';

import './MainNavigation.scss';

export default class MainNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navClasses: new Set(['navbar', 'fixed-top', 'navbar-light', 'white-burger'])
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll.bind(this), false);
	}

	componentDidUpdate() {
		window.removeEventListener('scroll', this.handleScroll.bind(this), false);
	}

	onClick() {
		const burgerClasses = this.state.burgerClasses === 'open' ? '' : 'open';
		this.setState({
			burgerClasses
		});
		this.props.onMenuClick(this.props.navigation);
	}

	handleScroll() {
		const { pageYOffset, document: { body, documentElement } } = window;
		// Cross-browser scrollTop safety net.
		const scrollTop = pageYOffset || documentElement.scrollTop || body.scrollTop || 0;
		const currentClasses = this.state.navClasses;
		let target = document.getElementsByClassName('projects-header')[0];
		let targetOffset = 200;
		let method = 'add';

		if (this.props.routeProps.name === 'home') {
			target = document.getElementsByClassName('hero')[0];
			targetOffset = target.clientHeight - 200;
		}

		if (scrollTop > targetOffset) {
			method = 'delete';
		}

		currentClasses[method]('white-burger');
		this.setState({
			navClasses: currentClasses
		});
	}

	render() {
		const navigationOverlay = this.props.navigation.showMenu
			? (<NavigationOverlay
				navigation={this.props.navigation}
				onClick={this.onClick.bind(this)}
				route={this.props.routeProps}
			/>)
			: null
		;

		return (
			<header id="mainNav" className={[...this.state.navClasses].join(' ')}>
				<div
					role="button"
					tabIndex={0}
					id="nav-burger"
					className={this.state.burgerClasses}
					onClick={this.onClick.bind(this)}
				>
					<span />
					<span />
					<span />
					<span />
				</div>
				{navigationOverlay}
			</header>
		);
	}
}

MainNavigation.propTypes = {
	routeProps: React.PropTypes.object,
	navigation: React.PropTypes.object,
	onMenuClick: React.PropTypes.func,
};
