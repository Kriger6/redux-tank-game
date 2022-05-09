import React from 'react'


const Walls = ({state, mTop, mLeft}) => {

    
  return (
      <div className='wall-container' style={{marginLeft: `${mLeft}px`, marginTop: `${mTop}px`}}>
          {state}   
      </div>
  )
}

export default Walls