import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

function Navbar() {
  return (
    <div className={'navbar-component'}>
      <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
        <a className={'navbar-brand'} href="/#">
          Dualtiia
        </a>
        <button
          className={'navbar-toggler'}
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={'navbar-toggler-icon'}></span>
        </button>
        <div className={'collapse navbar-collapse'} id="navbarNav">
          <ul className={'navbar-nav'}>
            <li className={'nav-item active'}>
              <Link to="/values" className={'nav-link'}>
                Add Value!
              </Link>
            </li>
            <li className={'nav-item active'}>
              <Link to="/" className={'nav-link'}>
                CalculationsList
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
