import React, { useState, useRef } from 'react'
import { nanoid } from 'nanoid'

import {
  DrawBox,
  Editor,
  LeftPanel,
  FontStyle,
  Github,
  Tutorial,
} from './components'
import { getMaxScreenSize } from './utils/screenSize'
import { BoxStateType } from './types'
import useLocalStorage from './hooks/useLocalStorage'
import { LS_NOTES_KEY, LS_FONT_FAMILY } from './constants'

import './App.scss'
import 'easymde/dist/easymde.min.css'

function App() {
  const drawBoxRef = useRef()
  const [boxStyle, setBoxStyle] = useState(getMaxScreenSize())
  const [notes, setNotes] = useLocalStorage(LS_NOTES_KEY, {})
  const [fontStyle] = useLocalStorage(LS_FONT_FAMILY, {
    fontFamily: 'ArchitectsDaughter',
    fontSize: '14px',
    backgroundColor: '#fbfbfb',
  })

  const onDragStop = (id: string) => (e: any, d: any) => {
    setBoxStyle(getMaxScreenSize())

    // set new cordinates
    notes[id].boxLeft = d.x
    notes[id].boxTop = d.y
    setNotes({ ...notes })
  }

  const onResizeStop = (id: string) => (e: any, d: any, ref: any) => {
    notes[id].boxWidth = Number(ref.style.width.replace('px', ''))
    notes[id].boxHeight = Number(ref.style.height.replace('px', ''))
    setNotes({ ...notes })
  }

  const onBoxCreate = (boxState: BoxStateType) => {
    setNotes({ ...notes, [nanoid()]: { ...boxState, title: 'Note title...' } })
  }

  const onDeleteNote = (id: string) => () => {
    if (id in notes) {
      delete notes[id]
      setNotes({ ...notes })
      localStorage.removeItem(`${id}-mde`)
    }
  }

  const onTitleChange = (id: string) => e => {
    notes[id].title = e.target.value
    setNotes({ ...notes })
  }

  return (
    <div className="app" style={fontStyle}>
      <Tutorial />
      <Github />
      <FontStyle />
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
            title={value.title}
            onTitleChange={onTitleChange}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            onEditorDelete={onDeleteNote}
          />
        )
      })}
    </div>
  )
}

export default App
