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

    const checkPlayerX = (operator) => {
        if(operator === "+") {
            if (Math.abs(myStateRef.current.playerMoveX + 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                    return true
                }
        } else {
            if (Math.abs(myStateRef.current.playerMoveX - 2 - myStateRef.current.enemyMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                    return true
                }
        }
    }

    const checkPlayerY = (operator) => {
        if (operator === "+") {
            if (Math.abs(myStateRef.current.playerMoveY + 2 - myStateRef.current.enemyMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                    return true
                }
        } else {
            if (Math.abs(myStateRef.current.playerMoveY - 2 - myStateRef.current.enemyMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                return true
            }
        }
    }

    const checkEnemyX = (operator) => {
        if (operator === "+") {
            if (Math.abs(myStateRef.current.enemyMoveX + 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                    return true
            }
        } else {
            if (Math.abs(myStateRef.current.enemyMoveX - 2 - myStateRef.current.playerMoveX) >= 30 ||
                Math.abs(myStateRef.current.playerMoveY - myStateRef.current.enemyMoveY) >= 30) {
                    return true
            }
        }
    }

    const checkEnemyY = (operator) => {
        if (operator === "+") {
            if (Math.abs(myStateRef.current.enemyMoveY + 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                    return true
            } 
        } else {
            if (Math.abs(myStateRef.current.enemyMoveY - 2 - myStateRef.current.playerMoveY) >= 30 ||
                Math.abs(myStateRef.current.playerMoveX - myStateRef.current.enemyMoveX) >= 30) {
                    return true
            }
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
            if(checkPlayerY()) {
                dispatch(playerMoveUp())
            }
            if (checkEnemyY("+")) {
                dispatch(enemyMoveDown())
            }
        } else if ((keysPressed['s'] && keysPressed['ArrowDown'])) {
            if (checkEnemyY("+")) {
                dispatch(enemyMoveDown())
            }
            if (checkPlayerY("+")) {
                dispatch(playerMoveDown())
            }
        } else if ((keysPressed['s'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX()) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyY("+")) {
                dispatch(enemyMoveDown())
            } 
        } else if ((keysPressed['s'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+")) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyY("+")) {
                dispatch(enemyMoveDown())
            }
        } else if ((keysPressed['a'] && keysPressed['ArrowDown'])) {
            if (checkEnemyX()) {
                    dispatch(enemyMoveLeft())
            }
            if (checkPlayerY("+")) {
                dispatch(playerMoveDown())
            }
        } else if ((keysPressed['a'] && keysPressed['ArrowUp'])) {
            if (checkEnemyX()) {
                dispatch(enemyMoveLeft())
            }
            if (checkPlayerY()) {
                dispatch(playerMoveUp())
            }
        } else if ((keysPressed['a'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX()) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyX()) {
                dispatch(enemyMoveLeft())
            }
        } else if ((keysPressed['a'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+")) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyX()) {
                    dispatch(enemyMoveLeft())
            }
        } else if ((keysPressed['w'] && keysPressed['ArrowUp'])) {
            if (checkPlayerY()) {
                dispatch(playerMoveUp())
            }
            if (checkEnemyY()) {
                    dispatch(enemyMoveUp())
            }
        } else if ((keysPressed['w'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX()) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyY()) {
                dispatch(enemyMoveUp())
            }
        } else if ((keysPressed['w'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+")) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyY()) {
                dispatch(enemyMoveUp())
            }
        } else if ((keysPressed['w'] && keysPressed['ArrowDown'])) {
            if (checkPlayerY("+")) {
                dispatch(playerMoveDown())
            }
            if (checkEnemyY()) {
                dispatch(enemyMoveUp())
            }
        } else if ((keysPressed['d'] && keysPressed['ArrowUp'])) {
            if (checkEnemyX("+")) {
                dispatch(enemyMoveRight())
            }
            if (checkPlayerY()) {
                dispatch(playerMoveUp())
            }
        } else if ((keysPressed['d'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX()) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyX("+")) {
                dispatch(enemyMoveRight())
            }
        } else if ((keysPressed['d'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+")) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyX("+")) {
                    dispatch(enemyMoveRight())
            }
        } else if ((keysPressed['d'] && keysPressed['ArrowDown'])) {
            if (checkEnemyY("+")) {
                dispatch(enemyMoveRight())
            }
            if (checkPlayerY("+")) {
                dispatch(playerMoveDown())
            }
        } else if (keysPressed['s']) {
            if (checkEnemyY("+")) {
                dispatch(enemyMoveDown())
            }
        } else if (keysPressed['d']) {
            if (checkEnemyX("+")) {
                    dispatch(enemyMoveRight())
            }
        } else if (keysPressed['a']) {
            if (checkEnemyX()) {
                    dispatch(enemyMoveLeft())
            }
        } else if (keysPressed['w']) {
            if (checkEnemyY()) {
                dispatch(enemyMoveUp())
            }
        } else if (keysPressed['ArrowUp']) {
            if (checkPlayerY()) {
                dispatch(playerMoveUp())
            }
        } else if (keysPressed['ArrowDown']) {
            if (checkPlayerY("+")) {
                    dispatch(playerMoveDown())
            }
        } else if (keysPressed['ArrowLeft']) {
            if (checkPlayerX()) {
                    dispatch(playerMoveLeft())
            }
        } else if (keysPressed['ArrowRight']) {
            if (checkPlayerX("+")) {
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


