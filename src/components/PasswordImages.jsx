import React from 'react'

const PasswordImages = ({ signUp, images, handleReload }) => {

  return (
    <div>
      {images.map((image, index) => (
        <img key={index} src={`${image}`} />
      ))}
      { signUp && <button onClick={handleReload}>Reload</button> }
    </div>
  )
}

export default PasswordImages
