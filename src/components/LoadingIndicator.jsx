import React, { Component } from 'react';
import './LoadingIndicator.scss';

export default class LoadingIndicator extends Component {
	render() {
		const displayText = this.props.text || 'Loading...';
		const { color } = this.props;
		const textClasses = color ? `text-${color}` : null;
		return (
			<div className="loading-wrapper d-flex align-items-center justify-content-center flex-column">
				<div className="sk-folding-cube">
					<div className="sk-cube1 sk-cube" />
					<div className="sk-cube2 sk-cube" />
					<div className="sk-cube4 sk-cube" />
					<div className="sk-cube3 sk-cube" />
				</div>
				<h2 className={textClasses}>{displayText}</h2>
			</div>
		);
	}
}

LoadingIndicator.propTypes = {
	text: React.PropTypes.string,
	color: React.PropTypes.string
};
