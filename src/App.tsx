import React from 'react'

import { DrawBox } from './components'
import { getMaxScreenSize } from './utils/screenSize'
import './App.css'

function App() {
  const drawBoxRef = useRef(null)
  const [boxStyle, setBoxStyle] = useState(getMaxScreenSize())

  const onDragStop = (e, d) => {
    setBoxStyle(getMaxScreenSize())
  }

  return <DrawBox boxRef={drawBoxRef} style={boxStyle} />
}

export default App
