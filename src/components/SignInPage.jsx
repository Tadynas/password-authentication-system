import React, { useState } from 'react'

import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'

const SignInPage = () => {

  const [email, setEmail] = useState('')

  const changeEmail = (newEmail) => {
    setEmail(newEmail)
  }

  return (
    <div>
      <h1>Sign In</h1>
      { 
        !email ? 
          <EmailForm 
            signUp={false} 
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

export default SignInPage
