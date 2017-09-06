import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavigation from '../components/MainNavigation';
import Footer from '../components/Footer';
import { getNavigation, onMenuClick } from '../actions/navigation';
import { getFooter } from '../actions/footer';

class Index extends Component {
	render() {
		const { navigation, onMenuClick, onFooterLoad, footer } = this.props;
		const routeProps = this.props.children.props.route;
		return (
			<div>
				<MainNavigation
					routeProps={routeProps}
					navigation={navigation}
					onMenuClick={onMenuClick}
				/>
				{this.props.children}
				<Footer
					onLoad={onFooterLoad}
					footer={footer}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => (
	{
		navigation: state.navigation,
		footer: state.footer,
	}
);

const mapDispatchToProps = (dispatch) => (
	{
		onMenuClick: (navigation) => {
			if (!navigation.items) {
				dispatch(getNavigation());
			}
			dispatch(onMenuClick());
		},
		onFooterLoad: (id) => {
			dispatch(getFooter(id));
		}
	}
);

Index.propTypes = {
	children: React.PropTypes.object.isRequired,
	route: React.PropTypes.object,
	navigation: React.PropTypes.object,
	onMenuClick: React.PropTypes.func,
	onFooterLoad: React.PropTypes.func,
	footer: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
