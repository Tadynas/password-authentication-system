import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import { BsChevronLeft } from "react-icons/bs";

const PasswordImages = ({ signUp, images, handleReload }) => {

  return (
    <div className="password-images">
      {images.map((image, index) => (
        <Zoom key={index} overlayBgColorEnd="rgba(0, 0, 0, 0.5)" zoomMargin={100}>
          <img src={image} width="100" />
        </Zoom>
      ))}
      { signUp && <button onClick={handleReload} className="password-images__reload">
        <BsChevronLeft />
      </button> }
    </div>
  )
}

export default PasswordImages
