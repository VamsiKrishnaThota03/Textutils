import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ title = 'TextUtils', aboutText = 'About', mode, handleOnClick }) {
  return (
    <nav className="navbar navbar-expand-md tu-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand tu-brand" to="/">
          <img src={`${process.env.PUBLIC_URL}/favicon.svg`} alt="" width="28" height="28" />
          {title}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link" end to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">{aboutText}</NavLink>
            </li>
          </ul>
          <div className="form-check form-switch mb-2 mb-md-0">
            <input className="form-check-input" type="checkbox" role="switch" id="darkModeSwitch" checked={mode === 'dark'} onChange={handleOnClick} />
            <label className="form-check-label" htmlFor="darkModeSwitch">Dark mode</label>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  aboutText: PropTypes.string,
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default Navbar;
