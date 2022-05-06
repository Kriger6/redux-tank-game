import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {v4 as uuidv4} from  'uuid'
import Walls from '../walls/'
import BaseWalls from '../base_walls'
import {playerMoveLeft, 
    playerMoveRight, 
    playerMoveUp, 
    playerMoveDown,
    enemyMoveDown,
    enemyMoveLeft,
    enemyMoveRight,
    enemyMoveUp,
    enemySpawnLeft,
    enemySpawnRight,
    playerSpawnLeft,
    playerSpawnRight} from '../../actions'

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

    const [visibility, setVisibility] = useState(["visible", "visible"])

    const [tankDestroyed, setTankDestroyed] = useState([false, false])

    const kobas = useRef([])

    

    // CONTAINS INTERNAL WALLS
    let firstWall = Array(32).fill(null)
    firstWall = Array.from(firstWall, (x, index) => <div className='wall' ref={el => kobas.current[index] = el} style={{visibility: "visible"}} key={uuidv4()}></div>)
    let secondWall = Array(24).fill(null)
    secondWall = Array.from(secondWall, x => <div className='wall' style={{visibility: "visible"}} key={uuidv4()}></div>)
    let thirdWall = Array(32).fill(null)
    thirdWall = Array.from(thirdWall, x => <div className='wall' style={{visibility: "visible"}} key={uuidv4()}></div>)
    let fourthWall = Array(32).fill(null)
    fourthWall = Array.from(fourthWall, x => <div className='wall' style={{visibility: "visible"}} key={uuidv4()}></div>)
    let fifthWall = Array(24).fill(null)
    fifthWall = Array.from(fifthWall, x => <div className='wall' style={{visibility: "visible"}} key={uuidv4()}></div>)
    let sixthWall = Array(32).fill(null)
    sixthWall = Array.from(sixthWall, x => <div className='wall' style={{visibility: "visible"}} key={uuidv4()}></div>)
    
    const [wallsArray, setWallsArray] = useState([firstWall, secondWall, thirdWall, fourthWall, fifthWall, sixthWall])
    
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

    const tankDestroyedRef = useRef()
    tankDestroyedRef.current = tankDestroyed

    const wallsRef = useRef(null)
    wallsRef.current = wallsArray

    const playerTank = useRef(null)
    const enemyTank = useRef(null)
    const mapRef = useRef(null)


    // TANK TO INTERNAL WALLS COLLISON

    const checkWalls = () => {
        const value = wallsRef.current.map(x => x.map(y => console.log(y, kobas.current[0].getBoundingClientRect(), kobas.current[1].getBoundingClientRect())))
        return value
    }



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
            if(checkPlayerY() && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveUp())
            }
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveDown())
            }
            setPlayerRotation("0deg")
            setEnemyRotation("180deg")
        } else if ((keysPressed['s'] && keysPressed['ArrowDown'])) {
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveDown())
            }
            if (checkPlayerY("+") && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveDown())
            }
            setPlayerRotation("180deg")
            setEnemyRotation("180deg")
        } else if ((keysPressed['s'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX() && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveDown())
            }
            setPlayerRotation("270deg")
            setEnemyRotation("180deg") 
        } else if ((keysPressed['s'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+") && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveDown())
            }
            setPlayerRotation("90deg")
            setEnemyRotation("180deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowDown'])) {
            if (checkEnemyX() && tankDestroyedRef.current[1] === false) {
                    dispatch(enemyMoveLeft())
            }
            if (checkPlayerY("+") && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveDown())
            }
            setPlayerRotation("180deg")
            setEnemyRotation("270deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowUp'])) {
            if (checkEnemyX() && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveLeft())
            }
            if (checkPlayerY() && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveUp())
            }
            setPlayerRotation("0deg")
            setEnemyRotation("270deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX() && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyX() && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveLeft())
            }
            setEnemyRotation("270deg")
            setPlayerRotation("270deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+") && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyX() && tankDestroyedRef.current[1] === false) {
                    dispatch(enemyMoveLeft())
            }
            setEnemyRotation("270deg")
            setPlayerRotation("90deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowUp'])) {
            if (checkPlayerY() && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveUp())
            }
            if (checkEnemyY() && tankDestroyedRef.current[1] === false) {
                    dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("0deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX() && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyY() && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("270deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+") && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyY() && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("90deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowDown'])) {
            if (checkPlayerY("+") && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveDown())
            }
            if (checkEnemyY() && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("180deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowUp'])) {
            if (checkEnemyX("+") && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveRight())
            }
            if (checkPlayerY() && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveUp())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("0deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX() && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyX("+") && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveRight())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("270deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+") && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyX("+") && tankDestroyedRef.current[1] === false) {
                    dispatch(enemyMoveRight())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("90deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowDown'])) {
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveRight())
            }
            if (checkPlayerY("+") && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveDown())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("180deg")
        } else if (keysPressed['s']) {
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveDown())
            }
            setEnemyRotation("180deg")
        } else if (keysPressed['d']) {
            if (checkEnemyX("+") && tankDestroyedRef.current[1] === false) {
                    dispatch(enemyMoveRight())
            }
            setEnemyRotation("90deg")
        } else if (keysPressed['a']) {
            if (checkEnemyX() && tankDestroyedRef.current[1] === false) {
                    dispatch(enemyMoveLeft())
            }
            setEnemyRotation("270deg")
        } else if (keysPressed['w']) {
            if (checkEnemyY() && tankDestroyedRef.current[1] === false) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
        } else if (keysPressed['ArrowUp']) {
            if (checkPlayerY() && tankDestroyedRef.current[0] === false) {
                dispatch(playerMoveUp())
            }
            setPlayerRotation("0deg")
        } else if (keysPressed['ArrowDown']) {
            if (checkPlayerY("+") && tankDestroyedRef.current[0] === false) {
                    dispatch(playerMoveDown())
            }
            setPlayerRotation("180deg")
        } else if (keysPressed['ArrowLeft']) {
            if (checkPlayerX() && tankDestroyedRef.current[0] === false) {
                    dispatch(playerMoveLeft())
            }
            setPlayerRotation("270deg")
        } else if (keysPressed['ArrowRight']) {
            if (checkPlayerX("+") && tankDestroyedRef.current[0] === false) {
                    dispatch(playerMoveRight())
                    checkWalls()
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
                        setVisibility([visibility[0], "hidden"])
                        if (playerTank.current.getBoundingClientRect().x < mapRef.current.getBoundingClientRect().width / 2 + mapRef.current.getBoundingClientRect().x) {
                            dispatch(enemySpawnRight())
                        } else {
                            dispatch(enemySpawnLeft())
                        }
                        setTankDestroyed([tankDestroyed[0], true])
                        setTimeout(() => {
                            setVisibility([visibility[0], "visible"])
                            setEnemyRotation("180deg")
                            setTankDestroyed([tankDestroyed[0], false])}, 2000)
                        
                        window.cancelAnimationFrame(af)
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
                        setEnemyShell(null)
                        setShellFlying([shellFlying[0], false])
                        window.cancelAnimationFrame(af)
                        return
                    } else if (
                        eShell.getBoundingClientRect().x < playerTank.current.getBoundingClientRect().x + playerTank.current.getBoundingClientRect().width &&
                        eShell.getBoundingClientRect().x + eShell.getBoundingClientRect().width > playerTank.current.getBoundingClientRect().x &&
                        eShell.getBoundingClientRect().y < playerTank.current.getBoundingClientRect().y + playerTank.current.getBoundingClientRect().height &&
                        eShell.getBoundingClientRect().height + eShell.getBoundingClientRect().y > playerTank.current.getBoundingClientRect().y) {
                        setEnemyShell(null)
                        setShellFlying([shellFlying[0], false])
                        setVisibility(["hidden", visibility[1]])
                        if (enemyTank.current.getBoundingClientRect().x < mapRef.current.getBoundingClientRect().width / 2 + mapRef.current.getBoundingClientRect().x) {
                            dispatch(playerSpawnRight())        
                        } else {
                            dispatch(playerSpawnLeft())
                        }
                        setTankDestroyed([true, tankDestroyed[1]])
                        setTimeout(() => {
                            setVisibility(["visible", visibility[1]])
                            setPlayerRotation("0deg")
                            setTankDestroyed([false, tankDestroyed[1]])
                        }, 2000)

                        window.cancelAnimationFrame(af)
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
                <div ref={playerTank} className='tank' style={{marginLeft: `${movePlayerX}px`, marginTop: `${movePlayerY}px`, transform: `rotate(${playerRotation})`, visibility: visibility[0]}}  >
                    <div className='gun'></div>
                </div>
                <div ref={enemyTank} className='enemy' style={{marginLeft: `${moveEnemyX}px`, marginTop: `${moveEnemyY}px`, transform: `rotate(${enemyRotation})`, visibility: visibility[1]}}  >
                    <div className='gun'></div>
                </div>
                <div className='base1' style={{}}></div>
                <div className='base2' style={{}}></div>
                <Walls state={wallsArray[0]} mTop={40} mLeft={60} />
                <Walls state={wallsArray[1]} mTop={78} mLeft={208}/>
                <Walls state={wallsArray[2]} mTop={40} mLeft={360}/>
                <Walls state={wallsArray[3]} mTop={245} mLeft={60}/>
                <Walls state={wallsArray[4]} mTop={246} mLeft={208}/>
                <Walls state={wallsArray[5]} mTop={245} mLeft={360}/>
                <BaseWalls mLeft={220} />
                <BaseWalls mLeft={-60} mTop={400} deg={180} />
            </div>
        </div>
    )
}

export default Map


