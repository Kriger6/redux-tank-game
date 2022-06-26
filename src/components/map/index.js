import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Walls from '../walls/'
import BaseWalls from '../base_walls'
import GameOver from '../game_over'
import {
    playerMoveLeft,
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
    playerSpawnRight
} from '../../actions'

const Map = () => {



    const movePlayerX = useSelector(state => state.playerMoveX)
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

    const [message, setMessage] = useState(null)


    const firstWallRef = useRef([])
    const secondWallRef = useRef([])
    const thirdWallRef = useRef([])
    const fourthWallRef = useRef([])
    const fifthWallRef = useRef([])
    const sixthWallRef = useRef([])
    const basesRef = useRef([])
    const baseWallsRef = useRef([])
    const wallsRef = useRef([firstWallRef, secondWallRef, thirdWallRef, fourthWallRef, fifthWallRef, sixthWallRef, basesRef, baseWallsRef])


    // CONTAINS INTERNAL WALLS
    let firstWall = Array(32).fill(null)
    firstWall = Array.from(firstWall, (x, index) => <div className='wall' ref={el => firstWallRef.current[index] = el} style={{ visibility: "visible" }} key={uuidv4()}></div>)
    let secondWall = Array(24).fill(null)
    secondWall = Array.from(secondWall, (x, index) => <div className='wall' ref={el => secondWallRef.current[index] = el} style={{ visibility: "visible" }} key={uuidv4()}></div>)
    let thirdWall = Array(32).fill(null)
    thirdWall = Array.from(thirdWall, (x, index) => <div className='wall' ref={el => thirdWallRef.current[index] = el} style={{ visibility: "visible" }} key={uuidv4()}></div>)
    let fourthWall = Array(32).fill(null)
    fourthWall = Array.from(fourthWall, (x, index) => <div className='wall' ref={el => fourthWallRef.current[index] = el} style={{ visibility: "visible" }} key={uuidv4()}></div>)
    let fifthWall = Array(24).fill(null)
    fifthWall = Array.from(fifthWall, (x, index) => <div className='wall' ref={el => fifthWallRef.current[index] = el} style={{ visibility: "visible" }} key={uuidv4()}></div>)
    let sixthWall = Array(32).fill(null)
    sixthWall = Array.from(sixthWall, (x, index) => <div className='wall' ref={el => sixthWallRef.current[index] = el} style={{ visibility: "visible" }} key={uuidv4()}></div>)

    let baseWalls = Array(2).fill(null)
    baseWalls = Array.from(baseWalls, (x, index) => {
        return (
            <div style={{visibility: "visible"}} ref={el => baseWallsRef.current[index] = el} key={uuidv4()}>
                <div style={{ display: "flex", width: "60px", justifyContent: "space-between" }} ref={el => baseWallsRef.current[index] = el}>
                    <div style={{ backgroundColor: "rgba(49, 30, 20, 0.763)", width: "10px", height: "35px", visibility: "visible" }} ref={el => baseWallsRef.current[index] = el} key={uuidv4()}></div>
                    <div style={{ backgroundColor: "rgba(49, 30, 20, 0.763)", width: "10px", height: "35px", visibility: "visible" }} ref={el => baseWallsRef.current[index] = el} key={uuidv4()}></div>
                </div>
                <div style={{ backgroundColor: "rgba(49, 30, 20, 0.763)", width: "60px", height: "10px", visibility: "visible" }} ref={el => baseWallsRef.current[index] = el}></div>
            </div>
        )
    })

    const [wallsArray] = useState([firstWall, secondWall, thirdWall, fourthWall, fifthWall, sixthWall, baseWalls[0], baseWalls[1]])

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


    const playerTank = useRef(null)
    const enemyTank = useRef(null)
    const mapRef = useRef(null)

    // TANK TO INTERNAL WALLS COLLISON

    const checkWalls = (operator, axis, tank) => {
        let value = false
        let tankCoordinate = tank.current.getBoundingClientRect()
        wallsRef.current.forEach(x => {
            x.current.forEach(y => {
                let coordinate = y.getBoundingClientRect()
                if (operator === "+" && axis === "x") {
                    if (tankCoordinate.x + 2 < coordinate.x + coordinate.width &&
                        tankCoordinate.x + 2 + tankCoordinate.width > coordinate.x &&
                        tankCoordinate.y < coordinate.y + coordinate.height &&
                        tankCoordinate.height + tankCoordinate.y > coordinate.y &&
                        y.style.visibility === "visible") {
                        value = true
                    }
                }
                if (operator === "-" && axis === "x") {
                    if (tankCoordinate.x - 2 < coordinate.x + coordinate.width &&
                        tankCoordinate.x - 2 + tankCoordinate.width > coordinate.x &&
                        tankCoordinate.y < coordinate.y + coordinate.height &&
                        tankCoordinate.height + tankCoordinate.y > coordinate.y &&
                        y.style.visibility === "visible") {
                        value = true
                    }
                }
                if (operator === "+" && axis === "y") {
                    if (tankCoordinate.x < coordinate.x + coordinate.width &&
                        tankCoordinate.x + tankCoordinate.width > coordinate.x &&
                        tankCoordinate.y + 2 < coordinate.y + coordinate.height &&
                        tankCoordinate.height + 2 + tankCoordinate.y > coordinate.y &&
                        y.style.visibility === "visible") {
                        value = true
                    }
                }
                if (operator === "-" && axis === "y") {
                    if (tankCoordinate.x < coordinate.x + coordinate.width &&
                        tankCoordinate.x + tankCoordinate.width > coordinate.x &&
                        tankCoordinate.y - 2 < coordinate.y + coordinate.height &&
                        tankCoordinate.height - 2 + tankCoordinate.y > coordinate.y &&
                        y.style.visibility === "visible") {
                        value = true
                    }
                }
            })
        })
        return value
    }



    // TANK TO TANK COLLISION


    const checkPlayerX = (operator) => {
        if (operator === "+") {
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
                return
            }
        } catch (err) { }
        try {
            event.stopImmediatePropagation()
        } catch (err) { }
        try {
            if (event.type !== "keyup") {
                clearInterval(time)
                time = undefined
                event.key.startsWith('Ar') ? keysPressed[event.key] = true : keysPressed[event.key.toLowerCase()] = true;
            }
        } catch (err) { }

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
        } catch (err) { }
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
        } catch (err) { }

        // MOVEMENT CONTROLS

        if ((keysPressed['s'] && keysPressed['ArrowUp'])) {
            if (checkPlayerY() && tankDestroyedRef.current[0] === false && checkWalls("-", "y", playerTank) !== true) {
                dispatch(playerMoveUp())
            }
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false && checkWalls("+", "y", enemyTank) !== true) {
                dispatch(enemyMoveDown())
            }
            setPlayerRotation("0deg")
            setEnemyRotation("180deg")
        } else if ((keysPressed['s'] && keysPressed['ArrowDown'])) {
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false && checkWalls("+", "y", enemyTank) !== true) {
                dispatch(enemyMoveDown())
            }
            if (checkPlayerY("+") && tankDestroyedRef.current[0] === false && checkWalls("+", "y", playerTank) !== true) {
                dispatch(playerMoveDown())
            }
            setPlayerRotation("180deg")
            setEnemyRotation("180deg")
        } else if ((keysPressed['s'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX() && tankDestroyedRef.current[0] === false && checkWalls("-", "x", playerTank) !== true) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false && checkWalls("+", "y", enemyTank) !== true) {
                dispatch(enemyMoveDown())
            }
            setPlayerRotation("270deg")
            setEnemyRotation("180deg")
        } else if ((keysPressed['s'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+") && tankDestroyedRef.current[0] === false && checkWalls("+", "x", playerTank) !== true) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false && checkWalls("+", "y", enemyTank) !== true) {
                dispatch(enemyMoveDown())
            }
            setPlayerRotation("90deg")
            setEnemyRotation("180deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowDown'])) {
            if (checkEnemyX() && tankDestroyedRef.current[1] === false && checkWalls("-", "x", playerTank) !== true) {
                dispatch(enemyMoveLeft())
            }
            if (checkPlayerY("+") && tankDestroyedRef.current[0] === false && checkWalls("+", "y", playerTank) !== true) {
                dispatch(playerMoveDown())
            }
            setPlayerRotation("180deg")
            setEnemyRotation("270deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowUp'])) {
            if (checkEnemyX() && tankDestroyedRef.current[1] === false && checkWalls("-", "x", enemyTank) !== true) {
                dispatch(enemyMoveLeft())
            }
            if (checkPlayerY() && tankDestroyedRef.current[0] === false && checkWalls("-", "y", playerTank) !== true) {
                dispatch(playerMoveUp())
            }
            setPlayerRotation("0deg")
            setEnemyRotation("270deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX() && tankDestroyedRef.current[0] === false && checkWalls("-", "x", playerTank) !== true) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyX() && tankDestroyedRef.current[1] === false && checkWalls("-", "x", enemyTank) !== true) {
                dispatch(enemyMoveLeft())
            }
            setEnemyRotation("270deg")
            setPlayerRotation("270deg")
        } else if ((keysPressed['a'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+") && tankDestroyedRef.current[0] === false && checkWalls("+", "x", playerTank) !== true) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyX() && tankDestroyedRef.current[1] === false && checkWalls("-", "x", enemyTank) !== true) {
                dispatch(enemyMoveLeft())
            }
            setEnemyRotation("270deg")
            setPlayerRotation("90deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowUp'])) {
            if (checkPlayerY() && tankDestroyedRef.current[0] === false && checkWalls("-", "y", playerTank) !== true) {
                dispatch(playerMoveUp())
            }
            if (checkEnemyY() && tankDestroyedRef.current[1] === false && checkWalls("-", "y", enemyTank) !== true) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("0deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX() && tankDestroyedRef.current[0] === false && checkWalls("-", "x", playerTank) !== true) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyY() && tankDestroyedRef.current[1] === false && checkWalls("-", "y", enemyTank) !== true) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("270deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+") && tankDestroyedRef.current[0] === false && checkWalls("+", "x", playerTank) !== true) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyY() && tankDestroyedRef.current[1] === false && checkWalls("-", "y", enemyTank) !== true) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("90deg")
        } else if ((keysPressed['w'] && keysPressed['ArrowDown'])) {
            if (checkPlayerY("+") && tankDestroyedRef.current[0] === false && checkWalls("+", "y", playerTank) !== true) {
                dispatch(playerMoveDown())
            }
            if (checkEnemyY() && tankDestroyedRef.current[1] === false && checkWalls("-", "y", enemyTank) !== true) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
            setPlayerRotation("180deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowUp'])) {
            if (checkEnemyX("+") && tankDestroyedRef.current[1] === false && checkWalls("+", "x", enemyTank) !== true) {
                dispatch(enemyMoveRight())
            }
            if (checkPlayerY() && tankDestroyedRef.current[0] === false && checkWalls("-", "y", playerTank) !== true) {
                dispatch(playerMoveUp())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("0deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowLeft'])) {
            if (checkPlayerX() && tankDestroyedRef.current[0] === false && checkWalls("-", "x", playerTank) !== true) {
                dispatch(playerMoveLeft())
            }
            if (checkEnemyX("+") && tankDestroyedRef.current[1] === false && checkWalls("+", "x", enemyTank) !== true) {
                dispatch(enemyMoveRight())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("270deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowRight'])) {
            if (checkPlayerX("+") && tankDestroyedRef.current[0] === false && checkWalls("+", "x", playerTank) !== true) {
                dispatch(playerMoveRight())
            }
            if (checkEnemyX("+") && tankDestroyedRef.current[1] === false && checkWalls("+", "x", enemyTank) !== true) {
                dispatch(enemyMoveRight())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("90deg")
        } else if ((keysPressed['d'] && keysPressed['ArrowDown'])) {
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false && checkWalls("+", "y", enemyTank) !== true) {
                dispatch(enemyMoveRight())
            }
            if (checkPlayerY("+") && tankDestroyedRef.current[0] === false && checkWalls("+", "y", playerTank) !== true) {
                dispatch(playerMoveDown())
            }
            setEnemyRotation("90deg")
            setPlayerRotation("180deg")
        } else if (keysPressed['s']) {
            if (checkEnemyY("+") && tankDestroyedRef.current[1] === false && checkWalls("+", "y", enemyTank) !== true) {
                dispatch(enemyMoveDown())
            }
            setEnemyRotation("180deg")
        } else if (keysPressed['d']) {
            if (checkEnemyX("+") && tankDestroyedRef.current[1] === false && checkWalls("+", "x", enemyTank) !== true) {
                dispatch(enemyMoveRight())
            }
            setEnemyRotation("90deg")
        } else if (keysPressed['a']) {
            if (checkEnemyX() && tankDestroyedRef.current[1] === false && checkWalls("-", "x", enemyTank) !== true) {
                dispatch(enemyMoveLeft())
            }
            setEnemyRotation("270deg")
        } else if (keysPressed['w']) {
            if (checkEnemyY() && tankDestroyedRef.current[1] === false && checkWalls("-", "y", enemyTank) !== true) {
                dispatch(enemyMoveUp())
            }
            setEnemyRotation("0deg")
        } else if (keysPressed['ArrowUp']) {
            if (checkPlayerY() && tankDestroyedRef.current[0] === false && checkWalls("-", "y", playerTank) !== true) {
                dispatch(playerMoveUp())
            }
            setPlayerRotation("0deg")
        } else if (keysPressed['ArrowDown']) {
            if (checkPlayerY("+") && tankDestroyedRef.current[0] === false && checkWalls("+", "y", playerTank) !== true) {
                dispatch(playerMoveDown())
            }
            setPlayerRotation("180deg")
        } else if (keysPressed['ArrowLeft']) {
            if (checkPlayerX() && tankDestroyedRef.current[0] === false && checkWalls("-", "x", playerTank) !== true) {
                dispatch(playerMoveLeft())
            }
            setPlayerRotation("270deg")
        } else if (keysPressed['ArrowRight']) {
            if (checkPlayerX("+") && tankDestroyedRef.current[0] === false && checkWalls("+", "x", playerTank) !== true) {
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

    // ANIMATE SHELL COLLISION WITH OBJECTS

    const animate = (shell, enemyTank, tank, setShell, spawnLeft, spawnRight, tankRotation) => {
        let shellCoordinate = shell.getBoundingClientRect()
        let mapCoordinate = mapRef.current.getBoundingClientRect()
        let enemyTankCoordinate = enemyTank.getBoundingClientRect()
        let tankCoordinate = tank.getBoundingClientRect()

        var af = requestAnimationFrame(function () {
            animate(shell, enemyTank, tank, setShell, spawnLeft, spawnRight, tankRotation)
        })

        try {
            for (let index = 0; index < 2; index++) {
                let wallCoordinate = wallsRef.current[6].current[index].getBoundingClientRect()
                if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                    wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                    wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                    wallCoordinate.height + wallCoordinate.y > shellCoordinate.y && wallsRef.current[6].current[index].style.visibility === "visible") {
                    setShell(null)
                    wallsRef.current[6].current[index].style.visibility = "hidden"
                    if (index === 0) {
                            setMessage("Enemy wins! Click on the button to restart the game")
                        
                    } else {
                            setMessage("Player wins! Click on the button to restart the game")
                    }
                }
            }
        } catch(err) {console.log(err);}
 
        for (let index = 0; index < 2; index++) {
            let wallCoordinate = wallsRef.current[7].current[index].children[1].getBoundingClientRect()
            if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                wallCoordinate.height + wallCoordinate.y > shellCoordinate.y && wallsRef.current[7].current[index].children[1].style.visibility === "visible") {
                setShell(null)
                wallsRef.current[7].current[index].children[1].style.visibility = "hidden"
            }
        }

        if (shellCoordinate.y < mapCoordinate.top ||
            shellCoordinate.y > mapCoordinate.bottom ||
            shellCoordinate.x < mapCoordinate.left ||
            shellCoordinate.x > mapCoordinate.right) {
            setShell(null)
            tank === playerTank.current ? setShellFlying([false, shellFlying[1]]) : setShellFlying([shellFlying[0], false])
            window.cancelAnimationFrame(af)
            return
        } else if (shellCoordinate.x < enemyTankCoordinate.x + enemyTankCoordinate.width &&
            shellCoordinate.x + shellCoordinate.width > enemyTankCoordinate.x &&
            shellCoordinate.y < enemyTankCoordinate.y + enemyTankCoordinate.height &&
            shellCoordinate.height + shellCoordinate.y > enemyTankCoordinate.y) {
            setShell(null)
            tank === playerTank.current ? setShellFlying([false, shellFlying[1]]) : setShellFlying([shellFlying[0], false])
            tank === playerTank.current ? setVisibility([visibility[0], "hidden"]) : setVisibility(["hidden", visibility[1]])
            if (tank.getBoundingClientRect().x < mapRef.current.getBoundingClientRect().width / 2 + mapRef.current.getBoundingClientRect().x) {
                dispatch(spawnRight())
            } else {
                dispatch(spawnLeft())
            }
            tank === playerTank.current ? setTankDestroyed([tankDestroyed[0], true]) : setTankDestroyed([true, tankDestroyed[1]])
            setTimeout(() => {
                tank === playerTank.current ? setVisibility([visibility[0], "visible"]) : setVisibility(["visible", visibility[1]])
                tank === playerTank.current ? setEnemyRotation("180deg") : setPlayerRotation("0deg")
                tank === playerTank.current ? setTankDestroyed([tankDestroyed[0], false]) : setTankDestroyed([false, tankDestroyed[1]])
            }, 2000)

            window.cancelAnimationFrame(af)
        }
        else if (tankCoordinate.y - mapCoordinate.y < mapCoordinate.height / 2 && (tankRotation === "90deg" || tankRotation === "270deg")) {
            for (let index = 0; index < 2; index++) {
                let wallCoordinate = wallsRef.current[7].current[0].children[0].children[index].getBoundingClientRect()
                if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                    wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                    wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                    wallCoordinate.height + wallCoordinate.y > shellCoordinate.y && wallsRef.current[7].current[0].children[0].children[index].style.visibility === "visible") {
                    setShell(null)
                    wallsRef.current[7].current[0].children[0].children[index].style.visibility = "hidden"
                }
            }
            wallsRef.current.forEach((x, index) => {
                if (index > 2) {
                    return
                }
                x.current.forEach((y, id) => {
                    let wallCoordinate = y.getBoundingClientRect()
                    if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                        wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                        wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                        wallCoordinate.height + wallCoordinate.y > shellCoordinate.y && y.style.visibility === "visible") {
                        setShell(null)
                        y.style.visibility = "hidden"
                        x.current[id + 4].style.visibility = "hidden"
                        x.current[id + 8].style.visibility = "hidden"
                        x.current[id + 12].style.visibility = "hidden"

                    }
                })
            })
        } else if (tankCoordinate.y - mapCoordinate.y > mapCoordinate.height / 2 && (tankRotation === "90deg" || tankRotation === "270deg")) {
            for (let index = 0; index < 2; index++) {
                let wallCoordinate = wallsRef.current[7].current[1].children[0].children[index].getBoundingClientRect()
                if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                    wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                    wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                    wallCoordinate.height + wallCoordinate.y > shellCoordinate.y && wallsRef.current[7].current[1].children[0].children[index].style.visibility === "visible") {
                    setShell(null)
                    wallsRef.current[7].current[1].children[0].children[index].style.visibility = "hidden"
                }
            }
            wallsRef.current.forEach((x, index) => {
                if (index < 2 || index > 5) {
                    return
                }
                x.current.forEach((y, i) => {
                    let wallCoordinate = y.getBoundingClientRect()
                    if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                        wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                        wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                        wallCoordinate.height + wallCoordinate.y > shellCoordinate.y && y.style.visibility === "visible") {
                        setShell(null)
                        y.style.visibility = "hidden"
                        x.current[i + 4].style.visibility = "hidden"
                        x.current[i + 8].style.visibility = "hidden"
                        x.current[i + 12].style.visibility = "hidden"

                    }
                })

            })
        } else if (tankRotation === "0deg" || tankRotation === "180deg") {
            wallsRef.current.forEach((x, index) => {
                if (index > 5) {
                    return
                }
                x.current.forEach((y, i) => {
                    let wallCoordinate = y.getBoundingClientRect()
                    if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                        wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                        wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                        wallCoordinate.height + wallCoordinate.y > shellCoordinate.y && y.style.visibility === "visible") {
                        setShell(null)
                        y.style.visibility = "hidden"
                        x.current[i + 1].style.visibility = "hidden"
                        x.current[i + 2].style.visibility = "hidden"
                        x.current[i + 3].style.visibility = "hidden"
                    }
                })
            })
            for (let index = 0; index < 2; index++) {
                let wallCoordinate = wallsRef.current[7].current[index].children[1].getBoundingClientRect()
                if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                    wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                    wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                    wallCoordinate.height + wallCoordinate.y > shellCoordinate.y && wallsRef.current[7].current[index].children[1].style.visibility === "visible") {
                    setShell(null)
                    wallsRef.current[7].current[index].children[1].style.visibility = "hidden"
                }
            }
        } 

    }
    const fire = (tank) => {
        if (tank === "player") {
            playerShellRef.current = (<div ref={pShell => {
                // SHELL COLLISION DETECTION WITH WALLS AND OBJECTS
                if (pShell) {
                    animate(pShell, enemyTank.current, playerTank.current, setPlayerShell, enemySpawnLeft, enemySpawnRight, currentPlayerRotationRef.current)
                }
            }} className='playerShell' style={shootDirection(tank, currentPlayerRotationRef)}></div>)
            setPlayerShell(playerShellRef.current)
            setShellFlying([true, shellFlying[1]])
        } else if (tank === "enemy") {
            enemyShellRef.current = (<div ref={eShell => {
                // SHELL COLLISION DETECTION WITH WALLS AND OBJECTS
                if (eShell) {
                    animate(eShell, playerTank.current, enemyTank.current, setEnemyShell, playerSpawnLeft, playerSpawnRight, currentEnemyRotationRef.current)
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
                <div ref={playerTank} className='tank' style={{ marginLeft: `${movePlayerX}px`, marginTop: `${movePlayerY}px`, transform: `rotate(${playerRotation})`, visibility: visibility[0] }}  >
                    <div className='gun'></div>
                </div>
                <div ref={enemyTank} className='enemy' style={{ marginLeft: `${moveEnemyX}px`, marginTop: `${moveEnemyY}px`, transform: `rotate(${enemyRotation})`, visibility: visibility[1] }}  >
                    <div className='gun'></div>
                </div>
                <div className='base1' ref={el => basesRef.current[0] = el} style={{ visibility: "visible" }}></div>
                <div className='base2' ref={el => basesRef.current[1] = el} style={{ visibility: "visible" }}></div>
                <Walls state={wallsArray[0]} mTop={40} mLeft={60} />
                <Walls state={wallsArray[1]} mTop={78} mLeft={208} />
                <Walls state={wallsArray[2]} mTop={40} mLeft={360} />
                <Walls state={wallsArray[3]} mTop={245} mLeft={60} />
                <Walls state={wallsArray[4]} mTop={246} mLeft={208} />
                <Walls state={wallsArray[5]} mTop={245} mLeft={360} />
                <BaseWalls state={wallsArray[6]} mLeft={220} />
                <BaseWalls state={wallsArray[7]} mLeft={-60} mTop={400} deg={180} />
            </div>
            {message && <GameOver state={message}/>}
        </div>
    )
}

export default Map


