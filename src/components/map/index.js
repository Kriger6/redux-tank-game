import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {playerMoveLeft, 
    playerMoveRight, 
    playerMoveUp, 
    playerMoveDown,
    enemyMoveDown,
    enemyMoveLeft,
    enemyMoveRight,
    enemyMoveUp} from '../../actions'

const Map = () => {
    const movePlayerX = useSelector(state => state.playerMoveX)
    const movePlayerY = useSelector(state => state.playerMoveY)
    const moveEnemyX = useSelector(state => state.enemyMoveX)
    const moveEnemyY = useSelector(state => state.enemyMoveY)
    // const state = useSelector(state => state)
    const dispatch = useDispatch()

    let keysPressed = {}
    var time
    const move = (event) => {
        try {
            event.stopImmediatePropagation()
        } catch (err) {}
        try { 
            if(event.type !== "keyup") {
                keysPressed[event.key] = true;
            }} catch(err) {}
        
        if ((keysPressed['s'] && keysPressed['ArrowUp']) || (keysPressed['S'] && keysPressed['ArrowUp'])) {
            dispatch(playerMoveUp())
            dispatch(enemyMoveDown())
        } else if ((keysPressed['s'] && keysPressed['ArrowDown']) || (keysPressed['S'] && keysPressed['ArrowDown'])) {
            dispatch(playerMoveDown())
            dispatch(enemyMoveDown())
        } else if ((keysPressed['s'] && keysPressed['ArrowLeft']) || (keysPressed['S'] && keysPressed['ArrowLeft'])) {
            dispatch(playerMoveLeft())
            dispatch(enemyMoveDown())
        } else if ((keysPressed['s'] && keysPressed['ArrowRight']) || (keysPressed['S'] && keysPressed['ArrowRight'])) {
            dispatch(playerMoveRight())
            dispatch(enemyMoveDown())
        } else if ((keysPressed['a'] && keysPressed['ArrowDown']) || (keysPressed['A'] && keysPressed['ArrowDown'])) {
            dispatch(playerMoveDown())
            dispatch(enemyMoveLeft())
        } else if ((keysPressed['a'] && keysPressed['ArrowUp']) || (keysPressed['A'] && keysPressed['ArrowUp'])) {
            dispatch(playerMoveUp())
            dispatch(enemyMoveLeft())
        } else if ((keysPressed['a'] && keysPressed['ArrowLeft']) || (keysPressed['A'] && keysPressed['ArrowLeft'])) {
            dispatch(playerMoveLeft())
            dispatch(enemyMoveLeft())
        } else if ((keysPressed['a'] && keysPressed['ArrowRight']) || (keysPressed['A'] && keysPressed['ArrowRight'])) {
            dispatch(playerMoveRight())
            dispatch(enemyMoveLeft())
        } else if ((keysPressed['w'] && keysPressed['ArrowUp']) || (keysPressed['W'] && keysPressed['ArrowUp'])) {
            dispatch(playerMoveUp())
            dispatch(enemyMoveUp())
        } else if ((keysPressed['w'] && keysPressed['ArrowLeft']) || (keysPressed['W'] && keysPressed['ArrowLeft'])) {
            dispatch(playerMoveLeft())
            dispatch(enemyMoveUp())
        } else if ((keysPressed['w'] && keysPressed['ArrowRight']) || (keysPressed['W'] && keysPressed['ArrowRight'])) {
            dispatch(playerMoveRight())
            dispatch(enemyMoveUp())
        } else if ((keysPressed['w'] && keysPressed['ArrowDown']) || (keysPressed['W'] && keysPressed['ArrowDown'])) {
            dispatch(playerMoveDown())
            dispatch(enemyMoveUp())
        } else if ((keysPressed['d'] && keysPressed['ArrowUp']) || (keysPressed['D'] && keysPressed['ArrowUp'])) {
            dispatch(playerMoveUp())
            dispatch(enemyMoveRight())
        } else if ((keysPressed['d'] && keysPressed['ArrowLeft']) || (keysPressed['D'] && keysPressed['ArrowLeft'])) {
            dispatch(playerMoveLeft())
            dispatch(enemyMoveRight())
        } else if ((keysPressed['d'] && keysPressed['ArrowRight']) || (keysPressed['D'] && keysPressed['ArrowRight'])) {
            dispatch(playerMoveRight())
            dispatch(enemyMoveRight())
        } else if ((keysPressed['d'] && keysPressed['ArrowDown']) || (keysPressed['D'] && keysPressed['ArrowDown'])) {
            dispatch(playerMoveDown())
            dispatch(enemyMoveRight())
        } else if (keysPressed['s']) {
            dispatch(enemyMoveDown())
        } else if (keysPressed['d']) {
            dispatch(enemyMoveRight())
        } else if (keysPressed['a']) {
            dispatch(enemyMoveLeft())
        } else if (keysPressed['w']) {
            dispatch(enemyMoveUp())
        } else if (keysPressed['ArrowUp']) {
            dispatch(playerMoveUp())
        } else if (keysPressed['ArrowDown']) {
            dispatch(playerMoveDown())
        } else if (keysPressed['ArrowLeft']) {
            dispatch(playerMoveLeft())
        } else if (keysPressed['ArrowRight']) {
            dispatch(playerMoveRight())
        } else if (Object.keys(keysPressed.length === 0)) {
            return
        }
    }

    
    document.addEventListener('keydown', move)

    document.addEventListener('keyup', (event) => {
        event.stopImmediatePropagation()
        delete keysPressed[event.key];
        console.log(keysPressed);
        console.log(time);
        if (!time) {
            time = setInterval(move, 250)
            console.log(time); 
        }
    });


    return (
        <div className='mapContainer'>
            <div className='map'>
                <div className='tank' style={{marginLeft: `${movePlayerX}px`, marginTop: `${movePlayerY}px`}}  >
                    
                </div>
                <div className='enemy' style={{marginLeft: `${moveEnemyX}px`, marginTop: `${moveEnemyY}px`}}  >

                </div>
            </div>
        </div>
    )
}

export default Map


