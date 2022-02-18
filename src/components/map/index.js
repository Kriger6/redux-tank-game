import React, {useEffect, useRef} from 'react'
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
    
    const movePlayerX =  useSelector(state => state.playerMoveX)
    const movePlayerY = useSelector(state => state.playerMoveY)
    const moveEnemyX = useSelector(state => state.enemyMoveX)
    const moveEnemyY = useSelector(state => state.enemyMoveY)
    const state = useSelector(state => state)

    const dispatch = useDispatch()
    var keysPressed = {}
    var time 
    const myStateRef = useRef(0);
    myStateRef.current = state

    // const {playerMoveX, playerMoveY, enemyMoveX, enemyMoveY} = myStateRef.current

    const checkPlayerX = () => {
        if (Math.abs(myStateRef.current.playerMoveX + 2 - myStateRef.current.enemyMoveX) >= 30 ||
            Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
            return true
        }
    }

    const checkPlayerY = () => {
        if (Math.abs(myStateRef.current.playerMoveY + 2 - myStateRef.current.enemyMoveY) >= 30 ||
            Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
            return true
        }
    }


    // TANK MOVEMENT CONTROLS AND COLLISION DETECTION
    const move = (event) => {
        try {
            if (event.key === 'CapsLock') {
                return }} catch(err) {}
        try {
            event.stopImmediatePropagation()
        } catch (err) {}
        try { 
            if(event.type !== "keyup") {
                clearInterval(time)
                time = undefined
                event.key.startsWith('Ar') ? keysPressed[event.key] = true : keysPressed[event.key.toLowerCase()] = true;
            }} catch(err) {}
        if ((keysPressed['s'] && keysPressed['ArrowUp'])) {
            if(Math.abs(myStateRef.current.enemyMoveY + 2 - myStateRef.current.playerMoveY) < 30 &&
                Math.abs(myStateRef.current.enemyMoveX - myStateRef.current.playerMoveX) < 30 ) {
                return
            }
            dispatch(playerMoveUp())
            dispatch(enemyMoveDown())
        } else if ((keysPressed['s'] && keysPressed['ArrowDown'])) {
            if (Math.abs(myStateRef.current.enemyMoveY + 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.enemyMoveX - myStateRef.current.playerMoveX) >= 30) {
                dispatch(enemyMoveDown())
            }
            if (Math.abs(myStateRef.current.playerMoveY + 2 - myStateRef.current.enemyMoveY) >=30 ||
                Math.abs(myStateRef.current.enemyMoveX - myStateRef.current.playerMoveX) >=30) {
                dispatch(playerMoveDown())
            }
        } else if ((keysPressed['s'] && keysPressed['ArrowLeft'])) {
            if (Math.abs(myStateRef.current.playerMoveX - 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(playerMoveLeft())
            }
            if (Math.abs(myStateRef.current.enemyMoveY + 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(enemyMoveDown())
            } 
        } else if ((keysPressed['s'] && keysPressed['ArrowRight'])) {
            if (Math.abs(myStateRef.current.playerMoveX + 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(playerMoveRight())
            }
            if (Math.abs(myStateRef.current.enemyMoveY + 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(enemyMoveDown())
            }
        } else if ((keysPressed['a'] && keysPressed['ArrowDown'])) {
            if (Math.abs(myStateRef.current.enemyMoveX - 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                    dispatch(enemyMoveLeft())
            }
            if (Math.abs(myStateRef.current.playerMoveY + 2 - myStateRef.current.enemyMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(playerMoveDown())
            }
        } else if ((keysPressed['a'] && keysPressed['ArrowUp'])) {
            if (Math.abs(myStateRef.current.enemyMoveX - 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(enemyMoveLeft())
            }
            if (Math.abs(myStateRef.current.playerMoveY - 2 - myStateRef.current.enemyMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(playerMoveUp())
            }
        } else if ((keysPressed['a'] && keysPressed['ArrowLeft'])) {
            if (Math.abs(myStateRef.current.playerMoveX - 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(playerMoveLeft())
            }
            if (Math.abs(myStateRef.current.enemyMoveX - 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(enemyMoveLeft())
            }
        } else if ((keysPressed['a'] && keysPressed['ArrowRight'])) {
            if (Math.abs(myStateRef.current.playerMoveX + 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(playerMoveRight())
            }
            if (Math.abs(myStateRef.current.enemyMoveX - 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                    dispatch(enemyMoveLeft())
            }
        } else if ((keysPressed['w'] && keysPressed['ArrowUp'])) {
            if (Math.abs(myStateRef.current.playerMoveY - 2 - myStateRef.current.enemyMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(playerMoveUp())
            }
            if (Math.abs(myStateRef.current.enemyMoveY - 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                    dispatch(enemyMoveUp())
            }
        } else if ((keysPressed['w'] && keysPressed['ArrowLeft'])) {
            if (Math.abs(myStateRef.current.playerMoveX - 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(playerMoveLeft())
            }
            if (Math.abs(myStateRef.current.enemyMoveY - 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(enemyMoveUp())
            }
        } else if ((keysPressed['w'] && keysPressed['ArrowRight'])) {
            if (Math.abs(myStateRef.current.playerMoveX + 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(playerMoveRight())
            }
            if (Math.abs(myStateRef.current.enemyMoveY - 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(enemyMoveUp())
            }
        } else if ((keysPressed['w'] && keysPressed['ArrowDown'])) {
            if (Math.abs(myStateRef.current.playerMoveY + 2 - myStateRef.current.enemyMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(playerMoveDown())
            }
            if (Math.abs(myStateRef.current.enemyMoveY - 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(enemyMoveUp())
            }
        } else if ((keysPressed['d'] && keysPressed['ArrowUp'])) {
            if (Math.abs(myStateRef.current.enemyMoveX + 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(enemyMoveRight())
            }
            if (Math.abs(myStateRef.current.playerMoveY - 2 - myStateRef.current.enemyMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(playerMoveUp())
            }
        } else if ((keysPressed['d'] && keysPressed['ArrowLeft'])) {
            if (Math.abs(myStateRef.current.playerMoveX - 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(playerMoveLeft())
            }
            if (Math.abs(myStateRef.current.enemyMoveX + 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(enemyMoveRight())
            }
        } else if ((keysPressed['d'] && keysPressed['ArrowRight'])) {
            if (Math.abs(myStateRef.current.playerMoveX + 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(playerMoveRight())
            }
            if (Math.abs(myStateRef.current.enemyMoveX + 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                    dispatch(enemyMoveRight())
            }
        } else if ((keysPressed['d'] && keysPressed['ArrowDown'])) {
            if (Math.abs(myStateRef.current.enemyMoveX + 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                dispatch(enemyMoveRight())
            }
            if (Math.abs(myStateRef.current.playerMoveY + 2 - myStateRef.current.enemyMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(playerMoveDown())
            }
        } else if (keysPressed['s']) {
            if (Math.abs(myStateRef.current.enemyMoveY + 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(enemyMoveDown())
            }
        } else if (keysPressed['d']) {
            if (Math.abs(myStateRef.current.enemyMoveX + 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                    dispatch(enemyMoveRight())
            }
        } else if (keysPressed['a']) {
            if (Math.abs(myStateRef.current.enemyMoveX - 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                    dispatch(enemyMoveLeft())
            }
        } else if (keysPressed['w']) {
            if (Math.abs(myStateRef.current.enemyMoveY - 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(enemyMoveUp())
            }
        } else if (keysPressed['ArrowUp']) {
            if (Math.abs(myStateRef.current.playerMoveY - 2 - myStateRef.current.enemyMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                dispatch(playerMoveUp())
            }
        } else if (keysPressed['ArrowDown']) {
            if (checkPlayerY()) {
                    dispatch(playerMoveDown())
            }
        } else if (keysPressed['ArrowLeft']) {
            if (Math.abs(myStateRef.current.playerMoveX - 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                    dispatch(playerMoveLeft())
            }
        } else if (keysPressed['ArrowRight']) {
            if (checkPlayerX()) {
                    dispatch(playerMoveRight())
            }
        } else if (Object.keys(keysPressed.length === 0)) {
            clearInterval(time)
            time = undefined
            return
        }
    }
    
    // KEY UP DETECTION
    const keyUp = (event) => {
        event.stopImmediatePropagation()
        try { delete keysPressed[event.key]; } catch (error) { console.log(error); }
        if (!time) {
            time = setInterval(move, 50)
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', move)
        document.addEventListener('keyup', keyUp)

    })
        


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


