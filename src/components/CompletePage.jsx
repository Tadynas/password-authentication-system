import React from 'react'
import { useHistory } from 'react-router-dom'


const CompletePage = ({ signUp }) => {
  const history = useHistory()

  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1>Sign { !signUp ? 'In' : 'Up' }</h1>
        { signUp ? 
          <div className="box-layout__box__complete">
            <p>You have successfully created your account! <br /> Now you can sign in.</p>
            <button className="button" onClick={() => { history.push('/login') }}>Sign In</button>
          </div> 
        :
          <div className="box-layout__box__complete">
            <p>You have successfully signed in! <br /> Now you can go back to a survey.</p>
          </div> }
      </div>
    </div>
  )
}

export default CompletePage