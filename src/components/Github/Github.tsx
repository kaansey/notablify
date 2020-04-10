import React from 'react'

import githubIcon from '../../assets/images/github.svg'
import './Github.scss'

const Github = () => {
  return (
    <div className="github">
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/kaansey/notablify"
      >
        <img alt="github" src={githubIcon} />
      </a>
    </div>
  )
}

export default Github
