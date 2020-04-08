import React from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

import './LeftPanel.scss'

const LeftMenu = () => {
  const [editors] = useLocalStorage('notes', {})

  return (
    <div className="leftPanel">
      <div className="title">
        <div>Notes</div>
        <div className="closeIcon">X</div>
      </div>
      <div className="content">
        {Object.entries(editors).map(([key]: any) => {
          return <div className="item">{key}</div>
        })}
      </div>
    </div>
  )
}

export default LeftMenu
