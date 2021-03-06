import React, { Component } from 'react';

export default class Sidebar extends Component {
	render() {
		return (
			<div className="col-sm-3 col-sm-offset-1 blog-sidebar">
				<div className="sidebar-module sidebar-module-inset">
					<h4>About</h4>
					<p>Nothing to see here.</p>
				</div>
				<div className="sidebar-module">
					<h4>Archives</h4>
					<ol className="list-unstyled">
						<li><a href="#">March 2014</a></li>
						<li><a href="#">February 2014</a></li>
						<li><a href="#">January 2014</a></li>
						<li><a href="#">December 2013</a></li>
						<li><a href="#">November 2013</a></li>
						<li><a href="#">October 2013</a></li>
						<li><a href="#">September 2013</a></li>
						<li><a href="#">August 2013</a></li>
						<li><a href="#">July 2013</a></li>
						<li><a href="#">June 2013</a></li>
						<li><a href="#">May 2013</a></li>
						<li><a href="#">April 2013</a></li>
					</ol>
				</div>
				<div className="sidebar-module">
					<h4>Elsewhere</h4>
					<ol className="list-unstyled">
						<li><a href="#">GitHub</a></li>
						<li><a href="#">Twitter</a></li>
						<li><a href="#">Facebook</a></li>
					</ol>
				</div>
			</div>

		);
	}
}
