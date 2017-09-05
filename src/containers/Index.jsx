import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavigation from '../components/MainNavigation';
import Footer from '../components/Footer';
import { getNavigation, onMenuClick } from '../actions/navigation';

class Index extends Component {
	render() {
		const { navigation, onMenuClick } = this.props;
		const routeProps = this.props.children.props.route;
		return (
			<div>
				<MainNavigation
					routeProps={routeProps}
					navigation={navigation}
					onMenuClick={onMenuClick}
				/>
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => (
	{
		navigation: state.navigation
	}
);

const mapDispatchToProps = (dispatch) => (
	{
		onMenuClick: (navigation) => {
			if (!navigation.items) {
				dispatch(getNavigation());
			}
			dispatch(onMenuClick());
		}
	}
);

Index.propTypes = {
	children: React.PropTypes.object.isRequired,
	route: React.PropTypes.object,
	navigation: React.PropTypes.object,
	onMenuClick: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
