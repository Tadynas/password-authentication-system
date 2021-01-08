import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { HiChevronLeft } from "react-icons/hi"

import database from '../api/firebase';

const EmailForm = ({ signUp, changeEmail }) => {

  const history = useHistory()
  const [error, setError] = useState('')

  const handleToSignIn = () => {
    setError('')
    history.push('/login')
  }

  const handleToSignUp = () => {
    setError('')
    history.push('/signup')    
  }
  
  const handleNext = (e) => {
    e.preventDefault()
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const email = e.target.elements.email.value.trim().toLowerCase()
    if(email === '') {
      setError('Email field cannot be empty!')
    } else if (!emailRegex.test(email)) {
      setError('Wrong email format!')
    } else {
      const encodedEmail = encodeURIComponent(email).replace(/\./g, '%2E')

      database.ref(`users/${encodedEmail}`)
      .once('value', (snapshot) => {
        if((signUp && !snapshot.exists()) || (!signUp && snapshot.exists())) {
          setError('')
          changeEmail(email)
        } else if(signUp) { 
          setError('User with this email already exists!')
        } else { 
          setError('There is no user associated with this email!')
        }
      })
    }
  }

  return (
    <form className={!error ? 'form' : 'form form--error'} onSubmit={handleNext}>
      { signUp && <button className="button button--back" onClick={handleToSignIn}>
        <HiChevronLeft className="button--back__icon" />
      </button> }
      <div className="input-field">
        <label htmlFor="email">Enter your email address</label>
        <input name="email" id="email" />
        { error && <p className="form__bottom__message">{error}</p> }
      </div>
      <div className={signUp ? 'form__buttons form__buttons--single' : 'form__buttons'}>
        { !signUp && <div className="button button--link" onClick={handleToSignUp}>Create Account</div> }
        <button className="button">Next</button>
      </div>
    </form>
  )
}

export default EmailForm
