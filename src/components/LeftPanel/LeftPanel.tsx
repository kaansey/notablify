import React, { useState } from 'react'
import cx from 'classnames'

import useLocalStorage from '../../hooks/useLocalStorage'
import { LS_NOTES_KEY } from '../../constants'
import deleteIcon from '../../assets/images/delete.svg'
import MenuBtn from './MenuBtn'

import './LeftPanel.scss'

interface LeftMenuProps {
  onDeleteNote(id: string): () => void
}

const LeftMenu: React.SFC<LeftMenuProps> = ({ onDeleteNote }) => {
  const [notes] = useLocalStorage(LS_NOTES_KEY, {})
  const [isOpen, setIsOpen] = useState(true)

  const onMenuBtnClick = () => {
    setIsOpen(!isOpen)
  }

  const scrollTo = (x: number, y: number) => () => {
    window.scrollTo({
      top: y - window.innerHeight / 2,
      left: x - window.innerWidth / 2,
      behavior: 'smooth',
    })
  }

  return (
    <div className={cx('leftPanel', { close: !isOpen })}>
      <div className="title">
        {isOpen && <div>Notes</div>}

        <MenuBtn isOpen={isOpen} onClick={onMenuBtnClick} />
      </div>
      {isOpen && (
        <div className="content">
          {Object.entries(notes).map(([key, value]: any) => {
            return (
              <div key={key} className="item">
                <div
                  className="name"
                  onClick={scrollTo(value.boxLeft, value.boxTop)}
                >
                  {key}
                </div>
                <div className="deleteIcon" onClick={onDeleteNote(key)}>
                  <img alt="delete" src={deleteIcon} />
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
