import React, { useState, useRef } from 'react'
import { nanoid } from 'nanoid'
import { DrawBox, Editor } from './components'
import { getMaxScreenSize } from './utils/screenSize'
import { BoxStateType } from './types'

import './App.css'
import 'easymde/dist/easymde.min.css'

const fontStyle = {
  fontFamily: 'ArchitectsDaughter',
}

function App() {
  const drawBoxRef = useRef()
  const [boxStyle, setBoxStyle] = useState(getMaxScreenSize())
  const [editors, setEditors] = useState({})

  const onDragStop = (e: any, d: any) => {
    setBoxStyle(getMaxScreenSize())
  }

  const onBoxCreate = (boxState: BoxStateType) => {
    setEditors({ ...editors, [nanoid()]: { ...boxState } })
    console.log(editors)
  }

  const onEditorDelete = (id: string) => () => {
    if (id in editors) {
      delete editors[id]
      setEditors({ ...editors })
    }
  }

  return (
    <div style={fontStyle}>
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
