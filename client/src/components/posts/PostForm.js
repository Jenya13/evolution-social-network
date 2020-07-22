import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from './../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-container'>
      <h3 className='form-header'>say something..</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
