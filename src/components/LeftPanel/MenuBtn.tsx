import React from 'react'
import cx from 'classnames'

import './MenuBtn.scss'

interface MenuBtnProps {
  isOpen: Boolean
  onClick(): void
}

const MenuBtn: React.SFC<MenuBtnProps> = ({ isOpen, onClick }) => {
  return (
    <div className={cx('menuBtn', { open: isOpen })} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default MenuBtn
