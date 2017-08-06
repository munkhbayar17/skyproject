import React from 'react';
import './TopNav.scss';
import logo from '../..//logo2.svg';
import burger from '../..//burger-menu.svg';

const TopNav = () => (
  <header className='header'>
    <a href="/">
      <img className='logo' alt="Skyscanner" src={logo}/>
    </a>
    <a href="#">
      <img className="burger-menu" src={burger}/>
    </a>
  </header>
);

export default TopNav;
