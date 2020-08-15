import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from './../../actions/post';
import CommentForm from './../post/CommentForm';
import Post from '../post/Post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, user, comments, likes, date },
  showActions,
}) => {
  const [commentsState, setComments] = useState(false);

  return (
    <div className='item shadow'>
      <Fragment>
        <div className='item-header'>
          <div className='media'>
            <img
              src='/unknown-user.png'
              alt='unknown user'
              className='mr-3  rounded-circle'
              style={{ width: '30px', margin: '0px 0px' }}
            />
            <div className='media-body '>
              <h4>{name}</h4>
            </div>
          </div>
        </div>
        <hr />
      </Fragment>
      <div className='item-body'>
        <p>{text}</p>
      </div>
      <hr />
      <div>
        {' '}
        <div className='item-footer'>
          <div className='d-flex align-items-center justify-content-between'>
            <p>
              {' '}
              <small>
                <Moment fromNow>{date}</Moment>
              </small>
            </p>

            <div className='post-buttons-wrapper'>
              {showActions && (
                <Fragment>
                  {' '}
                  <button
                    className='post-button'
                    onClick={(e) => addLike(_id)}
                    type='button'
                  >
                    {likes.length === 0 ? (
                      <span> {likes.length} likes</span>
                    ) : (
                      likes.length > 0 && <span> {likes.length} likes</span>
                    )}
                  </button>
                  <button
                    className='post-button'
                    onClick={() => setComments(!commentsState)}
                  >
                    {comments.length > 0 && <span>{comments.length} </span>}
                    Comments
                  </button>
                  {!auth.loading && user === auth.user._id && (
                    <button
                      className='post-button'
                      onClick={(e) => deletePost(_id)}
                    >
                      Delete
                    </button>
                  )}
                </Fragment>
              )}
            </div>
          </div>
          <hr />
          <CommentForm postId={_id} />
          <hr />
          {commentsState && <Post id={_id} />}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
