/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './styles'
import { Navbar, Hero, About, Contact } from './components'

//if your React component only returns JSX, you can use an arrow function
//without the return statement and without the curly braces
const App = () => {
  return (
    <div className='bg-primary w-full overflow-hidden '>
      <h1>Pedro Contreras Avendano</h1>
      <Navbar />
      <Hero />
      <About />
      <Contact />
    </div>
  )
}

export default App