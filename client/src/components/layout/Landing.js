import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section>
      <div>
        <h1>healthy people connector</h1>
        <p>talk to other people who interesting to improve their lives</p>
        <div>
          <div>
            <Link to='/register'>Sign Up</Link>
          </div>
          <div>
            <Link to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToPorops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToPorops)(Landing);
