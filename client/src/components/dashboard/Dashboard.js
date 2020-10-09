import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteAccount,
  updateProfileImage,
} from './../../actions/profile';

import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';
import FileUpload from '../upload/FileUpload';
import { PROFILE_ERROR } from '../../actions/types';
import EditProfile from '../profile-forms/EditProfile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  const [item, setItem] = useState('Edit Avatar');

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const setImg = () => {
    let buff = Buffer(profile.avatar.data);
    let base64data = buff.toString('base64');
    return `data:image/jpg;base64,${base64data}`;
  };

  return loading && profile === null ? (
    <Loading />
  ) : (
    <Fragment>
      <div className='row justify-content-md-center mt-5'>
        <div className='col-3 profile '>
          <div className='profile__img'>
            {profile && profile.avatar ? (
              <img
                src={setImg()}
                alt='unknown user'
                className='  rounded-circle '
                style={{ width: '100px', margin: '0px 0px' }}
              />
            ) : (
              <img
                src='/unknown-user.png'
                alt='unknown user'
                className='mr-3  rounded-circle '
                style={{ width: '100px', margin: '0px 0px' }}
              />
            )}
          </div>
          <h2 className='profile__header'>{user && user.name}</h2>

          {profile !== null ? (
            <Fragment>
              <div className='profile__body'>
                <ul>
                  <li className='list-group-item'>
                    <button
                      className='btn btn-profile'
                      onClick={() => setItem('Edit Avatar')}
                    >
                      Edit Avatar
                    </button>
                  </li>
                  <li className='list-group-item'>
                    <button
                      className='btn btn-profile'
                      onClick={() => setItem('Edit Profile')}
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li className='list-group-item'>
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
        <div className=' col-8'>
          <div className='dashboard-container'>
            {item === 'Edit Avatar' && <FileUpload />}
            {item === 'Edit Profile' && <EditProfile />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  updateProfileImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  updateProfileImage,
})(Dashboard);
