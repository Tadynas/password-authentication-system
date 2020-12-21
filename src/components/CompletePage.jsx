import React from 'react'
import { Link } from 'react-router-dom'

const CompletePage = ({ signUp }) => {
  return (
    <div>
      <h1>Sign { !signUp ? 'In' : 'Up' }</h1>
      { signUp ? 
        <div>
          <p>You have successfully created your account!</p>
          <p>Now you can sign in.</p>
          <Link to="/">Sign In</Link>
        </div> 
      :
        <div>
          <p>You have successfully signed in!</p>
          <p>Now you can go back to a survey.</p>
        </div> }
    </div>
  )
}

export default CompletePage