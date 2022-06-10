/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './home.scss'
import { motion } from 'framer-motion'
import HomeVideo from '../../assets/images/homebg.mp4'
import EarthVideo from '../../assets/images/The Beauty Of Earth.mp4'
import {
  titleparts,
  titlepartsES,
  beautifulplaces,
  beautifulplacesES,
  aboutworld,
  aboutworldES
} from '../../utilities/contents'
import Slider from '../../components/Slider/slider'
import PropTypes from 'prop-types'
import Contact from '../../components/Contact/contact'

const titlevars = {
  visible: (i) => ({
    top: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1
    }
  }),
  hidden: { opacity: 0 }
}

const subtitlevars = {
  visible: (i) => ({
    top: '50%',
    left: `${30 + i * 5}%`,
    transition: {
      delay: i * 0.1
    }
  }),
  hidden: { opacity: 0 }
}

export default function Home({ subtitle, language }) {
  const [title, setTitle] = useState(titleparts)

  const [mousePositionX, setMousePositionX] = useState(0)
  const [mousePositionY, setMousePositionY] = useState(0)
  const [showHover, setShowHover] = useState(false)
  const [srcHover, setSrcHover] = useState('../../assets/images/bg-home.jpg')

  const [aboutworldtxt, setAboutWorldTXT] = useState(aboutworld)

  const sepsubtitle = subtitle.split('')

  useEffect(() => {
    setTitle(language === 'es' ? titlepartsES : titleparts)
    setAboutWorldTXT(language === 'es' ? aboutworldES : aboutworld)
  }, [language])

  return (
    <>
      <section className="main-section">
        <video src={HomeVideo} autoPlay loop muted className="home_video" />
        <div className="bg_video" />
        <div className="dvtitle">
          {title.map(({ letter, image }, i) => (
            <motion.h1
              key={letter + i}
              custom={i}
              initial={{
                position: 'relative',
                top: i % 2 === 0 ? -500 : 500,
                opacity: 0
              }}
              animate="visible"
              variants={titlevars}
              className="title"
              onMouseMove={(e) => {
                setMousePositionX(e.clientX)
                setMousePositionY(e.clientY)
              }}
              onMouseEnter={() => {
                setShowHover(true)
                setSrcHover(image)
              }}
              onMouseLeave={() => setShowHover(false)}
            >
              {letter}
            </motion.h1>
          ))}
        </div>
        <motion.img
          src={srcHover}
          style={{
            transform: `translate(${mousePositionX}px, ${mousePositionY}px)`,
            visibility: showHover ? 'visible' : 'hidden',
            transition: 'transform 0.2s ease-out'
          }}
          className="hover__image"
        />
        <div className="dvsubtitle">
          {sepsubtitle.map((letter, i) => (
            <motion.h1
              key={letter + i}
              custom={i}
              initial={{ position: 'absolute', top: -50 }}
              animate="visible"
              variants={subtitlevars}
              className="ab-title"
            >
              {letter}
            </motion.h1>
          ))}
        </div>
      </section>
      <section className="second__section">
        <div className="about__earth">
          <div className="about__earthtxt">
            {aboutworldtxt.map((paragraph) => (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1
                }}
                transition={{ duration: 1 }}
                key={paragraph.slice(0, 3) + paragraph.slice(-3)}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          <div
            className="about__video"
            id="about__video"
            onDoubleClick={() => {
              document
                .getElementById('about__video')
                .classList.toggle('fullscreen')
            }}
          >
            <motion.video
              src={EarthVideo}
              autoPlay
              loop
              muted
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1
              }}
              transition={{ duration: 0.8 }}
            ></motion.video>
            <button
              className="video__btn"
              onClick={() => {
                document
                  .getElementById('about__video')
                  .classList.toggle('fullscreen')
              }}
            >
              X
            </button>
          </div>
        </div>
      </section>
      <Slider
        language={language}
        places={beautifulplaces}
        placesES={beautifulplacesES}
      />
      <Contact />
    </>
  )
}

Home.propTypes = {
  subtitle: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
}
