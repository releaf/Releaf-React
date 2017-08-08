import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

// Dumb component
export default class Project extends Component {
	createMarkup(html) {
		return {
			__html: html
		};
	}

	render() {
		const { post } = this.props;
		const projectLink = post.acf.link;
		/* eslint no-use-before-define: 0, no-undef: 0 */
		const trackGa = () => ga('send', 'event', 'Project Details', 'Click', projectLink);

		return (
			<div>
				<header>
					<h1 className="entry-title">{post.title.rendered}</h1>
				</header>
				<div className="entry-content">
					<div className="row">
						<div className="col-lg-12">
							<div className="project-detail">
								<a
									href={projectLink}
									target="_blank"
									onClick={trackGa}
								>
									<Image src={post.acf.project_image} responsive />
								</a>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">&nbsp;</div>
					</div>
					<div className="row">
						<div className="col-sm-9">
							<h3>Project Description&nbsp;&nbsp;
								<a
									href={projectLink}
									className="btn btn-primary btn-xs"
									target="_blank"
									onClick={trackGa}
								>Live demo&nbsp;&nbsp;<i className="glyphicon glyphicon-share-alt" />
								</a>
							</h3>
							<div dangerouslySetInnerHTML={this.createMarkup(post.acf.project_description)} />
						</div>
						<div className="col-sm-3">
							<h3>Project Requirements</h3>
							<div dangerouslySetInnerHTML={this.createMarkup(post.acf.project_credentials)} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Project.propTypes = {
	post: React.PropTypes.object.isRequired
};
