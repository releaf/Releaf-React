import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavigation from '../components/MainNavigation';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

class Index extends Component {
	render() {
		const containerClass = this.props.showSidebar ? 'col-sm-8 blog-main' : 'col-sm-12';
		const { navigation } = this.props;
		const getSidebar = () => {
			if (this.props.showSidebar) {
				return <Sidebar />;
			}
			return null;
		};
		const routeProps = this.props.children.props.route;

		return (
			<div>
				<MainNavigation
					routeProps={routeProps}
					navigation={navigation}
				/>
				<div className="container-fluid">
					<div className="row">
						<div className={containerClass}>
							{this.props.children}
						</div>
						{getSidebar}
					</div>
				</div>
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

// const mapDispatchToProps = (dispatch) => (
// 	{
// 		toggleScrolling: (enabled) => {
// 			dispatch(initScrolling(enabled));
// 		}
// 	}
// );

Index.propTypes = {
	showSidebar: React.PropTypes.bool,
	children: React.PropTypes.object.isRequired,
	route: React.PropTypes.object,
	navigation: React.PropTypes.object
};

export default connect(mapStateToProps)(Index);
