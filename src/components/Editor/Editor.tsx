import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
import SimpleMDE from 'react-simplemde-editor'

import './Editor.css'

const editorStyle = {
  border: 'solid 1px #9a9a9a',
  background: '#f0f0f0',
  borderRadius: '5px',
}

interface EditorProps {
  id: string
  x: number
  y: number
  width: number
  height: number
  onDragStop: (id: string) => (e: any, d: any) => void
  onEditorDelete: (id: string) => () => void
}

const Editor: React.SFC<EditorProps> = ({
  id,
  x,
  y,
  width,
  height,
  onDragStop,
  onEditorDelete,
}) => {
  const [disableDragging, setDisableDragging] = useState(true)

  const toggleFullScreen = e => {
    e.toggleFullScreen()
  }

  const _height = Math.max(height, 200)
  const _width = Math.max(width, 400)

  const onEdit = () => {
    setDisableDragging(true)
  }

  const onEditLeave = () => {
    setDisableDragging(false)
  }

  return (
    <Rnd
      style={editorStyle}
      default={{
        x,
        y,
        width: _width,
        height: _height,
      }}
      enableUserSelectHack={false}
      onDragStop={onDragStop(id)}
      disableDragging={disableDragging}
    >
      <div className="editorHeader">
        <div>title</div>
        <div className="closeIcon" onClick={onEditorDelete(id)}>
          X
        </div>
      </div>
      <div
        className="editorContent"
        onMouseEnter={onEdit}
        onMouseLeave={onEditLeave}
      >
        <SimpleMDE
          id={`${id}-mde`}
          getMdeInstance={toggleFullScreen}
          options={{
            minHeight: '200px',
            spellChecker: false,
            toolbar: [
              'bold',
              'italic',
              'strikethrough',
              'heading',
              '|',
              'code',
              'quote',
              'unordered-list',
              'ordered-list',
              '|',
              'table',
              '|',
              'preview',
              'guide',
            ],
          }}
        />
      </div>
    </Rnd>
  )
}

export default Editor
