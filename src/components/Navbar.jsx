'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logos/coursehab-high-resolution-logo-transparent.png';
import './navbar.css';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import {useTranslation} from 'react-i18next';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const {t} = useTranslation();
  const navLinks = [
    { name: 'navigation.home', path: '/' },
    { name: 'navigation.about', path: '/about' },
    { name: 'navigation.buy', path: '/buy' },
    { name: 'navigation.rent', path: '/rent' },
    { name: 'navigation.blog', path: '/blog' },
    { name: 'navigation.contact', path: '/contact' }
  ];
  return (
    <nav className="navbara">
      <div className="navbar-container">
        <div className="navbar-content">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image src={logo} alt="Coursehab Logo" width={200} height={40}/>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navLinks.map(({ name, path }) => (
            <Link key={name} href={path} className="nav-link">
               {t(name)}
            </Link>
          ))}
        </div>        
        </div>

        <div className="dropdown-container">

        {/*Language Dropdown */}
          <LanguageSwitcher />

        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="navbar-toggle">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="container-mobile" >
        <div className="overlay container-mobile" onClick={toggleMenu}></div>

        <div className="mobile-menu">
          {navLinks.map(({ name, path }) => (
            <Link key={name} href={path} onClick={toggleMenu} className="mobile-link">
                  {t(name)}
            </Link>
          ))}
          <div className="dropdown_container_phone">

        </div>
        </div>        
        </div>
      )}
    </nav>
  );
};

export default Navbar;
