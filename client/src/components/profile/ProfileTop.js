import React from 'react';
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
    <div>
      <h1>{name}</h1>
      <p>{status}</p>
      <div>
        {website && (
          <a
            href={website}
            target='_blank'
            rel='noopener noreferrer'
          >{`Visit ${name}'s website`}</a>
        )}

        {social && social.youtube && (
          <a
            href={social.youtube}
            target='_blank'
            rel='noopener noreferrer'
          >{`${name}'s youtube`}</a>
        )}

        {social && social.facebook && (
          <a
            href={social.facebook}
            target='_blank'
            rel='noopener noreferrer'
          >{`${name}'s facebook`}</a>
        )}

        {social && social.instagram && (
          <a
            href={social.instagram}
            target='_blank'
            rel='noopener noreferrer'
          >{`${name}'s instagram`}</a>
        )}

        {social && social.linkedin && (
          <a
            href={social.linkedin}
            target='_blank'
            rel='noopener noreferrer'
          >{`${name}'s linkedin`}</a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
