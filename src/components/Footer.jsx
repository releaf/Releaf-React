import React, { Component } from 'react';
import { createMarkup } from '../helpers/createMarkup';
import { scrollTo } from '../helpers/scrollTo';

import './Footer.scss';

export default class Footer extends Component {
	componentDidMount() {
		this.props.onLoad();
	}
	render() {
		const { footer: { items } } = this.props;
		const content = items
			? items.widgets.map(widget => (
				<div
					key={widget.id}
					dangerouslySetInnerHTML={createMarkup(widget.rendered)}
				/>)
			)
			: ''
		;

		return (
			<footer className="footer section dark-grey text-center d-flex flex-column justify-content-center
					align-items-center text-white text-center p-5"
			>
				{content}
				<p>© {new Date().getFullYear()} <a href="https://rleafey.com">Ryan Leafey & rleafey.com</a>.</p>
				<p>
					<a
						role="button"
						tabIndex={0}
						onClick={scrollTo.bind(this, '#root')}
						href="#"
						className="p-2"
					>
						Back to top
					</a>
				</p>
			</footer>
		);
	}
}

Footer.propTypes = {
	onLoad: React.PropTypes.func,
	footer: React.PropTypes.object,
};
