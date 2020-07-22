import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from './../../actions/profile';
import DashboardActions from './../dashboard/DashboardActions';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Loading />
  ) : (
    <Fragment>
      <div className='content-container'>
        <h2>Welcome {user && user.name}</h2>

        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <br />
            <button className='button' onClick={() => deleteAccount()}>
              Delete Account
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not setup a profile yet, please add some info </p>
            <Link className='button-link' to='/create-profile'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
