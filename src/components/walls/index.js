import React, {useState, useEffect} from 'react'





function Walls({state, mTop, mLeft}) {

    
  return (
      <div className='wall-container' style={{marginLeft: `${mLeft}px`, marginTop: `${mTop}px`}}>
          {state}   
      </div>
  )
}

export default Walls