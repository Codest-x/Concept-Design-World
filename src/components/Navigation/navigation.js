import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './navigation.scss'
import PropTypes from 'prop-types'

export default function Navigation({ language }) {
  const [active, setActive] = useState(false)
  const handleMenuClick = () => {
    setActive(!active)
  }

  const NavLinks = [
    {
      title: language === 'en' ? 'Home' : 'inicio',
      path: '/'
    },
    {
      title: language === 'en' ? 'Explore' : 'Explorar',
      path: '/explore'
    },
    {
      title: language === 'en' ? 'About Creator' : 'Creador',
      path: '/creator'
    }
  ]

  return (
    <nav className="navigation">
      <div className={`nav__links ${active ? 'active' : ''}`}>
        {NavLinks.map((link, i) => (
          <motion.li
            initial={{ opacity: 0, left: -300, scale: 0 }}
            animate={{
              opacity: 1,
              left: 0,
              scale: 1,
              transition: { duration: i * 0.2 }
            }}
            key={link.title}
            className={link.path === window.location.pathname ? 'active' : ''}
          >
            <Link to={link.path}>{link.title}</Link>
          </motion.li>
        ))}
        <motion.li
          onClick={() => {
            localStorage.getItem('language') === 'en'
              ? localStorage.setItem('language', 'es')
              : localStorage.setItem('language', 'en')
            window.dispatchEvent(new Event('storage'))
          }}
        >
          <span
            style={{
              color: '#e5e5e5',
              fontFamily: 'Getaway, sans serif',
              fontSize: '18px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            {language === 'en' ? 'Change Language' : 'Cambiar idioma'}
          </span>
        </motion.li>
      </div>
      <div>
        <motion.div
          className="nav__mouse"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <label className="nav__btnmenu" htmlFor="nav__btnmenu">
          <input type="checkbox" id="nav__btnmenu" onClick={handleMenuClick} />
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
    </nav>
  )
}

Navigation.propTypes = {
  language: PropTypes.string.isRequired
}
