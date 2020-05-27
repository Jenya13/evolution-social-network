import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, getCurrentProfile } from './../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  updateProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    website: '',
    status: '',
    skills: '',
    youtube: '',
    facebook: '',
    linkedin: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocilaInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      website: loading || !profile.website ? '' : profile.website,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [loading, getCurrentProfile]);

  const {
    website,
    status,
    skills,
    youtube,
    facebook,
    linkedin,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, history);
  };

  return (
    <Fragment>
      <h1>Create Your Profile</h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small>Could be your own or a company website</small>
        </div>
        <div>
          <input
            type='text'
            placeholder='Status'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
          />
          <small>Give us an idea where you are at your career</small>
        </div>
        <div>
          <input
            type='text'
            placeholder='Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small>Please use comma seperated values</small>
        </div>
        <div>
          <button
            onClick={() => toggleSocilaInputs(!displaySocialInputs)}
            type='button'
          >
            Add social network links
          </button>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
              <small>Your YouTube Cannel</small>
            </div>
            <div>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
              <small>Your facebook page</small>
            </div>
            <div>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
              <small>Your linkedin page</small>
            </div>
            <div>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
              <small>your instagram page</small>
            </div>
          </Fragment>
        )}

        <input type='submit' />
        <Link to='/dashboard'>Back</Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapstateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapstateToProps, { updateProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
