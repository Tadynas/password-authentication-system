import React from 'react'

import { useHistory } from 'react-router-dom'

const Intro = () => {
  const history = useHistory()

  const handleGetStarted = () => {
    history.push('/login')
  }
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <div className="box-layout__box__complete">
          <h1>Attention!</h1>
          <p>Following system is created to analyze new graphical authentication system. for Collected data will be used for statistics and will be deleted from the database one week after testing is completed.</p>
          <button className="button" onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Intro