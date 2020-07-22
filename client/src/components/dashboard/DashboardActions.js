import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <Fragment>
      <Link className='button-link' to='/edit-profile'>
        Edit Profile
      </Link>
    </Fragment>
  );
};

export default DashboardActions;
