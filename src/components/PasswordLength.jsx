import React, { useState, useEffect } from 'react'

const PasswordLength = ({ password, signUp }) => {

  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    if(password.length <= 16) {
      const strengthPercentage = (password.length / 16) * 100
      setPasswordStrength(strengthPercentage)
    }
  }, [password])

  return (
    <div className="password-length">
      { signUp && 
      <div className="progress-bar">
        <div className={  passwordStrength < 50 ? 'progress-bar__filler progress-bar__filler--weak' : 
                          passwordStrength < 100 ? 'progress-bar__filler progress-bar__filler--medium' :
                                                  'progress-bar__filler  progress-bar__filler--strong' } 
                          style={{ width: `${passwordStrength}%` }} />
      </div>
      }
      { password && <p>{ password.length }</p> }
    </div>
  )
}

export default PasswordLength