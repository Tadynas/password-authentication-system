import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'

import { HiChevronLeft, HiOutlineQuestionMarkCircle } from "react-icons/hi"
import { FiEyeOff, FiEye, FiArrowUpCircle } from "react-icons/fi"

import database from '../api/firebase'

import PasswordImages from './PasswordImages'
import PasswordLength from './PasswordLength'

const PasswordForm = ({ email, changeEmail, signUp, images, handleReload }) => {

  const history = useHistory()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [error, setError] = useState('')
  const [errorCount, setErrorCount] = useState(0)

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
    console.log('veikia')
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
          setErrorCount((prevState) => prevState + 1)
          if(errorCount < 2) {
            setError('Provided password was incorrect!')
          } else if(errorCount < 5) {
            setError('Provided password was incorrect! Check if your email is correct.')
          } else {
            setError('Too many invalid attempts to login! Wait 1 hour and then try again.')
          }
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
    <div className="password-form">
      <button className="button button--back" onClick={() => { changeEmail('') }}>
       <HiChevronLeft className="button--back__icon" />
      </button>
      <div className="box-layout__box__info">
        <h2>{email}</h2>
        { !signUp ?
          <p>Remember your password using images</p>
        :
          <div className="box-layout__box__info__label">
            <p>Create your password using images</p>
            <div className="tooltip-group">
              <div className="tooltip tooltip--icon"><p>Take a look at the pictures and come up with a password. Next time, when you will try to sign in, same pictures will be shown to help you to remember your password.</p></div>
              <HiOutlineQuestionMarkCircle className="form__icon" />
            </div>
          </div>
        }
      </div>
      <PasswordImages signUp={signUp} images={images} handleReload={handleReload}/>
      <form className={!error ? 'form' : 'form form--error'} onSubmit={handleSubmit}>
        <div className="input-field">
          <div className="box-layout__box__info__label">
            <p>Enter your password</p>
            { signUp &&
              <div className="tooltip-group">
                <div className="tooltip tooltip--icon"><p>Password must contain at least 16 symbols. Use provided pictures to create a new password.</p></div>
                <HiOutlineQuestionMarkCircle className="form__icon" />
              </div>
            }
          </div>
          <div className="input-field__group">
            <input onChange={handleUpdatePassword} name="password" type={ showPassword ? 'text' : 'password' } />
            <div className="form__caps-lock-group tooltip-group">
              <div className="tooltip tooltip--icon tooltip--caps-lock"><p>Caps Lock is active!</p></div>
              <ReactIsCapsLockActive>
                  { active => ( active && <FiArrowUpCircle className="form__icon form__caps-lock-group__icon" /> ) }
              </ReactIsCapsLockActive>
            </div>
            <div onClick={handleShowPassword} className="form__show-password">
              {
                showPassword ? 
                  <FiEye className="form__show-password__icon" />
                :
                  <FiEyeOff className="form__show-password__icon" />
              }
            </div>
          </div>
          <div className="form__bottom">
            <p className="form__bottom__message">{ error && error }</p>
            { password &&
              <div className={ signUp ? 'form__bottom__strength' : 'form__bottom__strength form__bottom__strength--single' }>
                { signUp && <p className="form__bottom__strength__strong" >{ password.length >= 16 && 'Your password is secure!' }</p> }
                <PasswordLength password={password} signUp={signUp} />
              </div>
            }
          </div>
        </div>
        <div className="form__buttons form__buttons--single">
          <div className={ password.length < 16 ? 'tooltip-group' : '' }>
            <div className="tooltip"><p>Password is too short! <br /> Password must contain at least 16 symbols.</p></div>
            <button className={ password.length < 16 || disableButton ? 'button button--disabled' : 'button' } disabled={ password.length < 16 || disableButton }>{ !signUp ? 'Sign In' : 'Sign Up' }</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PasswordForm
