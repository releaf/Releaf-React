import React, { Component } from 'react';
import { Link } from 'react-router';
import './NavigationOverlay.scss';
import LoadingIndicator from './LoadingIndicator';

export default class NavigationOverlay extends Component {
	navItemClick() {
		this.props.onClick();
		window.scrollTo(0, 0);
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
					onClick={this.navItemClick.bind(this)}
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
		) : <LoadingIndicator text="Loading Navigation..." />;
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
