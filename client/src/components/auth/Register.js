import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from './../../actions/alert';
import { register } from './../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('passwords do not mutch', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // redirect if authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='row justify-content-md-center mt-5'>
      <div className='col-3'></div>
      <div className='form-container'>
        <div className='col-sm'>
          <div className='item shadow'>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
              <div className='form__header'>
                <h1>Sign Up</h1>
              </div>

              <div className='inputs-container'>
                <p>Create Your Account</p>

                <div className='input-group mb-4'>
                  <input
                    className='text-input'
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div className='input-group mb-4'>
                  <input
                    className='text-input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div className='input-group mb-4'>
                  <input
                    className='text-input'
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={(e) => onChange(e)}
                    minLength='6'
                  />
                </div>

                <div className='input-group mb-4'>
                  <input
                    className='text-input'
                    type='password'
                    placeholder='Confirm password'
                    name='passwordConfirm'
                    value={passwordConfirm}
                    onChange={(e) => onChange(e)}
                    minLength='6'
                  />
                </div>
              </div>

              <div className='form__footer'>
                <div>
                  <button className='button btn--submit' onSubmit={onSubmit}>
                    Register
                  </button>
                </div>
                <p>
                  Already have an account?{' '}
                  <Link to='/login'>
                    {' '}
                    <small> Sign In </small>{' '}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='col-3'></div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
