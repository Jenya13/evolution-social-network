import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div>
      {skills && (
        <Fragment>
          <h2>{name.trim().split(' ')[0]}'s Skils</h2>
          <div>
            {skills.map((skill, index) => (
              <div key={index}>{skill}</div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
