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
          <div className='row justify-content-md-center '>
            <div className='col-3'></div>

            <div className='col-sm'>
              <div className='item shadow'>
                <div className='item-conteiner'>
                  <div className='item-body '>
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <div className='form__footer form__footer--btn'>
                      <div className='d-flex flex-row-reverse justify-content-between'>
                        <div className='post-buttons-wrapper'>
                          {auth.isAuthenticated &&
                            auth.loading === false &&
                            auth.user._id === profile.user._id && (
                              <div className='left-link'>
                                <Link
                                  className='btn btn--submit btn--posts'
                                  to='/edit-profile'
                                >
                                  Edit profile
                                </Link>
                              </div>
                            )}
                          <div className='right-link'>
                            <Link
                              className='btn btn--submit btn--posts'
                              to='/profiles'
                            >
                              Back to profiles
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-3'></div>
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
