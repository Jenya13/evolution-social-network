import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    website,
    social,
    user: { name },
  },
}) => {
  return (
    <Fragment>
      <div className='item-header'>
        <div className='media'>
          <img
            src='/unknown-user.png'
            alt='unknown user'
            className='mr-3  rounded-circle'
            style={{ width: '30px', margin: '0px 0px' }}
          />
          <div className='media-body '>
            <h4>{name}</h4>
          </div>
        </div>
      </div>
      <hr />

      <h2>
        {' '}
        <b> {status}</b>
      </h2>
      <div className='links-container'>
        {website && (
          <div className='container'>
            <a
              className='button link'
              href={website}
              target='_blank'
              rel='noopener noreferrer'
            >{`Visit ${name}'s website`}</a>
          </div>
        )}

        {social && social.youtube && (
          <div className='container'>
            <a
              className='button link'
              href={social.youtube}
              target='_blank'
              rel='noopener noreferrer'
            >{`${name}'s youtube`}</a>
          </div>
        )}

        {social && social.facebook && (
          <div className='container'>
            <a
              className='button link'
              href={social.facebook}
              target='_blank'
              rel='noopener noreferrer'
            >{`${name}'s facebook`}</a>
          </div>
        )}

        {social && social.instagram && (
          <div className='container'>
            <a
              className='button link'
              href={social.instagram}
              target='_blank'
              rel='noopener noreferrer'
            >{`${name}'s instagram`}</a>
          </div>
        )}

        {social && social.linkedin && (
          <div className='container'>
            <a
              className='button link'
              href={social.linkedin}
              target='_blank'
              rel='noopener noreferrer'
            >{`${name}'s linkedin`}</a>
          </div>
        )}
      </div>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
