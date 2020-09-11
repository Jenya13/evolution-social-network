import React, { Fragment } from 'react';
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
    <Fragment>
      <div className='profile-item__header'>
        <img
          src='/unknown-user.png'
          alt='unknown user'
          className='profile-item__image'
          style={{ width: '30px', margin: '0px 0px' }}
        />
        <div className='profile-item__name'>
          <h4>{name}</h4>
        </div>
      </div>

      <p>
        <b>Status: {status}</b>
      </p>

      <div className='profile-item__body'>
        <ul className='profile-item__skill-list'>
          <b>Skills: </b>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index}> {skill} </li>
          ))}
        </ul>
      </div>
      <div className='profile-item__footer'>
        <Link
          to={`/profile/${_id}`}
          className='btn btn--submit btn__link--right '
        >
          View Profile
        </Link>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
