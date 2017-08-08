import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unescape } from 'lodash';
import { getHeader } from '../actions';


class Header extends Component {
	componentWillMount() {
		this.getHeaderData();
	}
	getHeaderData() {
		this.props.getHeader();
	}
	render() {
		const { name, description } = this.props;
		return (
			<div className="blog-header">
				<div className="container">
					<h1 className="blog-title">{name}</h1>
					<p className="lead blog-description">{unescape(description)}</p>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		name: state.header.name,
		description: state.header.description,
		homeLink: state.header.homeLink
	};
}

Header.propTypes = {
	getHeader: React.PropTypes.func.isRequired,
	name: React.PropTypes.string,
	description: React.PropTypes.string.isRequired
};

export default connect(mapStateToProps, { getHeader })(Header);

