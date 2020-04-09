import React, { useState } from 'react'
import cx from 'classnames'

import useLocalStorage from '../../hooks/useLocalStorage'
import { LS_NOTES_KEY } from '../../constants'
import MenuBtn from './MenuBtn'

import './LeftPanel.scss'

const LeftMenu = ({ onDeleteNote }) => {
  const [notes] = useLocalStorage(LS_NOTES_KEY, {})
  const [isOpen, setIsOpen] = useState(true)

  const onMenuBtnClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={cx('leftPanel', { close: !isOpen })}>
      <div className="title">
        {isOpen && <div>Notes</div>}

        <MenuBtn isOpen={isOpen} onClick={onMenuBtnClick} />
      </div>
      {isOpen && (
        <div className="content">
          {Object.entries(notes).map(([key]: any) => {
            return (
              <div className="item">
                <div className="name">{key}</div>
                <div className="deleteIcon" onClick={onDeleteNote(key)}>
                  x
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LeftMenu
