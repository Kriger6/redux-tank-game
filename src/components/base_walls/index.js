import React from 'react'

const BaseWalls = ({state, mLeft, mTop, deg}) => {
  return (
    <div style={{marginLeft: `${mLeft}px`, marginTop: `${mTop}px`, transform: `rotate(${deg}deg)`}}>
      {state}
    </div>
  )
}

export default BaseWalls