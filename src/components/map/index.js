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
            if (event.key === 'CapsLock') {
                return}} catch(err) {}
        try {
            event.stopImmediatePropagation()
        } catch (err) {}
        try { 
            if(event.type !== "keyup") {
                event.key.startsWith('Ar') ? keysPressed[event.key] = true : keysPressed[event.key.toLowerCase()] = true;
            }} catch(err) {}
        
        if ((keysPressed['s'] && keysPressed['ArrowUp'])) {
            dispatch(playerMoveUp())
            dispatch(enemyMoveDown())
            console.log('both');
        } else if ((keysPressed['s'] && keysPressed['ArrowDown'])) {
            dispatch(playerMoveDown())
            dispatch(enemyMoveDown())
        } else if ((keysPressed['s'] && keysPressed['ArrowLeft'])) {
            dispatch(playerMoveLeft())
            dispatch(enemyMoveDown())
        } else if ((keysPressed['s'] && keysPressed['ArrowRight'])) {
            dispatch(playerMoveRight())
            dispatch(enemyMoveDown())
        } else if ((keysPressed['a'] && keysPressed['ArrowDown'])) {
            dispatch(playerMoveDown())
            dispatch(enemyMoveLeft())
        } else if ((keysPressed['a'] && keysPressed['ArrowUp'])) {
            dispatch(playerMoveUp())
            dispatch(enemyMoveLeft())
        } else if ((keysPressed['a'] && keysPressed['ArrowLeft'])) {
            dispatch(playerMoveLeft())
            dispatch(enemyMoveLeft())
        } else if ((keysPressed['a'] && keysPressed['ArrowRight'])) {
            dispatch(playerMoveRight())
            dispatch(enemyMoveLeft())
        } else if ((keysPressed['w'] && keysPressed['ArrowUp'])) {
            dispatch(playerMoveUp())
            dispatch(enemyMoveUp())
        } else if ((keysPressed['w'] && keysPressed['ArrowLeft'])) {
            dispatch(playerMoveLeft())
            dispatch(enemyMoveUp())
        } else if ((keysPressed['w'] && keysPressed['ArrowRight'])) {
            dispatch(playerMoveRight())
            dispatch(enemyMoveUp())
        } else if ((keysPressed['w'] && keysPressed['ArrowDown'])) {
            dispatch(playerMoveDown())
            dispatch(enemyMoveUp())
        } else if ((keysPressed['d'] && keysPressed['ArrowUp'])) {
            dispatch(playerMoveUp())
            dispatch(enemyMoveRight())
        } else if ((keysPressed['d'] && keysPressed['ArrowLeft'])) {
            dispatch(playerMoveLeft())
            dispatch(enemyMoveRight())
        } else if ((keysPressed['d'] && keysPressed['ArrowRight'])) {
            dispatch(playerMoveRight())
            dispatch(enemyMoveRight())
        } else if ((keysPressed['d'] && keysPressed['ArrowDown'])) {
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
            console.log('up');
            dispatch(playerMoveUp())
        } else if (keysPressed['ArrowDown']) {
            dispatch(playerMoveDown())
        } else if (keysPressed['ArrowLeft']) {
            dispatch(playerMoveLeft())
        } else if (keysPressed['ArrowRight']) {
            dispatch(playerMoveRight())
        } else if (Object.keys(keysPressed.length === 0)) {
            clearInterval(time)
            time = undefined
            console.log(time);
            return
        }
        console.log(keysPressed);

    }

    
    document.addEventListener('keydown', move)

    document.addEventListener('keyup', (event) => {
        event.stopImmediatePropagation()
        try {delete keysPressed[event.key];} catch(error) {console.log(error);}
        console.log(keysPressed);
        console.log(time);
        if (!time) {
            time = setInterval(move, 50)
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


