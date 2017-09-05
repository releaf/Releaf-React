import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions';
import Project from '../components/Project';
import { initScrolling } from '../actions/navigation';

// Smart component
class ProjectsPageContainer extends Component {
	componentWillMount() {
		const {
			fetchPosts, pageNum = 1, postType = 'project', postsPerPage = 100
		} = this.props;

		fetchPosts(pageNum, postType, postsPerPage);
	}

	componentDidMount() {
		this.props.toggleScrolling(false /* enabled */);
	}

	buildPosts(posts) {
		return posts.map(post =>
			<Project post={post} key={post.id} />
		);
	}

	handlePaginationClick(pageNum) {
		console.log('pagination clicked');

		this.props.fetchPosts(pageNum, this.props.postType, this.props.postsPerPage);
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
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="article-listing">
							{this.buildPosts(posts)}
							{this.buildPagination(parseInt(pageNum, 10), totalPages)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => (
	{
		posts: state.posts.posts,
		pageNum: state.posts.pageNum,
		totalPages: state.posts.totalPages
	}
);

const mapDispatchToProps = (dispatch) => (
	{
		toggleScrolling: (enabled) => {
			dispatch(initScrolling(enabled));
		},
		fetchPosts: (pageNum, postType, postsPerPage) => {
			dispatch(fetchPosts(pageNum, postType, postsPerPage));
		}
	}
);


ProjectsPageContainer.propTypes = {
	fetchPosts: React.PropTypes.func.isRequired,
	pageNum: React.PropTypes.number.isRequired,
	posts: React.PropTypes.array.isRequired,
	totalPages: React.PropTypes.number.isRequired,
	postsPerPage: React.PropTypes.number.isRequired,
	postType: React.PropTypes.string.isRequired,
	toggleScrolling: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPageContainer);
