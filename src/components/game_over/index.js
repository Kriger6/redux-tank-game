import React from 'react'

const GameOver = (props) => {
  return (
    <div className='box-container'>
        <div className='message-container'>
            <h1>{props.state}</h1>
            <button onClick={() => {window.location.reload()}}>Start new game</button>
        </div>
    </div>
  )
}

export default GameOver
