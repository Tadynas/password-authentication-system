import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const EmailForm = ({ signUp, changeEmail }) => {

  const [error, setError] = useState('')
  
  const handleNext = (e) => {
    e.preventDefault()
    const emailRegex = /^[a-z0-9](\.?[a-z0-9]){5,}@[a-z0-9](\.?[a-z0-9]){3,}$/
    const email = e.target.elements.email.value.trim().toLowerCase()
    if(email === '') {
      setError('Email field cannot be empty!')
    } else if (!emailRegex.test(email)) {
      setError('Wrong email format!')
    } else {
      setError('')
      changeEmail(email)
    }
  }

  return (
    <div>
      { signUp && <Link to="/">Back</Link> }
      <form onSubmit={handleNext}>
        <p>Enter your email</p>
        <input name="email" />
        { error && <p>{error}</p> }
        { !signUp && <Link to="/signup">Create account</Link> }
        <button>Next</button>
      </form>
    </div>
  )
}

export default EmailForm
