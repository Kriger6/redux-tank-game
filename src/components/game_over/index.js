import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'

const startNewGame = {
  padding: "20px",
  borderRadius: "15px",
  backgroundColor: "#23272B",
  color: "white"
}


const GameOver = (props) => {
  return (
    <div className='box-container'>
      <div className='message-container'>
        <h2 style={{ fontFamily: "monospace, sans-serif" }}>{props.state}</h2>
        <button style={startNewGame} onClick={() => { window.location.reload() }}>
          <p style={{ fontFamily: "monospace, sans-serif" }}>Start new game</p>
          <FontAwesomeIcon icon={faCirclePlay} size="3x" />
        </button>
      </div>
    </div>
  )
}

export default GameOver
