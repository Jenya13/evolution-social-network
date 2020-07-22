import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './../layout/Loading';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from './../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Loading />
  ) : (
    <div className='content-container'>
      <PostForm />
      <div>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
