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
      <div className='row justify-content-md-center mt-5'>
        <div className='col-3 profile '>
          <h2 className='profile__header'>{user && user.name}</h2>
          <div className='profile__img'>
            <img
              src='/unknown-user.png'
              alt='unknown user'
              className='mr-3  rounded-circle '
              style={{ width: '100px', margin: '0px 0px' }}
            />
          </div>

          {profile !== null ? (
            <Fragment>
              <div className='profile__body'>
                <ul>
                  <li className='list-group-item'>
                    <DashboardActions />
                  </li>
                  <li class='list-group-item'>
                    <button
                      className='btn btn-profile'
                      onClick={() => deleteAccount()}
                    >
                      Delete Account
                    </button>
                  </li>
                </ul>
              </div>
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
        <div className='col-8'></div>
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
