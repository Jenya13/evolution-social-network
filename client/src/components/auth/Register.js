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
    <Fragment>
      <div className='content-container'>
        <div>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <h1>Sign Up</h1>
            <p>Create your Account</p>

            <input
              className='text-input'
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />

            <input
              className='text-input'
              type='text'
              placeholder='Email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />

            <input
              className='text-input'
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              minLength='6'
            />

            <input
              className='text-input'
              type='password'
              placeholder='Confirm password'
              name='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => onChange(e)}
              minLength='6'
            />

            <div>
              <button className='button' onSubmit={onSubmit}>
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
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
