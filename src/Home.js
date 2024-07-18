import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/create-identity">Create Identity</Link>
          </li>
          <li>
            <Link to="/verify-account">Verify Account</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
