import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
        <div className='post-item'>
          <Link to={`/profile/${user}`}></Link>
          <h4>{name}</h4>
          <p>{text}</p>
          <div className='post-footer '>
            <p>
              Posted on: <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
              <button
                className='button'
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
