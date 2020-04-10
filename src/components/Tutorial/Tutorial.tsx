import React from 'react'
import demo from '../../assets/demo.gif'
import useLocalStorage from '../../hooks/useLocalStorage'

import './Tutorial.scss'

const Tutorial = () => {
  const [showTutorial, setShowTutorial] = useLocalStorage(
    'showTutorial',
    'true'
  )

  const onClose = () => {
    setShowTutorial('false')
  }

  if (showTutorial === 'false') {
    return null
  }

  return (
    <div>
      <div className="modalMask" />
      <div className="modalWrap">
        <div className="modal">
          <div className="modalContent">
            <div className="closeBtn closeIcon" onClick={onClose}>
              X
            </div>
            <div className="tutorial">
              Tiny Note-Taking Application.
              <img alt="tutorial" src={demo} />
            </div>
            <div className="closeBtn skipBtn" onClick={onClose}>
              skip >
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
