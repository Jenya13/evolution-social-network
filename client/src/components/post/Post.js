import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from './../../actions/post';
import Loading from './../layout/Loading';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, id }) => {
  useEffect(() => {
    getPost(id);
  }, [getPost]);

  return loading || post === null ? (
    <Loading />
  ) : (
    <Fragment>
      {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
