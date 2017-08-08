/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import $ from 'jquery';

import './HomePage.scss';

export default class HomePage extends Component {
	componentDidMount() {
		// shameful use of jQuery here is a by-product of static HTML from WP REST API
		const $headings = $('.hero').find('.heading-animated');
		let count = 1;
		const maxCount = $headings.length;

		this.swapLifeRoles = setInterval(() => {
			$headings.addClass('hidden');
			$($headings[count]).removeClass('hidden');
			count = (count + 1) % maxCount;
		}, 2500);
	}

	componentWillUnmount() {
		clearInterval(this.swapLifeRoles);
	}

	createMarkup(html) {
		return {
			__html: html
		};
	}

	render() {
		const { page } = this.props;
		const heroStyle = {
			backgroundImage: `url(${page._embedded['wp:featuredmedia'][0].source_url})`
		};
		return (
			<div className="hero" style={heroStyle}>
				<div
					className="hero-content d-flex flex-column justify-content-center align-items-center"
					dangerouslySetInnerHTML={this.createMarkup(page.content.rendered)}
				/>
				<div style={{ height: '4000px' }}>
					<span className="text-center">More stuff here</span>
				</div>
			</div>
		);
	}
}

HomePage.propTypes = {
	page: React.PropTypes.object.isRequired
};
