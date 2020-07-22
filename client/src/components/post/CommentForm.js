import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from './../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-container'>
      <div>
        <h3 className='form-header'>Leave comment</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          className='text-area'
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input className='button submit' type='submit' value='submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
