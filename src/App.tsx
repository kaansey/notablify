import React, { useState, useRef } from 'react'
import { nanoid } from 'nanoid'
import { DrawBox, Editor } from './components'
import { getMaxScreenSize } from './utils/screenSize'
import { BoxStateType } from './types'

import './App.css'
import 'easymde/dist/easymde.min.css'

const style = {
  border: 'solid 1px #9a9a9a',
  background: '#f0f0f0',
  borderRadius: '5px',
}

const fontStyle = {
  fontFamily: 'ArchitectsDaughter',
}

function App() {
  const drawBoxRef = useRef()
  const [boxStyle, setBoxStyle] = useState(getMaxScreenSize())
  const [editors, setEditors] = useState([])

  const onDragStop = (e: any, d: any) => {
    setBoxStyle(getMaxScreenSize())
  }

  const onBoxCreate = (boxState: BoxStateType) => {
    // editors.push(boxState)
    setEditors([...editors, { ...boxState, id: nanoid() }])
    console.log(editors)
  }

  return (
    <div style={fontStyle}>
      <DrawBox boxRef={drawBoxRef} style={boxStyle} onBoxCreate={onBoxCreate} />
      {editors.map(e => {
        return (
          <Editor
            key={e.id}
            id={e.id}
            x={e.boxLeft}
            y={e.boxTop}
            width={e.boxWidth}
            height={e.boxHeight}
            onDragStop={onDragStop}
            style={style}
          />
        )
      })}
    </div>
  )
}

export default App
