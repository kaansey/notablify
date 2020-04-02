import React, { useState, useRef } from 'react'

import { DrawBox, Editor } from './components'
import { getMaxScreenSize } from './utils/screenSize'
import { BoxStateType } from './types'

import './App.css'
import 'easymde/dist/easymde.min.css'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const style = {
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
  // padding: "20px"
}

function App() {
  const drawBoxRef = useRef()
  const [boxStyle, setBoxStyle] = useState(getMaxScreenSize())
  const [editors, setEditors] = useState([])

  const onDragStop = (e: any, d: any) => {
    // createEditor()
    console.log(d)
    setBoxStyle(getMaxScreenSize())
  }
  const onBoxCreate = (boxState: BoxStateType) => {
    console.log(boxState, editors)
    // editors.push(boxState)
    setEditors([...editors, { ...boxState, id: uuidv4() }])
  }

  return (
    <div>
      <DrawBox boxRef={drawBoxRef} style={boxStyle} onBoxCreate={onBoxCreate} />
      {editors.map(e => {
        return (
          <Editor
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
