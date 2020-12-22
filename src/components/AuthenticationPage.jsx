import React, { useState } from 'react'
import database from '../api/firebase'
import fetchNewImages from '../api/pexels'

import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'


const AuthenticationPage = ({ signUp }) => {

  const [email, setEmail] = useState('')
  const [images, setImages] = useState([])

  const loadImage = (image) => {
    return new Promise((resolve) => {
      const loadImg = new Image()
      loadImg.src = image
      loadImg.onload = () => resolve(image.url)
    })
  }

  const setImagesAndEmail = (images, email) => {
    Promise.all(images.map(image => loadImage(image))).then(() => {
      setImages(images)
      setEmail(email)
    })
  }

  const changeEmail = (newEmail) => {
    if(newEmail) {
      if(signUp) {
        fetchNewImages().then((newImages) => {
          setImagesAndEmail(newImages, newEmail)
        })
      } else {
        const encodedEmail = encodeURIComponent(newEmail).replace(/\./g, '%2E')
        database.ref(`users/${encodedEmail}/images`).once('value', (snapshot) => {
          setImagesAndEmail(snapshot.val(), newEmail)
        })
      }
    } else {
      setEmail('')
    }
  }

  const handleReload = () => {
    fetchNewImages().then((newImages) => {
      Promise.all(newImages.map(image => loadImage(image))).then(() => {
        setImages(newImages)
      })
    })
  }

  return (
    <div>
      <h1>Sign { !signUp ? 'In' : 'Up' }</h1>
      { 
        !email ? 
          <EmailForm 
            email={email}
            signUp={signUp} 
            changeEmail={changeEmail} 
          /> 
        : 
          <PasswordForm 
            email={email}
            signUp={signUp} 
            changeEmail={changeEmail}
            images={images}
            handleReload={handleReload}
          /> 
      }
    </div>
  )
}

export default AuthenticationPage
