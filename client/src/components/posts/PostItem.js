import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from './../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, user, comments, likes, date },
  showActions,
}) => (
  <div className='post-item'>
    <h4>{name}</h4>
    <p>{text}</p>
    <div className='post-footer '>
      {' '}
      <p>
        Posted at:{' '}
        <Moment className='date' format='DD/MM/YYYY'>
          {date}
        </Moment>
      </p>
      <div>
        {showActions && (
          <Fragment>
            <button
              className='button'
              onClick={(e) => addLike(_id)}
              type='button'
            >
              {' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <Link className='button-link' to={`/post/${_id}`}>
              {comments.length > 0 && <span>{comments.length} </span>}Comment
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button className='button' onClick={(e) => deletePost(_id)}>
                Delete
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  </div>
);

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
