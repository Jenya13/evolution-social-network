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
}) => (
  <div>
    <h4>{name}</h4>
    <p>{text}</p>
    <p>
      Posted at: <Moment format='YYYY/MM/DD'>{date}</Moment>
    </p>
    <button onClick={(e) => addLike(_id)} type='button'>
      {likes.length > 0 && <span>{likes.length}</span>}
    </button>
    <Link to={`/post/${_id}`}>
      <p>Comments </p> {comments.length > 0 && <span>{comments.length}</span>}
    </Link>
    {!auth.loading && user === auth.user._id && (
      <button onClick={(e) => deletePost(_id)}>Delete</button>
    )}
  </div>
);

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
