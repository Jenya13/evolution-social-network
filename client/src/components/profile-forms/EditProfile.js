import React, { useState, Fragment, useEffect } from 'react';
// import { Link, withRouter } from 'react-router-dom';
import Loading from './../layout/Loading';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, getCurrentProfile } from './../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  updateProfile,
  getCurrentProfile,
  // history,
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
    updateProfile(formData);
  };

  return loading && profile === null ? (
    <Loading />
  ) : (
    <Fragment>
      <div className='row justify-content-md-center '>
        <div className='col-3'></div>
        <div className='form-container'>
          <div className='col-sm'>
            <div className='item shadow'>
              <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form__header'>
                  <h1>Edit Profile</h1>
                </div>

                <div className='inputs-container'>
                  <div className='text-input__item--profile'>
                    <input
                      className='text-input'
                      type='text'
                      placeholder='Website'
                      name='website'
                      value={website}
                      onChange={(e) => onChange(e)}
                    />
                    <small>* Could be your own or a company website</small>
                  </div>
                  <div className='text-input__item--profile'>
                    <input
                      className='text-input'
                      type='text'
                      placeholder='Status'
                      name='status'
                      value={status}
                      onChange={(e) => onChange(e)}
                    />

                    <small>
                      * Give us an idea where you are at your career
                    </small>
                  </div>
                  <div className='text-input__item--profile'>
                    <input
                      className='text-input'
                      type='text'
                      placeholder='Skills'
                      name='skills'
                      value={skills}
                      onChange={(e) => onChange(e)}
                    />
                    <small style={{ color: 'red' }}>
                      * Please use comma seperated values
                    </small>
                  </div>

                  <div className='text-input__item--profile'>
                    <button
                      className='btn btn--submit '
                      onClick={() => toggleSocilaInputs(!displaySocialInputs)}
                      type='button'
                    >
                      Add social network links
                    </button>
                  </div>

                  {displaySocialInputs && (
                    <Fragment>
                      <div className='text-input__item--profile'>
                        <input
                          className='text-input'
                          type='text'
                          placeholder='YouTube URL'
                          name='youtube'
                          value={youtube}
                          onChange={(e) => onChange(e)}
                        />
                        <small>* Your YouTube Channel</small>
                      </div>
                      <div className='text-input__item--profile'>
                        <input
                          className='text-input'
                          type='text'
                          placeholder='Facebook URL'
                          name='facebook'
                          value={facebook}
                          onChange={(e) => onChange(e)}
                        />
                        <small>* Your facebook page</small>
                      </div>
                      <div className='text-input__item--profile'>
                        <input
                          className='text-input'
                          type='text'
                          placeholder='Linkedin URL'
                          name='linkedin'
                          value={linkedin}
                          onChange={(e) => onChange(e)}
                        />

                        <small>* Your linkedin page</small>
                      </div>
                      <div className='text-input__item--profile'>
                        <input
                          className='text-input'
                          type='text'
                          placeholder='Instagram URL'
                          name='instagram'
                          value={instagram}
                          onChange={(e) => onChange(e)}
                        />

                        <small>* Your instagram page</small>
                      </div>
                    </Fragment>
                  )}
                  <div className='form__footer form__footer--btn'>
                    <div className='d-flex flex-row-reverse justify-content-between'>
                      <div className='post-buttons-wrapper'>
                        <div>
                          <input
                            className='btn btn--submit btn--posts'
                            type='submit'
                            value='Edit'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='col-3'></div>
      </div>
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
  EditProfile
); //withRouter(EditProfile)
