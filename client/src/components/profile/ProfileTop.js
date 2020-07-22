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
      <div className='list-item-header'>
        <h3>img</h3>
        <h2>{name}</h2>
      </div>

      <p>
        {' '}
        <b> {status}</b>
      </p>
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
