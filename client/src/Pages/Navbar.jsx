// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  return (
    <header>
      <ul className='navbar-ul'>
        <li>
          <Link to="/">
            <h3>Inicio</h3>
          </Link>
        </li>
        <h1>ESCRITOS</h1>
        <li>
          <Link to="/perfil">
            <h3>Perfil</h3>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
