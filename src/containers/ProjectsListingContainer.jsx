import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import ProjectMedium from '../components/ProjectMedium';
import LoadingIndicator from '../components/LoadingIndicator';

class ProjectsListingContainer extends Component {
	componentDidMount() {
		const {
			fetchPosts, pageNum = 1, postType = 'project', posts, postCount
		} = this.props;

		if (posts.length < postCount) {
			fetchPosts(pageNum, postType, postCount);
		}
	}
	buildPosts(posts) {
		return posts.map((post, index) =>
			<ProjectMedium post={post} key={post.id} index={index} page={this.props.page} />
		);
	}
	render() {
		const { postCount, posts } = this.props;
		// if postCount is set and we've fetched more posts than we need slice the array down to the correct size
		const postsToRender = postCount ? posts.slice(0, postCount) : posts;
		const content = postsToRender.length > 0
			? this.buildPosts(postsToRender)
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
	postType: React.PropTypes.string,
	postCount: React.PropTypes.number,
	page: React.PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListingContainer);
