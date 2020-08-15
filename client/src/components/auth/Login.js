import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from './../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // redirect if logged in
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
                <h1>Sign In</h1>
              </div>

              <div className='inputs-container'>
                <p>Sign Into Account</p>
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
                    className='text-input '
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={(e) => onChange(e)}
                    minLength='6'
                  />
                </div>
              </div>
              <div className='form__footer'>
                <div>
                  <button className='button btn--submit' onSubmit={onSubmit}>
                    Login
                  </button>
                </div>
                <p>
                  Don't have an account?{' '}
                  <Link to='/Register'>
                    <small>Sign Up </small>{' '}
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
