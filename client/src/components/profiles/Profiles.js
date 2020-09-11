import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './../layout/Loading';
import ProfileItem from './ProfileItem';
import { getProfiles } from './../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className='row justify-content-md-center mt-5'>
          <div className='col-3'></div>
          <div className='col-sm'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <div className='profiles-container'>
                  <div className='profile-item shadow'>
                    <ProfileItem key={profile._id} profile={profile} />
                  </div>
                </div>
              ))
            ) : (
              <h4>Not Found Profiles</h4>
            )}
          </div>
          <div className='col-3'></div>
        </div>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
