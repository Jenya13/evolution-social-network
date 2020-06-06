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
      <div className=' landing '>
        <h1 className='page-header__title'>Healthy People Connector</h1>
        <p className='landing__text'>
          talk to other people who interesting to improve their lives
        </p>
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
