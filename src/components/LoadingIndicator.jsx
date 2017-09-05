import React, { Component } from 'react';
import './LoadingIndicator.scss';

export default class LoadingIndicator extends Component {
	render() {
		const displayText = this.props.text || 'Loading...';
		return (
			<div className="loading-wrapper d-flex align-items-center justify-content-center">
				<h1>{displayText}</h1>
			</div>
		);
	}
}

LoadingIndicator.propTypes = {
	text: React.PropTypes.string
};
