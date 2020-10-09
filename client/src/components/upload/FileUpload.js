import { connect } from 'react-redux';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { updateProfileImage } from './../../actions/profile';

export const FileUpload = ({ updateProfileImage }) => {
  const [file, setFile] = useState('');

  const [filename, setFilename] = useState('Choose file');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', file);
    updateProfileImage(formData);
    setFilename('Choose file');
  };

  return (
    <Fragment>
      <form className='fileUploadForm' onSubmit={onSubmit}>
        <div className='input-group shadow'>
          <div className='custom-file'>
            <input type='file' id='customFile' onChange={onChange} />
            <label className='custom-file-label' htmlFor='customFile'>
              {filename}
            </label>
          </div>
          <div className='input-group-append'>
            <button
              className='btn btn--upload'
              type='button'
              onClick={onSubmit}
            >
              Upload
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

FileUpload.propTypes = {
  updateProfileImage: PropTypes.func.isRequired,
};

export default connect(null, { updateProfileImage })(FileUpload);
