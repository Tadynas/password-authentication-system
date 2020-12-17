import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const EmailForm = () => {

  const [error, setError] = useState('')
  
  const handleNext = (e) => {
    e.preventDefault()
    console.log(e.target.elements.email.value)
  }

  return (
    <form onSubmit={handleNext}>
      <input name="email" />
      <p>{error}</p>
      <Link to="/signup">Create account</Link>
      <button>Next</button>
    </form>
  )
}

export default EmailForm
