import React from 'react';
import './TopNav.scss';
import logo from '../../icons//logo2.svg';
import burger from '../../icons//burger-menu.svg';

const TopNav = () => (
  <header className='header'>
    <a href="/">
      <img className='logo' alt="Skyscanner" src={logo}/>
    </a>
    <a href="#">
      <img className="burger-menu" alt="menu-button" src={burger}/>
    </a>
  </header>
);

export default TopNav;
