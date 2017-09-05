/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import $ from 'jquery';
import ProjectsListingContainer from '../containers/ProjectsListingContainer';
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

	scrollTo(destination) {
		const offset = $(destination).offset().top;
		$('html, body').animate({
			scrollTop: offset
		}, 1000);
	}

	render() {
		const { page } = this.props;
		const heroStyle = {
			backgroundImage: `url(${page._embedded['wp:featuredmedia'][0].source_url})`
		};
		return (
			<div>
				<div className="hero" style={heroStyle}>
					<div
						className="hero-content d-flex flex-column justify-content-center align-items-center"
						dangerouslySetInnerHTML={this.createMarkup(page.content.rendered)}
					/>
					<div
						className="down-arrow"
						onClick={this.scrollTo.bind(this, '#sectionOne')}
						role="button"
						tabIndex={0}
					>
						<span className="arrow" />
					</div>
				</div>
				<div className="container" id="sectionOne">
					<div className="row skills-section">
						<div className="col-sm-12 text-center p-5">
							<div dangerouslySetInnerHTML={this.createMarkup(page.acf.skills_header_section)} />
						</div>
						<div className="col-sm-12 col-md-4 text-center">
							<div dangerouslySetInnerHTML={this.createMarkup(page.acf.left_col)} />
						</div>
						<div className="col-sm-12 col-md-4 text-center">
							<div dangerouslySetInnerHTML={this.createMarkup(page.acf.midde_col)} />
						</div>
						<div className="col-sm-12 col-md-4 text-center">
							<div dangerouslySetInnerHTML={this.createMarkup(page.acf.right_col)} />
						</div>
						<div className="col-sm-12 p-3" />
					</div>
				</div>
				<div className="section">
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<div
									className="p-5 text-center"
									dangerouslySetInnerHTML={this.createMarkup(page.acf.projects_text)}
								/>
							</div>
						</div>
						<ProjectsListingContainer />
					</div>
				</div>
			</div>
		);
	}
}

HomePage.propTypes = {
	page: React.PropTypes.object.isRequired
};
