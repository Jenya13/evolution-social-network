import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from './../../actions/auth';
import SubBar from './SubBar';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='main-links-group'>
      <li>
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='main-links-group'>
      <li>
        <Link to='/profiles'>Profiles</Link>
      </li>
      <li>
        <Link to='/login'>Log in</Link>
      </li>
      <li>
        <Link to='/register'>Sign up</Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className='main-bar justify-content-between'>
        <div className='nav-title'>
          <h1>
            <Link to='/'>Evolution</Link>
          </h1>
        </div>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
      <div>
        {!loading && (
          <Fragment>
            {isAuthenticated ? <SubBar /> : <Fragment></Fragment>}
          </Fragment>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
