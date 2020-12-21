import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import database from '../api/firebase';

const EmailForm = ({ signUp, changeEmail }) => {

  const history = useHistory()
  const [error, setError] = useState('')

  const handleToSignIn = () => {
    setError('')
    history.push('/')
  }

  const handleToSignUp = () => {
    setError('')
    history.push('/signup')    
  }
  
  const handleNext = (e) => {
    e.preventDefault()
    const emailRegex = /^[a-z0-9](\.?[a-z0-9]){5,}@[a-z0-9](\.?[a-z0-9]){3,}$/
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
    <div>
      { signUp && <button onClick={handleToSignIn}>Back</button> }
      <form onSubmit={handleNext}>
        <p>Enter your email</p>
        <input name="email" />
        { error && <p>{error}</p> }
        { !signUp && <button onClick={handleToSignUp}>Create Account</button> }
        <button>Next</button>
      </form>
    </div>
  )
}

export default EmailForm
