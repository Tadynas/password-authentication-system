import React, { useState } from 'react'

import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'

const SignUpPage = () => {

  const [email, setEmail] = useState('')

  const changeEmail = (newEmail) => {
    setEmail(newEmail)
  }

  return (
    <div>
      <h1>Sign Up</h1>
      { 
        !email ? 
          <EmailForm 
            signUp={true} 
            changeEmail={changeEmail} 
          /> 
        : 
          <PasswordForm 
            changeEmail={changeEmail}
          /> 
      }
    </div>
  )
}

export default SignUpPage
