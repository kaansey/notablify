import React from 'react'
import { Rnd } from 'react-rnd'
import SimpleMDE from 'react-simplemde-editor'

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

  console.log({ id })
  return (
    <Rnd
      style={style}
      default={{
        x,
        y,
        width,
        height,
      }}
      // minHeight={300}
      // minWidth={300}
      enableUserSelectHack={false}
      onDragStop={onDragStop}
    >
      <SimpleMDE
        id={`${id}-mde`}
        getMdeInstance={toggleFullScreen}
        // value={this.state.textValue}
        options={{
          minHeight: '200px',
          //   autofocus: true,
          spellChecker: false,
        }}
      />
    </Rnd>
  )
}

export default Editor
