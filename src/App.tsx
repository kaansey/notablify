import React, { useState, useRef } from 'react'
import { nanoid } from 'nanoid'

import { DrawBox, Editor, LeftPanel } from './components'
import { getMaxScreenSize } from './utils/screenSize'
import { BoxStateType } from './types'
import useLocalStorage from './hooks/useLocalStorage'
import { LS_NOTES_KEY } from './constants'

import './App.scss'
import 'easymde/dist/easymde.min.css'

const fontStyle = {
  fontFamily: 'ArchitectsDaughter',
}

function App() {
  const drawBoxRef = useRef()
  const [boxStyle, setBoxStyle] = useState(getMaxScreenSize())
  const [notes, setNotes] = useLocalStorage(LS_NOTES_KEY, {})

  const onDragStop = (id: string) => (e: any, d: any) => {
    setBoxStyle(getMaxScreenSize())

    // set new cordinates
    notes[id].boxLeft = d.x
    notes[id].boxTop = d.y
    setNotes({ ...notes })
  }

  const onBoxCreate = (boxState: BoxStateType) => {
    setNotes({ ...notes, [nanoid()]: { ...boxState } })
  }

  const onDeleteNote = (id: string) => () => {
    if (id in notes) {
      delete notes[id]
      setNotes({ ...notes })
    }
  }

  return (
    <div className="app" style={fontStyle}>
      <LeftPanel onDeleteNote={onDeleteNote} />
      <DrawBox boxRef={drawBoxRef} style={boxStyle} onBoxCreate={onBoxCreate} />
      {Object.entries(notes).map(([key, value]: any) => {
        return (
          <Editor
            key={key}
            id={key}
            x={value.boxLeft}
            y={value.boxTop}
            width={value.boxWidth}
            height={value.boxHeight}
            onDragStop={onDragStop}
            onEditorDelete={onDeleteNote}
          />
        )
      })}
    </div>
  )
}

export default App
