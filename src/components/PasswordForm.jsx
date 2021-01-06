import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'

import database from '../api/firebase'

import PasswordImages from './PasswordImages'
import PasswordLength from './PasswordLength'

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
      <button className="button button--back" onClick={() => { changeEmail('') }}>Back</button>
      <div className="box-layout__box__info">
        <h2>{email}</h2>
        <p>{ !signUp ? 'Remember your password using images' : 'Create your password using images' }</p>
      </div>
      <PasswordImages signUp={signUp} images={images} handleReload={handleReload}/>
      <form className={!error ? 'form' : 'form form--error'} onSubmit={handleSubmit}>
        <div className="input-field">
          <p>Enter your password</p>
          <input onChange={handleUpdatePassword} name="password" type={ showPassword ? 'text' : 'password' } />
          { error && <p className="form--error__message">{error}</p> }
          <ReactIsCapsLockActive>
            { active => ( active && <p>Caps lock is active</p> ) }
          </ReactIsCapsLockActive>
          {/* <div onClick={handleShowPassword}>Show Password</div> */}
          { password &&
            <div className={ signUp ? 'form__strength' : 'form__strength form__strength--single' }>
              { signUp && <p className="form__strength__strong" >{ password.length >= 16 && 'Your password is secure!' }</p> }
              <PasswordLength password={password} signUp={signUp} />
            </div>
          }
        </div>
        <div className="form__buttons form__buttons--single">
          <button className={ password.length < 16 || disableButton ? 'button button--disabled' : 'button' } disabled={ password.length < 16 || disableButton }>{ !signUp ? 'Sign In' : 'Sign Up' }</button>
        </div>
      </form>
    </div>
  )
}

export default PasswordForm
