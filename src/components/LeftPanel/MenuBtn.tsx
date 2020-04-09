import React from 'react'
import cx from 'classnames'

import './MenuBtn.scss'

const MenuBtn = ({
  isOpen,
  onClick,
}: {
  isOpen: Boolean
  onClick: () => void
}) => {
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
