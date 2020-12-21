import React from 'react'
import Image from '../images/825-200x200.jpg'

const PasswordImages = ({ signUp }) => {
  return (
    <div>
      {/* <img src="https://source.unsplash.com/random/500x500" />
      <img src="https://source.unsplash.com/random/500x500"/>
      <img src="https://source.unsplash.com/random/500x500"/>
      <img src="https://source.unsplash.com/random/500x500"/> */}
      { signUp && <button>Reload</button> }
    </div>
  )
}

export default PasswordImages
