import React, { useState } from 'react'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'

import PasswordImages from './PasswordImages'

const PasswordForm = ({ email, changeEmail, signUp }) => {

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleUpdatePassword = (e) => {
    const updatedPassword = e.target.value
    setPassword(updatedPassword)
  }

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div>
      <button onClick={() => { changeEmail('') }}>Back</button>
      <h4>{email}</h4>
      <p>{ !signUp ? 'Remember your password using images' : 'Create your password using images' }</p>
      <PasswordImages signUp={signUp} />
      <form>
        <p>Enter your password</p>
        <input onChange={handleUpdatePassword} type={ showPassword ? 'text' : 'password' } />
        <ReactIsCapsLockActive>
          { active => ( active && <p>Caps lock is active</p> ) }
        </ReactIsCapsLockActive>
        <div onClick={handleShowPassword}>Show Password</div>
        { signUp && password && <p>{ password.length < 16 ? 'Your password is too short!' : 'Your password is secure!'}</p> }
        { password && <p>{ password.length }</p> }
        <button disabled={ password.length < 16 }>{ !signUp ? 'Sign In' : 'Sign Up' }</button>
      </form>
    </div>
  )
}

export default PasswordForm
