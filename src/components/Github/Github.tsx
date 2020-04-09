import React from 'react'

import githubIcon from '../../assets/images/github.svg'
import './Github.scss'

const Github = () => {
  return (
    <div className="github">
      <a href="/#"><img alt="github" src={githubIcon} /></a>
    </div>
  )
}

export default Github
