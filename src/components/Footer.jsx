import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<p>©{new Date().getFullYear()} <a href="http://rleafey.com">Ryan Leafey & rleafey.com</a>.</p>
				<p>
					<a href="#">Back to top</a>
				</p>
			</footer>
		);
	}
}
