import React, { useCallback, useEffect, useRef, useState } from 'react'
import kd from 'keydrown'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { checkWalls } from '../../utilites/walls_collision'
import { checkEnemyX, checkEnemyY, checkPlayerX, checkPlayerY } from '../../utilites/tank_collision'
import {shootDirection} from '../../utilites/shooting_direction'
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
import Player from '../player'
import Enemy from '../enemy'

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
            <div style={{
                visibility: "visible",
                display: "grid",
                gridTemplateRows: "35px 10px",
                gridTemplateColumns: 'repeat(2, 30px)'
            }}
                ref={el => baseWallsRef.current[index] = el}
                key={uuidv4()}>
                <div className='base-walls' style={{ width: "10px", height: "35px", visibility: "visible" }} ref={el => baseWallsRef.current[index] = el} key={uuidv4()}></div>
                <div className='base-walls' style={{
                    width: "10px",
                    height: "35px",
                    visibility: "visible",
                    justifySelf: "end"
                }} ref={el => baseWallsRef.current[index] = el} key={uuidv4()}></div>
                <div className='base-walls' style={{
                    width: "60px",
                    height: "11px",
                    visibility: "visible",
                    gridColumnStart: "1",
                    gridColumnEnd: "4"
                }} ref={el => baseWallsRef.current[index] = el}></div>
            </div >
        )
    })

    const [wallsArray] = useState([firstWall, secondWall, thirdWall, fourthWall, fifthWall, sixthWall, baseWalls[0], baseWalls[1]])




    const dispatch = useDispatch()


    // REFS
    const myStateRef = useRef(0);
    myStateRef.current = state

    const playerShellRef = useRef()
    const enemyShellRef = useRef()
    const shellFlyingRef = useRef([false, false])
    shellFlyingRef.current = shellFlying
    const currentShellPositionRef = useRef()
    currentShellPositionRef.current = currentShellPosition
    const currentPlayerRotationRef = useRef("0deg")
    currentPlayerRotationRef.current = playerRotation
    const currentEnemyRotationRef = useRef("180deg")
    currentEnemyRotationRef.current = enemyRotation

    const tankDestroyedRef = useRef()
    tankDestroyedRef.current = tankDestroyed

    const messageRef = useRef()
    messageRef.current = message


    const playerTank = useRef(null)
    const enemyTank = useRef(null)
    const mapRef = useRef(null)

    // TANK TO TANK COLLISION


    


    // ANIMATE SHELL COLLISION WITH OBJECTS

    const animate = useCallback((shell, enemyTank, tank, setShell, spawnLeft, spawnRight, tankRotation) => {
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
                    kd.stop()
                    if (index === 0) {
                        setMessage("Enemy wins! Click on the button to restart the game")


                    } else {
                        setMessage("Player wins! Click on the button to restart the game")
                    }
                }
            }
        } catch (err) { console.log(err); }

        if (shellCoordinate.top < mapCoordinate.top ||
            shellCoordinate.bottom > mapCoordinate.bottom ||
            shellCoordinate.x < mapCoordinate.left ||
            shellCoordinate.right > mapCoordinate.right) {
            setShell(null)
            tank === playerTank.current ? setShellFlying([false, shellFlyingRef.current[1]]) : setShellFlying([shellFlyingRef.current[0], false])
            window.cancelAnimationFrame(af)
            return
        } else if (shellCoordinate.x < enemyTankCoordinate.x + enemyTankCoordinate.width &&
            shellCoordinate.x + shellCoordinate.width > enemyTankCoordinate.x &&
            shellCoordinate.y < enemyTankCoordinate.y + enemyTankCoordinate.height &&
            shellCoordinate.height + shellCoordinate.y > enemyTankCoordinate.y) {
            setShell(null)
            tank === playerTank.current ? setShellFlying([false, shellFlyingRef.current[1]]) : setShellFlying([shellFlyingRef.current[0], false])
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
            for (let index = 0; index < 3; index++) {
                let wallCoordinate = wallsRef.current[7].current[0].children[index].getBoundingClientRect()
                if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                    wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                    wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                    wallCoordinate.height + wallCoordinate.y > shellCoordinate.y &&
                    wallsRef.current[7].current[0].children[index].style.visibility === "visible") {
                    setShell(null)
                    wallsRef.current[7].current[0].children[index].style.visibility = "hidden"
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
                        wallCoordinate.height + wallCoordinate.y > shellCoordinate.y &&
                        y.style.visibility === "visible") {
                        setShell(null)
                        y.style.visibility = "hidden"
                        x.current[id + 4].style.visibility = "hidden"
                        x.current[id + 8].style.visibility = "hidden"
                        x.current[id + 12].style.visibility = "hidden"

                    }
                })
            })
        } else if (tankCoordinate.y - mapCoordinate.y > mapCoordinate.height / 2 && (tankRotation === "90deg" || tankRotation === "270deg")) {
            for (let index = 0; index < 3; index++) {
                let wallCoordinate = wallsRef.current[7].current[1].children[index].getBoundingClientRect()
                if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                    wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                    wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                    wallCoordinate.height + wallCoordinate.y > shellCoordinate.y && wallsRef.current[7].current[1].children[index].style.visibility === "visible") {
                    setShell(null)
                    wallsRef.current[7].current[1].children[index].style.visibility = "hidden"
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
                        try {
                            setShell(null)
                            y.style.visibility = "hidden"
                            x.current[i + 4].style.visibility = "hidden"
                            x.current[i + 8].style.visibility = "hidden"
                            x.current[i + 12].style.visibility = "hidden"
                        } catch (err) { console.log(err); }

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
                for (let j = 0; j < 3; j++) {
                    let wallCoordinate = wallsRef.current[7].current[index].children[j].getBoundingClientRect()
                    if (wallCoordinate.x < shellCoordinate.x + shellCoordinate.width &&
                        wallCoordinate.x + wallCoordinate.width > shellCoordinate.x &&
                        wallCoordinate.y < shellCoordinate.y + shellCoordinate.height &&
                        wallCoordinate.height + wallCoordinate.y > shellCoordinate.y && wallsRef.current[7].current[index].children[j].style.visibility === "visible") {
                        setShell(null)
                        wallsRef.current[7].current[index].children[j].style.visibility = "hidden"
                    }
                }
            }
        }

    }, [dispatch, tankDestroyed, visibility])

    // FIRING SHELLS 

    const preFire = (tank) => {
        if (tank === "player") {
            setPlayerShell(<div className={[tank + "Shell"]} style={{
                marginLeft: currentShellPositionRef.current[tank + "MoveX"] + 11,
                marginTop: currentShellPositionRef.current[tank + "MoveY"] + 8,
                width: "8px"
            }}></div>)
        } else {
            setEnemyShell(<div className={[tank + "Shell"]} style={{
                marginLeft: currentShellPositionRef.current[tank + "MoveX"] + 11,
                marginTop: currentShellPositionRef.current[tank + "MoveY"] + 8,
                width: "8px"
            }}></div>)
        }
    }

    const fire = useCallback((tank) => {
        if (tank === "player") {
            playerShellRef.current = (<div ref={pShell => {
                // SHELL COLLISION DETECTION WITH WALLS AND OBJECTS
                if (pShell) {
                    animate(pShell, enemyTank.current, playerTank.current, setPlayerShell, enemySpawnLeft, enemySpawnRight, currentPlayerRotationRef.current)
                }
            }} className='playerShell' style={shootDirection(tank, currentPlayerRotationRef, currentShellPositionRef)}></div>)
            setPlayerShell(playerShellRef.current)
            setShellFlying([true, shellFlyingRef.current[1]])
        } else if (tank === "enemy") {
            enemyShellRef.current = (<div ref={eShell => {
                // SHELL COLLISION DETECTION WITH WALLS AND OBJECTS
                if (eShell) {
                    animate(eShell, playerTank.current, enemyTank.current, setEnemyShell, playerSpawnLeft, playerSpawnRight, currentEnemyRotationRef.current)
                }

            }} className='enemyShell' style={shootDirection(tank, currentEnemyRotationRef, currentShellPositionRef)}></div>)
            setEnemyShell(enemyShellRef.current)
            setShellFlying([shellFlyingRef.current[0], true])
        }

    }, [animate])

    // TANK MOVEMENT CONTROLS AND COLLISION DETECTION

    kd.ENTER.down(() => {
        if (playerShell !== null) {
            return
        } else {
            setCurrentShellPosition(myStateRef.current)
        }
        preFire("player")
        setTimeout(() => fire("player"), 4)
    })

    kd.SPACE.down(() => {
        if (enemyShell !== null) {
            return
        } else {
            setCurrentShellPosition(myStateRef.current)
        }
        preFire("enemy")
        setTimeout(() => fire("enemy"), 4)
    })

    kd.LEFT.down(() => {
        if (checkPlayerX("-", myStateRef) && tankDestroyedRef.current[0] === false && checkWalls(wallsRef, "-", "x", playerTank) !== true) {
            dispatch(playerMoveLeft())
        }
        setPlayerRotation("270deg")
    })

    kd.RIGHT.down(() => {
        if (checkPlayerX("+", myStateRef) && tankDestroyedRef.current[0] === false && checkWalls(wallsRef, "+", "x", playerTank) !== true) {
            dispatch(playerMoveRight())
        }
        setPlayerRotation("90deg")
    })

    kd.UP.down(() => {
        if (checkPlayerY("-", myStateRef) && tankDestroyedRef.current[0] === false && checkWalls(wallsRef, "-", "y", playerTank) !== true) {
            dispatch(playerMoveUp())
        }
        setPlayerRotation("0deg")
    })

    kd.DOWN.down(() => {
        if (checkPlayerY("+", myStateRef) && tankDestroyedRef.current[0] === false && checkWalls(wallsRef, "+", "y", playerTank) !== true) {
            dispatch(playerMoveDown())
        }
        setPlayerRotation("180deg")
    })

    kd.W.down(() => {
        if (checkEnemyY("-", myStateRef) && tankDestroyedRef.current[1] === false && checkWalls(wallsRef, "-", "y", enemyTank) !== true) {
            dispatch(enemyMoveUp())
        }
        setEnemyRotation("0deg")
    })

    kd.S.down(() => {
        if (checkEnemyY("+", myStateRef) && tankDestroyedRef.current[1] === false && checkWalls(wallsRef, "+", "y", enemyTank) !== true) {
            dispatch(enemyMoveDown())
        }
        setEnemyRotation("180deg")
    })

    kd.D.down(() => {
        if (checkEnemyX("+", myStateRef) && tankDestroyedRef.current[1] === false && checkWalls(wallsRef, "+", "x", enemyTank) !== true) {
            dispatch(enemyMoveRight())
        }
        setEnemyRotation("90deg")
    })

    kd.A.down(() => {
        if (checkEnemyX("-", myStateRef) && tankDestroyedRef.current[1] === false && checkWalls(wallsRef, "-", "x", enemyTank) !== true) {
            dispatch(enemyMoveLeft())
        }
        setEnemyRotation("270deg")
    })


    useEffect(() => {
        kd.run(function () {
            kd.tick();
        });
    }, [])



    


    return (
        <div className='mapContainer'>
            <div ref={mapRef} className='map'>
                {playerShell ? playerShell : null}
                {enemyShell ? enemyShell : null}
                <Player ref={playerTank} movePlayerX={movePlayerX} movePlayerY={movePlayerY} playerRotation={playerRotation} visibility={visibility[0]} />
                <Enemy ref={enemyTank} moveEnemyX={moveEnemyX} moveEnemyY={moveEnemyY} enemyRotation={enemyRotation} visibility={visibility[1]} />
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
            {message && <GameOver state={message} />}
        </div>
    )
}

export default Map


