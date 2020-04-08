import React from 'react'
import { Rnd } from 'react-rnd'
import SimpleMDE from 'react-simplemde-editor'

import './Editor.css'

interface EditorProps {
  id: string
  x: number
  y: number
  width: number
  height: number
  style: any
  onDragStop: (e: any, d: any) => void
}

const Editor: React.SFC<EditorProps> = ({
  id,
  x,
  y,
  width,
  height,
  style,
  onDragStop,
}) => {
  const toggleFullScreen = e => {
    e.toggleFullScreen()
  }

  const _height = Math.max(height, 200)
  const _width = Math.max(width, 300)

  return (
    <Rnd
      style={style}
      default={{
        x,
        y,
        width: _width,
        height: _height,
      }}
      enableUserSelectHack={false}
      onDragStop={onDragStop}
    >
      <div className="editorTitle">title</div>
      <div
        className="editorContent"
        onClick={(e: any) => {
          e.stopPropagation()
          console.log('here')
        }}
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
