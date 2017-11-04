import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactPage from '../components/ContactPage';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchPageIfNeeded } from '../actions';

const PAGE_NAME = 'contact';

class ContactPageContainer extends Component {
	componentWillMount() {
		const { fetchPageIfNeeded } = this.props;
		fetchPageIfNeeded(PAGE_NAME, true /* set embed = true include all embedded media */);
	}

	render() {
		const { page } = this.props;
		let content = <ContactPage page={page} />;

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
		fetchPageIfNeeded: (pageName, embeded) => {
			dispatch(fetchPageIfNeeded(pageName, embeded));
		}
	}
);

ContactPageContainer.propTypes = {
	fetchPageIfNeeded: React.PropTypes.func.isRequired,
	page: React.PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactPageContainer);

