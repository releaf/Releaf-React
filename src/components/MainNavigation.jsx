import React, { Component } from 'react';
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

	onClick() {
		const burgerClasses = this.state.burgerClasses === 'open' ? '' : 'open';
		this.setState({
			burgerClasses
		});
		this.props.onMenuClick(this.props.navigation);
	}

	handleScroll(event) {
		if (this.props.routeProps.name === 'home' && this.props.navigation.scrolling.enabled) {
			const scrollTop = event.srcElement.body.scrollTop;
			const currentClasses = this.state.navClasses;
			const hero = document.getElementsByClassName('hero')[0];
			if (hero && !this.props.navigation.showMenu) {
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
	}

	render() {
		const navigationOverlay = this.props.navigation.showMenu
			? (<NavigationOverlay
				navigation={this.props.navigation}
				onClick={this.onClick.bind(this)}
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
