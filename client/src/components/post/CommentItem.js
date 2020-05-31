import React, { Fragment } from 'react';
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
}) => (
  <div>
    <div>
      <Link to={`/profile/${user}`}></Link>
      <h4>{name}</h4>
    </div>
    <div>
      <p>{text}</p>
      <p>
        Posted on: <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button onClick={(e) => deleteComment(postId, _id)}>delete </button>
      )}
    </div>
  </div>
);

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
