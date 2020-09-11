import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from './../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form shadow'>
      <div className='post-form-body'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
            setText('');
          }}
        >
          <div className='form-group'>
            <textarea
              className='form-control form-control-lg'
              name='text'
              cols='30'
              rows='5'
              placeholder='Post Something...'
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          <input className='btn btn--submit' type='submit' value='submit' />
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
