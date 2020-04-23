import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
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
export default Landing;
