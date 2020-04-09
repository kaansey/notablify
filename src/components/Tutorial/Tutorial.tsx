import React from 'react'

import './Tutorial.scss'
const Tutorial = () => {
  return (
    <div>
      <div className="modalMask" />
      <div className="modalWrap">
        <div className="modal">
          <div className="modalContent">
            <div className="skipBtn">skip ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
