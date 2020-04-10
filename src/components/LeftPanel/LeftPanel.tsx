import React, { useState } from 'react'
import cx from 'classnames'

import useLocalStorage from '../../hooks/useLocalStorage'
import { LS_NOTES_KEY } from '../../constants'
import deleteIcon from '../../assets/images/delete.svg'
import searchIcon from '../../assets/images/search.svg'
import MenuBtn from './MenuBtn'

import './LeftPanel.scss'

interface LeftMenuProps {
  onDeleteNote(id: string): () => void
}

const LeftMenu: React.SFC<LeftMenuProps> = ({ onDeleteNote }) => {
  const [notes, setNotes] = useLocalStorage(LS_NOTES_KEY, {})
  const [isOpen, setIsOpen] = useState(false)

  const deleteAll = () => {
    Object.keys(notes).forEach(id => {
      localStorage.removeItem(`${id}-mde`)
    })
    setNotes({})
  }

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

  const nothingFound = Object.keys(notes).length === 0

  return (
    <div className={cx('leftPanel', { close: !isOpen })}>
      <div className="title">
        {isOpen && <div>Notes</div>}

        <MenuBtn isOpen={isOpen} onClick={onMenuBtnClick} />
      </div>

      <div className="content">
        {isOpen ? (
          nothingFound ? (
            <div className="nothingFound">
              <div className="searchIcon">
                <img alt="search" src={searchIcon} />
              </div>
              Nothing Found
            </div>
          ) : (
            <div>
              <div className="deleteAll">
                <span onClick={deleteAll}>Delete All</span>
              </div>
              {Object.entries(notes).map(([key, value]: any) => {
                return (
                  <div key={key} className="item">
                    <div
                      className="name"
                      onClick={scrollTo(value.boxLeft, value.boxTop)}
                    >
                      {value.title}
                    </div>
                    <div className="deleteIcon" onClick={onDeleteNote(key)}>
                      <img alt="delete" src={deleteIcon} />
                    </div>
                  </div>
                )
              })}
            </div>
          )
        ) : (
          <div className="verticalText"> Notes </div>
        )}
      </div>
    </div>
  )
}

export default LeftMenu
