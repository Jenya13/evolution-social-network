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
    <div className='list-item'>
      <div className='list-item-header'>
        <h3>img</h3>
        <h2>{name}</h2>
      </div>
      <p>
        <b>Status: {status}</b>
      </p>
      <div>
        <ul>
          <b>Skills: </b>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index}> {skill} </li>
          ))}
        </ul>
        <div className='list-item-footer '>
          <Link to={`/profile/${_id}`} className='button button-link'>
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
