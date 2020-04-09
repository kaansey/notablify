import React from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { LS_FONT_FAMILY } from '../../constants'

import './FontStyle.scss'

const FONT_FAMILY = {
  'Hand Write 1': 'ArchitectsDaughter',
  Arial: 'arial',
  Roboto: 'Roboto',
  'Times New Roman': 'Times New Roman',
  Times: 'Times',
  'Courier New': 'Courier New',
  Courier: 'Courier',
  Georgia: 'Georgia',
  Palatino: 'Palatino',
  Garamond: 'Garamond',
  Bookman: 'Bookman',
  'Comic Sans MS': 'Comic Sans MS',
}

const FONT_SIZE = {
  'Very Small': '12px',
  Small: '14px',
  Medium: '16px',
  Large: '18px',
  'Very Large': '20px',
}

const FontStyle = () => {
  const [fontStyle, setFontStyle] = useLocalStorage(LS_FONT_FAMILY, {
    fontFamily: 'ArchitectsDaughter',
    fontSize: '14px',
  })

  const onFontFamilyChange = e => {
    setFontStyle({
      ...fontStyle,
      fontFamily: e.target.value,
    })
  }

  const onFontSizeChange = e => {
    setFontStyle({
      ...fontStyle,
      fontSize: e.target.value,
    })
  }

  return (
    <div className="fontSelection">
      <div className="item">
        <span>Font family: </span>
        <select
          onChange={onFontFamilyChange}
          defaultValue={fontStyle.fontFamily}
        >
          {Object.entries(FONT_FAMILY).map(([key, value]) => {
            return (
              <option key={value} value={value}>
                {key}
              </option>
            )
          })}
        </select>
      </div>
      <div className="item">
        <span>Font size: </span>
        <select onChange={onFontSizeChange} defaultValue={fontStyle.fontSize}>
          {Object.entries(FONT_SIZE).map(([key, value]) => {
            return (
              <option key={value} value={value}>
                {key}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default FontStyle
