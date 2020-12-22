import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'

import database from '../api/firebase'

import PasswordImages from './PasswordImages'

const PasswordForm = ({ email, changeEmail, signUp, images, handleReload }) => {

  const history = useHistory()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [error, setError] = useState('')

  const handleUpdatePassword = (e) => {
    setError('')

    const updatedPassword = e.target.value
    setPassword(updatedPassword)
  }

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()    
    setDisableButton(true)
    const encodedEmail = encodeURIComponent(email).replace(/\./g, '%2E')
    const password = e.target.elements.password.value
    const encodedPassword = encodeURIComponent(password).replace(/\./g, '%2E')
    
    if(signUp) {
      database.ref(`users/${encodedEmail}/`).set({
        password: encodedPassword,
        incorrectCounter: 0,
        images: images
      })
      .then(() => {
        history.push('/signup/complete')
      })
      .catch(() => {
        setError('Something went wrong! Try again.')
        setDisableButton(false)
      });
    } else {
      database.ref(`users/${encodedEmail}/password`).once('value', (snapshot) => {
        if(snapshot.val() === encodedPassword) {
          history.push('/complete')
        } else {
          setDisableButton(false)
          setError('Provided password was incorrect!')
          database.ref(`users/${encodedEmail}/incorrectCounter`).once('value', (snapshot) => {
            database.ref(`users/${encodedEmail}/incorrectCounter`).set(snapshot.val() + 1)
          })
        }
      })
      .catch(() => {
        setError('Something went wrong! Try again.')
        setDisableButton(false)
      });
    }
  }

  return (
    <div>
      <button onClick={() => { changeEmail('') }}>Back</button>
      <h4>{email}</h4>
      <p>{ !signUp ? 'Remember your password using images' : 'Create your password using images' }</p>
      <PasswordImages signUp={signUp} images={images} handleReload={handleReload}/>
      <form onSubmit={handleSubmit}>
        <p>Enter your password</p>
        <input onChange={handleUpdatePassword} name="password" type={ showPassword ? 'text' : 'password' } />
        { error && <p>{error}</p> }
        <ReactIsCapsLockActive>
          { active => ( active && <p>Caps lock is active</p> ) }
        </ReactIsCapsLockActive>
        <div onClick={handleShowPassword}>Show Password</div>
        { signUp && password && <p>{ password.length < 16 ? 'Your password is too short!' : 'Your password is secure!'}</p> }
        { password && <p>{ password.length }</p> }
        <button disabled={ password.length < 16 || disableButton }>{ !signUp ? 'Sign In' : 'Sign Up' }</button>
      </form>
    </div>
  )
}

export default PasswordForm
