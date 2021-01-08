import React from 'react'

import { useHistory } from 'react-router-dom'

const Intro = () => {
  const history = useHistory()

  const handleGetStarted = () => {
    history.push('/login')
  }
  return (
    <div className="box-layout">
      <div className="box-layout__box box-layout__box--intro">
        <h1>Attention!</h1>
        <div className="box-layout__box__complete">
          <p>
            Following system is created for university project to balance usability and security in password based authentication system.
            This is an imitation of real life email authentication system.
            <br /> <br />
            Collected data will be used for statistics and will be deleted from the database one week after testing is completed.
          </p>
          <p style={{ color: 'red' }}>Please, do not use your real password while creating new account!</p>
          <button className="button" onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Intro