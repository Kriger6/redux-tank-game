import React, {useEffect, useRef, useState} from 'react'
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

    const [playerRotation, setPlayerRotation] = useState("0deg")
    const [enemyRotation, setEnemyRotation] = useState("180deg")

    const [currentShellPosition, setCurrentShellPosition] = useState()
    const [playerShell, setPlayerShell] = useState(null)
    const [enemyShell, setEnemyShell] = useState(null)
    const [shellFlying, setShellFlying] = useState([false, false])

    const [enemyVisibility, setEnemyVisibility] = useState("visible")
    

    const [shellRect, setShellRect] = useState(null)
     

    var time 
    var keysPressed = {}
    const dispatch = useDispatch()


    // REFS
    const myStateRef = useRef(0);
    myStateRef.current = state

    const playerShellRef = useRef()
    const enemyShellRef = useRef()
    const shellFlyingRef = useRef(false)
    shellFlyingRef.current = shellFlying
    const currentShellPositionRef = useRef()
    currentShellPositionRef.current = currentShellPosition
    const currentPlayerRotationRef = useRef("0deg")
    currentPlayerRotationRef.current = playerRotation
    const currentEnemyRotationRef = useRef("180deg")
    currentEnemyRotationRef.current = enemyRotation

    const playerTank = useRef(null)
    const enemyTank = useRef(null)
    const mapRef = useRef(null)


    // TANK TO TANK COLLISION


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
        
        // FIRING CONTROLS

        try {
            if (event.key === 'Enter') {
                if (shellFlyingRef.current[0] === true) {
                    return
                } else {
                    setCurrentShellPosition(myStateRef.current)
                }
                preFire("player")
                setTimeout(() => fire("player"), 4)
            }
        } catch(err) {console.log(err);}
        try {
            if (event.key === ' ') {
                if (shellFlyingRef.current[1] === true) {
                    return
                } else {
                    setCurrentShellPosition(myStateRef.current)
                }
                preFire("enemy")
                setTimeout(() => fire("enemy"), 4)
            }
        } catch (err) { console.log(err); }

        // MOVEMENT CONTROLS
            
        if ((keysPressed['s'] && keysPressed['ArrowUp'])) {
            if(checkPlayerY()) {
                dispatch(playerMoveUp())
            }
            if (checkEnemyY("+")) {
                dispatch(enemyMoveDown())
            }
            setPlayerRotation("0deg")
            setEnemyRotation("180deg")
        } else if ((keysPressed['s'] && keysPressed['ArrowDown'])) {
            if (checkEnemyY("+")) {
                dispatch(enemyMoveDown())
            }
            if (checkPlayerY("+")) {
                dispatch(playerMoveDown())
            }
            setPlayerRotation("180deg")
            setEnemyRotation("180deg")
        } else if ((keysPressed['s'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX()) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyY("+")) {
                dispatch(enemyMoveDown())
            }
            setPlayerRotation("270deg")
            setEnemyRotation("180deg") 
        } else if ((keysPressed['s'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+")) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyY("+")) {
                dispatch(enemyMoveDown())
            }
            setPlayerRotation("90deg")
            setEnemyRotation("180deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowDown'])) {
            if (checkEnemyX()) {
                    dispatch(enemyMoveLeft())
            }
            if (checkPlayerY("+")) {
                dispatch(playerMoveDown())
            }
            setPlayerRotation("180deg")
            setEnemyRotation("270deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowUp'])) {
            if (checkEnemyX()) {
                dispatch(enemyMoveLeft())
            }
            if (checkPlayerY()) {
                dispatch(playerMoveUp())
            }
            setPlayerRotation("0deg")
            setEnemyRotation("270deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX()) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyX()) {
                dispatch(enemyMoveLeft())
            }
            setEnemyRotation("270deg")
            setPlayerRotation("270deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+")) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyX()) {
                    dispatch(enemyMoveLeft())
            }
            setEnemyRotation("270deg")
            setPlayerRotation("90deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowUp'])) {
            if (checkPlayerY()) {
                dispatch(playerMoveUp())
            }
            if (checkEnemyY()) {
                    dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("0deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX()) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyY()) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("270deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+")) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyY()) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("90deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowDown'])) {
            if (checkPlayerY("+")) {
                dispatch(playerMoveDown())
            }
            if (checkEnemyY()) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("180deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowUp'])) {
            if (checkEnemyX("+")) {
                dispatch(enemyMoveRight())
            }
            if (checkPlayerY()) {
                dispatch(playerMoveUp())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("0deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX()) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyX("+")) {
                dispatch(enemyMoveRight())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("270deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+")) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyX("+")) {
                    dispatch(enemyMoveRight())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("90deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowDown'])) {
            if (checkEnemyY("+")) {
                dispatch(enemyMoveRight())
            }
            if (checkPlayerY("+")) {
                dispatch(playerMoveDown())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("180deg")
        } else if (keysPressed['s']) {
            if (checkEnemyY("+")) {
                dispatch(enemyMoveDown())
            }
            setEnemyRotation("180deg")
        } else if (keysPressed['d']) {
            if (checkEnemyX("+")) {
                    dispatch(enemyMoveRight())
            }
            setEnemyRotation("90deg")
        } else if (keysPressed['a']) {
            if (checkEnemyX()) {
                    dispatch(enemyMoveLeft())
            }
            setEnemyRotation("270deg")
        } else if (keysPressed['w']) {
            if (checkEnemyY()) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
        } else if (keysPressed['ArrowUp']) {
            if (checkPlayerY()) {
                dispatch(playerMoveUp())
            }
            setPlayerRotation("0deg")
        } else if (keysPressed['ArrowDown']) {
            if (checkPlayerY("+")) {
                    dispatch(playerMoveDown())
            }
            setPlayerRotation("180deg")
        } else if (keysPressed['ArrowLeft']) {
            if (checkPlayerX()) {
                    dispatch(playerMoveLeft())
            }
            setPlayerRotation("270deg")
        } else if (keysPressed['ArrowRight']) {
            if (checkPlayerX("+")) {
                    dispatch(playerMoveRight())
            }
            setPlayerRotation("90deg")
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


    // SHOOTING DIRECTIONS 

    const shootDirection = (tank, rotation) => {
        if (rotation.current === "0deg") {
            return { 
                marginLeft: currentShellPositionRef.current[tank + "MoveX"] + 11,
                marginTop: currentShellPositionRef.current[tank + "MoveY"] - 490,
            }
            
        } else if (rotation.current === "180deg") {
            return {
                marginLeft: currentShellPositionRef.current[tank + "MoveX"] + 11,
                marginTop: currentShellPositionRef.current[tank + "MoveY"] + 490,
                transform: `rotate(180deg)`
            }
            
        } else if (rotation.current === "90deg") {
            return {
                marginLeft: currentShellPositionRef.current[tank + "MoveX"] + 490,
                marginTop: currentShellPositionRef.current[tank + "MoveY"] + 7,
                transform: `rotate(90deg)`
            }
        } else if (rotation.current === "270deg") {
            return {
                marginLeft: currentShellPositionRef.current[tank + "MoveX"] - 490,
                marginTop: currentShellPositionRef.current[tank + "MoveY"] + 7,
                transform: `rotate(270deg)`
            }
        }
    }
    

    // FIRING SHELLS 

    const preFire = (tank) => {
        if (tank === "player") {
            setPlayerShell(<div className={[tank + "Shell"]} style={{
                marginLeft: currentShellPositionRef.current[tank + "MoveX"] + 11,
                marginTop: currentShellPositionRef.current[tank + "MoveY"],
                width: "8px"
            }}></div>)
        } else {
            setEnemyShell(<div className={[tank + "Shell"]} style={{
                marginLeft: currentShellPositionRef.current[tank + "MoveX"] + 11,
                marginTop: currentShellPositionRef.current[tank + "MoveY"],
                width: "8px"
            }}></div>)
        }
    }



    const fire = (tank) => {
        if (tank === "player") {
            playerShellRef.current = (<div ref={pShell => {
                // SHELL COLLISION DETECTION WITH WALLS AND OBJECTS
                function animate() {

                    let af = requestAnimationFrame(animate)
                    
                    setShellRect(pShell.getBoundingClientRect())
                    if (pShell.getBoundingClientRect().y < mapRef.current.getBoundingClientRect().top ||
                        pShell.getBoundingClientRect().y > mapRef.current.getBoundingClientRect().bottom ||
                        pShell.getBoundingClientRect().x < mapRef.current.getBoundingClientRect().left ||
                        pShell.getBoundingClientRect().x > mapRef.current.getBoundingClientRect().right) {
                        setPlayerShell(null)
                        setShellFlying([false, shellFlying[1]]) 
                        window.cancelAnimationFrame(af)
                        return
                    } else if (
                        pShell.getBoundingClientRect().x < enemyTank.current.getBoundingClientRect().x + enemyTank.current.getBoundingClientRect().width &&
                        pShell.getBoundingClientRect().x + pShell.getBoundingClientRect().width > enemyTank.current.getBoundingClientRect().x &&
                        pShell.getBoundingClientRect().y < enemyTank.current.getBoundingClientRect().y + enemyTank.current.getBoundingClientRect().height &&
                        pShell.getBoundingClientRect().height + pShell.getBoundingClientRect().y > enemyTank.current.getBoundingClientRect().y)  {
                        setPlayerShell(null)
                        setShellFlying([false, shellFlying[1]])
                        setEnemyVisibility("hidden")
                        moveEnemyY = mapRef.current.getBoundingClientRect().y - 20
                        // setTimeout(() => {enemyTank.current = removedEnemy}, 3000)
                        // setTimeout(() => {console.log(removedEnemy)}, 4000)
                        window.cancelAnimationFrame(af)
                        console.log("hit");
                    }
                }
                    if (pShell) {
                        animate()
                    }
            }}  className='playerShell' style={shootDirection(tank, currentPlayerRotationRef)}></div>)
            setPlayerShell(playerShellRef.current)
            setShellFlying([true, shellFlying[1]])
        } else if(tank === "enemy") {
            enemyShellRef.current = (<div ref={eShell => {
                function animate() {

                    let af = requestAnimationFrame(animate)

                    if (eShell.getBoundingClientRect().y < mapRef.current.getBoundingClientRect().top ||
                        eShell.getBoundingClientRect().y > mapRef.current.getBoundingClientRect().bottom ||
                        eShell.getBoundingClientRect().x < mapRef.current.getBoundingClientRect().left ||
                        eShell.getBoundingClientRect().x > mapRef.current.getBoundingClientRect().right) {
                        console.log(playerTank.current.getBoundingClientRect());
                        setEnemyShell(null)
                        setShellFlying([shellFlying[0], false])
                        window.cancelAnimationFrame(af)
                        return
                    } else if(Math.abs(eShell.getBoundingClientRect().bottom - playerTank.current.getBoundingClientRect().top) < 30 && 
                              Math.abs(eShell.getBoundingClientRect().x - playerTank.current.getBoundingClientRect().x) < 30) {
                        console.log("hit");
                    }
                }
                    if (eShell) {
                        animate()
                    }
                    
            }} className='enemyShell' style={shootDirection(tank, currentEnemyRotationRef)}></div>)
            setEnemyShell(enemyShellRef.current)
            setShellFlying([shellFlying[0], true])
        }

    }


    return (
        <div className='mapContainer'>
            <div ref={mapRef} className='map'>
                <div>{playerShell}</div>
                <div>{enemyShell}</div>
                <div ref={playerTank} className='tank' style={{marginLeft: `${movePlayerX}px`, marginTop: `${movePlayerY}px`, transform: `rotate(${playerRotation})`}}  >
                    <div className='gun'></div>
                </div>
                <div ref={enemyTank} className='enemy' style={{marginLeft: `${moveEnemyX}px`, marginTop: `${moveEnemyY}px`, transform: `rotate(${enemyRotation})`, visibility: enemyVisibility}}  >
                    <div className='gun'></div>
                </div>
                <div className='base1' style={{}}></div>
                <div className='base2' style={{}}></div>

            </div>
        </div>
    )
}

export default Map


