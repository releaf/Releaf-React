import React, { Component } from 'react';
import { createMarkup } from '../helpers/createMarkup';

import './ContactPage.scss';

export default class ContactPage extends Component {
	render() {
		const { page } = this.props;

		return (
			<div className="row">
				<div className="col-sm-12 text-white text-center">
					<div
						className="d-flex flex-column justify-content-center align-items-center contact-wrapper p-5"
						dangerouslySetInnerHTML={createMarkup(page.content.rendered)}
					/>
				</div>
			</div>
		);
	}
}

ContactPage.propTypes = {
	page: React.PropTypes.object
};
