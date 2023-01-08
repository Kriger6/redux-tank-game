import React, { forwardRef } from 'react'

const Player = forwardRef(({movePlayerX, movePlayerY, playerRotation, visibility}, ref) => {
  return (
      <div ref={ref} className='tank' style={{ marginLeft: `${movePlayerX}px`, marginTop: `${movePlayerY}px`, transform: `rotate(${playerRotation})`, visibility: visibility }}  >
          <div className='gun'></div>
      </div>
  )
})

export default Player