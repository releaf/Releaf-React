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
					onClick={this.props.onClick.bind(this)}
				>
					{navigationItem.title}
				</Link>
			</li>
		)) : null;
		const wrapperClasses = [
			'nav-items', 'list-unstyled', 'd-flex', 'flex-column', 'justify-content-center align-items-center'
		];
		const content = links ? (
			<ul className={wrapperClasses.join(' ')}>
				{links}
			</ul>
		) : <h2 className="d-flex justify-content-center text-white">Loading Navigation...</h2>;
		return (
			<div className="navigation-overlay">
				{content}
			</div>
		);
	}
}

NavigationOverlay.propTypes = {
	navigation: React.PropTypes.object,
	onClick: React.PropTypes.func,
};
