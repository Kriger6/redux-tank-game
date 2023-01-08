import React, { forwardRef } from 'react'

const Enemy = forwardRef(({ moveEnemyX, moveEnemyY, enemyRotation, visibility }, ref) => {
    return (
        <div ref={ref} className='enemy' style={{ marginLeft: `${moveEnemyX}px`, marginTop: `${moveEnemyY}px`, transform: `rotate(${enemyRotation})`, visibility: visibility }}  >
            <div className='gun'></div>
        </div>
    )
})

export default Enemy