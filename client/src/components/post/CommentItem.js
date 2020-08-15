import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from './../../actions/post';

const CommentItem = ({
  postId,
  deleteComment,
  comment: { _id, text, name, user, date },
  auth,
}) => {
  const [displayComment, toggleComment] = useState(true);

  return (
    <Fragment>
      {displayComment && (
        <div className='comment'>
          <div className='comment-header'>
            <div className='media'>
              <img
                src='/unknown-user.png'
                alt='unknown user'
                className='mr-3  rounded-circle'
                style={{ width: '20px', margin: '0px 0px' }}
              />
              <div className='media-body '>
                <h4>{name}</h4>
              </div>
            </div>
          </div>

          <div className='comment-body '>
            <p>{text}</p>
          </div>
          <div className='comment__footer '>
            <div className='d-flex align-items-center justify-content-between'>
              <p>
                <small>
                  <Moment fromNow>{date}</Moment>
                </small>
              </p>
              {!auth.loading && user === auth.user._id && (
                <button
                  className='post-button'
                  onClick={(e) => {
                    toggleComment(!displayComment);
                    deleteComment(postId, _id);
                  }}
                >
                  delete{' '}
                </button>
              )}
            </div>
          </div>
          <hr />
        </div>
      )}
    </Fragment>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
