import React from 'react'

function BaseWalls({mLeft, mTop, deg}) {
  return (
    <div style={{marginLeft: `${mLeft}px`, marginTop: `${mTop}px`, transform: `rotate(${deg}deg)`}}>
        <div style={{display: "flex", width: "60px", justifyContent: "space-between"}}>
        <div style={{ backgroundColor: "rgba(49, 30, 20, 0.763)", width: "10px", height: "35px", visibility: "visible"}}></div>
        <div style={{ backgroundColor: "rgba(49, 30, 20, 0.763)", width: "10px", height: "35px", visibility: "visible"}}></div>
        </div>
      <div style={{ backgroundColor: "rgba(49, 30, 20, 0.763)", width: "60px", height: "10px", visibility: "visible"}}></div>
    </div>
  )
}

export default BaseWalls