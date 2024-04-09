import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Actions/User';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    alert('logout succesfully!')
  }

  return (
    <header className="header">
      <div className="logo">Ecommerce Store</div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link></li>
          <li><Link to="/myorders"><i className="fas fa-list-alt"></i> My Orders</Link></li>
          <li><Link to="/admin"><i className="fas fa-user-cog"></i> Admin</Link></li>
          <li><Link to="/profile"><i className="fas fa-user"></i> Profile</Link></li>
          {isAuthenticated ? (
            <li onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</li>
          ) : (
            <li><Link to="/login-signup"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
