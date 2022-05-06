import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import './slider.scss'

const INITIAL_SLIDER_IMAGE =
  'https://images.unsplash.com/photo-1589194858175-92ffb8ff1d92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1485&q=80'

export default function Slider({
  language,
  places,
  placesES
}) {
  const [mouseSliderPositionY, setMouseSliderPositionY] = useState(0)
  const [sliderImage, setSliderImage] = useState(INITIAL_SLIDER_IMAGE)
  const [beautifulp, setBeautifulP] = useState(places)

  useEffect(() => {
    setBeautifulP(language === 'es' ? placesES : places)
  }, [language])

  return (
    <section className="places__section">
      <div className="places__slider">
        <div
          className="places__sliderinner"
          onMouseMove={(e) => {
            setMouseSliderPositionY(
              Math.round((e.clientY / 10) * places.length + 10)
            )
          }}
          onMouseLeave={() => {
            setMouseSliderPositionY(mouseSliderPositionY * 0)
          }}
        >
          <div
            style={{
              backgroundImage: `url(${sliderImage})`,
              transition: 'background-image 0.5 ease-out'
            }}
            className="places__img"
          />
          <div
            className="places__names"
            style={{ transform: `translateY(${-mouseSliderPositionY}px)` }}
          >
            {beautifulp.map((place, i) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: i * 0.3 }}
                className="place__item"
                key={place.image}
                onMouseEnter={() => {
                  setSliderImage(place.image)
                }}
                onMouseLeave={() => {
                  setSliderImage(INITIAL_SLIDER_IMAGE)
                }}
              >
                <div className="place__description">
                  <span>{`0${i + 1}`}</span>
                  <span>{place.ubication}</span>
                </div>
                <h1 className="place__title">{place.name}</h1>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

Slider.propTypes = {
  language: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired,
  placesES: PropTypes.array.isRequired
}
