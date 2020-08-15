import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from './../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  const [row, setRow] = useState(1);

  const handleRows = () => {
    setRow(
      row <= 1 && text === '' ? row + 3 : row > 1 && text === '' ? row - 3 : row
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addComment(postId, { text });
        setText('');
      }}
    >
      <div className='comment-form'>
        <textarea
          className='form-control'
          name='text'
          cols='50'
          rows={row}
          placeholder='Comment'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onClick={handleRows}
        ></textarea>
        <input className='post-button' type='submit' value='submit' />
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
