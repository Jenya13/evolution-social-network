import React from 'react';
import { Link } from 'react-router-dom';

const SubBar = () => {
  return (
    <ul className='sub-bar sub-links-group justify-content-center'>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          My Profile
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link active' to='/posts'>
          Posts
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/profiles'>
          Profiles
        </Link>
      </li>
    </ul>
  );
};

export default SubBar;
