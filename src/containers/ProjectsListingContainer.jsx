import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import ProjectMedium from '../components/ProjectMedium';
import LoadingIndicator from '../components/LoadingIndicator';

class ProjectsListingContainer extends Component {
	componentDidMount() {
		const {
			fetchPosts, pageNum = 1, postType = 'project', postsPerPage = 3, posts
		} = this.props;

		if (posts.length > -1) {
			fetchPosts(pageNum, postType, postsPerPage);
		}
	}

	buildPosts(posts) {
		// Prevent subsequent post requests populating this section by always taking the first 3
		return posts.slice(0, 4).map((post, index) =>
			<ProjectMedium post={post} key={post.id} index={index} />
		);
	}

	render() {
		const { posts } = this.props;
		const content = posts.length > 0
			? this.buildPosts(posts)
			: <LoadingIndicator text="Loading Projects..." />
		;
		return (
			<span>
				{content}
			</span>
		);
	}
}

const mapStateToProps = (state) => (
	{
		posts: state.posts.posts
	}
);

const mapDispatchToProps = (dispatch) => (
	{
		fetchPosts: (pageNum, postType, postsPerPage) => {
			dispatch(fetchPosts(pageNum, postType, postsPerPage));
		}
	}
);


ProjectsListingContainer.propTypes = {
	fetchPosts: React.PropTypes.func,
	pageNum: React.PropTypes.number,
	posts: React.PropTypes.array,
	postsPerPage: React.PropTypes.number,
	postType: React.PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListingContainer);
