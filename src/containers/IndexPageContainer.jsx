import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchPageIfNeeded } from '../actions';
import { initScrolling } from '../actions/navigation';

const PAGE_NAME = 'home';

// Smart component
class IndexPageContainer extends Component {
	componentWillMount() {
		const { fetchPageIfNeeded } = this.props;

		fetchPageIfNeeded(PAGE_NAME, true /* set embed = true include all embedded media */);
	}

	componentDidMount() {
		this.props.toggleScrolling(true /* enabled */);
	}

	render() {
		const { page } = this.props;
		let content = <HomePage page={page} />;

		if (!page) {
			content = <LoadingIndicator />;
		}
		return (
			<div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => (
	{
		page: state.pages[PAGE_NAME]
	}
);

const mapDispatchToProps = (dispatch) => (
	{
		toggleScrolling: (enabled) => {
			dispatch(initScrolling(enabled));
		},
		fetchPageIfNeeded: (pageName, embeded) => {
			dispatch(fetchPageIfNeeded(pageName, embeded));
		}
	}
);

IndexPageContainer.propTypes = {
	fetchPageIfNeeded: React.PropTypes.func.isRequired,
	page: React.PropTypes.object,
	toggleScrolling: React.PropTypes.func,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(IndexPageContainer);

