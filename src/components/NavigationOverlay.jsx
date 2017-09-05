import React, { Component } from 'react';
import { Link } from 'react-router';
import './NavigationOverlay.scss';

export default class NavigationOverlay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navClasses: new Set(['navbar', 'fixed-top', 'navbar-light', 'invisible']),
		};
	}

	// componentDidUpdate() {
	// 	const { showMenu } = this.props.navigation;
	// 	console.log('showMenu ', showMenu);
	// 	if (showMenu) {
	// 		console.log('on');
	// 		disableScroll.on();
	// 	} else {
	// 		console.log('off');
	// 		disableScroll.off();
	// 	}
	// }


	render() {
		const { items } = this.props.navigation;
		const links = items ? items.map((navigationItem) => (
			<li
				key={`${navigationItem.title}-wrapper`}
				className="nav-item"
			>
				<Link
					to={navigationItem.url.replace('http://api.rleafey.com', '')}
					activeClassName="active"
					onlyActiveOnIndex={navigationItem.title !== 'Home'}
					key={navigationItem.title}
				>
					{navigationItem.title}
				</Link>
			</li>
		)) : null;
		const wrapperClasses = [
			'nav-items', 'list-unstyled', 'd-flex', 'flex-column', 'justify-content-center align-items-center'
		];
		return (
			<div className="navigation-overlay">
				<ul className={wrapperClasses.join(' ')}>
					{links}
				</ul>
			</div>
		);
	}
}

NavigationOverlay.propTypes = {
	navigation: React.PropTypes.object,
};
