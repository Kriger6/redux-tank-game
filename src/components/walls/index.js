import React, {useState, useEffect} from 'react'





function Walls() {
    const [wallsArray, setWallsArray] = useState()
    
    var array = []

    const fillArray = () => {
        for (let i = 0; i < 32; i++) {
            array.push(<div className='wall' key={i}></div>)
        }
        setWallsArray(array)
    }

    useEffect(() => {
        fillArray()
    }, [])

  return (
      <div className='wall-container'>
          {wallsArray}   
      </div>
  )
}

export default Walls