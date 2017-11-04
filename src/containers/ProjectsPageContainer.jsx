import React, { Component } from 'react';
import ProjectsListingContainer from './ProjectsListingContainer';

export default class ProjectsPageContainer extends Component {
	render() {
		return (
			<div>
				<div className="jumbotron section secondary projects-header">
					<div className="container text-white">
						<h1 className="text-white">Projects</h1>
						<p>Please check out some of my work.</p>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<div className="article-listing">
								<ProjectsListingContainer postCount={10000} page />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProjectsPageContainer.propTypes = {
};

