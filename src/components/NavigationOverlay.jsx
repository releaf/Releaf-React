import React, { Component } from 'react';
import { Link } from 'react-router';
import './NavigationOverlay.scss';
import LoadingIndicator from './LoadingIndicator';

export default class NavigationOverlay extends Component {
	constructor(props) {
		super(props);
		const currentPage = this.formatHoverClass(props.route.name);
		this.state = {
			hoverClass: currentPage,
			currentHoveredPage: currentPage
		};
	}
	onNavigationHover(title) {
		const currentPage = this.formatHoverClass(this.props.route.name);
		const hoverClass = title
			? `${currentPage} nav-hover-${title}`
			: `${currentPage}`
		;
		this.setState({	hoverClass, currentHoveredPage: title || currentPage });
	}

	navItemClick() {
		this.props.onClick();
		window.scrollTo(0, 0);
	}

	formatHoverClass(title) {
		const hoverClass = title;
		return hoverClass.replace(/ /g, '-').toLowerCase();
	}

	render() {
		const { navigation: { items } } = this.props;
		const links = items ? items.map((navigationItem) => {
			const { title, url } = navigationItem;
			console.log(title, title !== 'Home');
			return (
				<li
					key={`${title}-wrapper`}
					className={`nav-item nav-${this.formatHoverClass(title)}`}
				>
					<Link
						key={title}
						to={url.replace('http://api.rleafey.com', '')}
						activeClassName="active"
						onlyActiveOnIndex={title === 'Home'}
						onClick={this.navItemClick.bind(this)}
						onMouseEnter={this.onNavigationHover.bind(this, this.formatHoverClass(title))}
						onMouseLeave={this.onNavigationHover.bind(this, null)}
					>
						{title}
					</Link>
				</li>
			);
		}) : null;
		const bgHoverEls = items ? items.map((navigationItem) => {
			const classes = ['nav-overlay-bg', `nav-overlay-bg-${this.formatHoverClass(navigationItem.title)}`];
			if (this.state.currentHoveredPage === this.formatHoverClass(navigationItem.title)) {
				classes.push('active');
			}
			return (
				<div className={classes.join(' ')} />
			);
		}) : null;
		const wrapperClasses = ['d-flex', 'flex-column', 'justify-content-center'];
		const content = links
			? (
				<div className={`${wrapperClasses.join(' ')} align-items-center navigation-overlay-container`}>
					<ul className={`${wrapperClasses.join(' ')} nav-items list-unstyled`}>
						{links}
					</ul>
					{bgHoverEls}
				</div>
			)
			: <LoadingIndicator text="Loading Navigation..." color="white" />
		;
		return (
			<div className={`navigation-overlay ${this.state.hoverClass}`}>
				{content}
			</div>
		);
	}
}

NavigationOverlay.propTypes = {
	navigation: React.PropTypes.object,
	onClick: React.PropTypes.func,
	route: React.PropTypes.object,
};
