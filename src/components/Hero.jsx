import React from 'react'
import pedro from '../assets/pedro5.jpg'
const Hero = () => {
  return (
    <section className='home_hero'>
      <div className='ctn'>
      <figure>
        <img src={pedro} alt="photo de profil" ></img>
      </figure>
      <div className='content'>
        <h1>
        <span>Full Stack Web Developer</span>
        <br/>
        <span>Open To Opportunities</span>
        </h1>
        <p>Future professional web developper building interactive web products - ready to commit, learn, adapt and improve.
        I develop digital products from scratch
        </p>
      </div>
      </div>
    </section>
  )
}

export default Hero