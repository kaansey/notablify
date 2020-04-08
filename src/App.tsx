import React, { useState, useRef } from 'react'
import { nanoid } from 'nanoid'
import { DrawBox, Editor, LeftPanel } from './components'
import { getMaxScreenSize } from './utils/screenSize'
import { BoxStateType } from './types'
import useLocalStorage from './hooks/useLocalStorage'

import './App.css'
import 'easymde/dist/easymde.min.css'

const fontStyle = {
  fontFamily: 'ArchitectsDaughter',
}

function App() {
  const drawBoxRef = useRef()
  const [boxStyle, setBoxStyle] = useState(getMaxScreenSize())
  const [editors, setEditors] = useLocalStorage('notes', {})

  const onDragStop = (id: string) => (e: any, d: any) => {
    setBoxStyle(getMaxScreenSize())

    // set new cordinates
    editors[id].boxLeft = d.x
    editors[id].boxTop = d.y
    setEditors({ ...editors })
  }

  const onBoxCreate = (boxState: BoxStateType) => {
    setEditors({ ...editors, [nanoid()]: { ...boxState } })
  }

  const onEditorDelete = (id: string) => () => {
    if (id in editors) {
      delete editors[id]
      setEditors({ ...editors })
    }
  }

  return (
    <div className="app" style={fontStyle}>
      <LeftPanel />
      <DrawBox boxRef={drawBoxRef} style={boxStyle} onBoxCreate={onBoxCreate} />
      {Object.entries(editors).map(([key, value]: any) => {
        return (
          <Editor
            key={key}
            id={key}
            x={value.boxLeft}
            y={value.boxTop}
            width={value.boxWidth}
            height={value.boxHeight}
            onDragStop={onDragStop}
            onEditorDelete={onEditorDelete}
          />
        )
      })}
    </div>
  )
}

export default App
