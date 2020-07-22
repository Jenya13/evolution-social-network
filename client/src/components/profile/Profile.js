import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './../layout/Loading';
import { getProfileById } from './../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile == null || loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className='content-container'>
            <div className='list-item'>
              <div className='item-conteiner'>
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />

                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <div className='left-link'>
                      <Link className='button link' to='/edit-profile'>
                        Edit profile
                      </Link>
                    </div>
                  )}
                <div className='right-link'>
                  <Link className='button link' to='/profiles'>
                    Back to profiles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
