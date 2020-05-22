import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name },
    status,
    skills,
  },
}) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{status}</p>
      <Link to={`/profile/${_id}`}>View Profile</Link>
      <div>
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index}> {skill} </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
