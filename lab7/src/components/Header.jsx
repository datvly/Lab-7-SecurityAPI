import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import { useAuthContext } from "@asgardeo/auth-react";
import '../styles/Header.css';

const Header = () => {
  const { name } = useAppContext();
  const { state, signOut } = useAuthContext();

  return (
    <header className="header">
      <h1>Welcome {name} to Codecraft Intranet</h1>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/EmployeeManagement" className="nav-link">Employee Management</Link>
        {state.isAuthenticated && (
          <button className="signout-btn" onClick={() => signOut()}>
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
