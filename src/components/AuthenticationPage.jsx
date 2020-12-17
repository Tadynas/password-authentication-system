import React, { useState } from 'react'

import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'

const AuthenticationPage = ({ signUp }) => {

  const [email, setEmail] = useState('')

  const changeEmail = (newEmail) => {
    setEmail(newEmail)
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
          /> 
      }
    </div>
  )
}

export default AuthenticationPage
