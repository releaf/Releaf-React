import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions';
import Post from '../components/Post';

// Smart component
class PostsContainer extends Component {
	componentWillMount() {
		const { fetchPosts, pageNum = 1 } = this.props;

		fetchPosts(pageNum);
	}

	buildPosts(posts) {
		return posts.map(post =>
			<Post post={post} key={post.id} />
		);
	}

	handlePaginationClick(pageNum) {
		scroll(0, 0);

		this.props.fetchPosts(pageNum);
	}

	buildPagination(pageNum, totalPages) {
		const prevText = 'Previous';
		const nextText = 'Next';

		const prevLink = {
			link: <a>{prevText}</a>,
			enabled: false,
			id: 'prevLink'
		};

		const nextLink = {
			link: <Link to={`/${pageNum + 1}`} onClick={() => this.handlePaginationClick(pageNum + 1)}>{nextText}</Link>,
			enabled: true,
			id: 'nextLink'
		};

		if (pageNum > 1 && pageNum < totalPages) {
			prevLink.link = <Link to={`/${pageNum - 1}`} onClick={() => this.handlePaginationClick(pageNum - 1)}>{prevText}</Link>;
			prevLink.enabled = true;
		} else if (pageNum === totalPages) {
			nextLink.link = <a>{nextText}</a>;
			nextLink.enabled = false;

			prevLink.link = <Link to={`/${pageNum - 1}`} onClick={() => this.handlePaginationClick(pageNum - 1)}>{prevText}</Link>;
			prevLink.enabled = true;
		}

		return (
			<nav>
				<ul className="pager">
					{[prevLink, nextLink].map(link =>
						(<li key={link.id} className={link.enabled ? '' : 'disabled'}>
							{link.link}
						</li>)
					)}
				</ul>
			</nav>
		);
	}

	render() {
		const {
			posts, totalPages, pageNum = 1
		} = this.props;


		return (
			<div className="article-listing">

				{this.buildPosts(posts)}

				{this.buildPagination(parseInt(pageNum, 10), totalPages)}

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts.posts,
		pageNum: state.posts.pageNum,
		totalPages: state.posts.totalPages
	};
}

PostsContainer.propTypes = {
	fetchPosts: React.PropTypes.func.isRequired,
	pageNum: React.PropTypes.number.isRequired,
	posts: React.PropTypes.array.isRequired,
	totalPages: React.PropTypes.number.isRequired
};

export default connect(mapStateToProps, { fetchPosts })(PostsContainer);
