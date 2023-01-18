export function shellHitBase(wallsRef, shellCoordinate, setShell, kd, setMessage) {
        for (let index = 0; index < 2; index++) {
            if (!wallsRef.current[6].current[index]) return
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
}

export function shellHitBoundary(shellCoordinate, mapCoordinate, setShell, tank, playerTank, setShellFlying, shellFlyingRef, af) {
    if (shellCoordinate.top < mapCoordinate.top ||
        shellCoordinate.bottom > mapCoordinate.bottom ||
        shellCoordinate.x < mapCoordinate.left ||
        shellCoordinate.right > mapCoordinate.right) {
        setShell(null)
        tank === playerTank.current ? setShellFlying([false, shellFlyingRef.current[1]]) : setShellFlying([shellFlyingRef.current[0], false])
        window.cancelAnimationFrame(af)
        return
    }
}

export function shellHitTank(shellCoordinate, enemyTankCoordinate, setShell, tank,
    playerTank, setShellFlying, shellFlyingRef, setVisibility, visibility, mapRef,
    dispatch, spawnRight, spawnLeft, setTankDestroyed, tankDestroyed, setEnemyRotation,
    setPlayerRotation, af) {
    if (shellCoordinate.x < enemyTankCoordinate.x + enemyTankCoordinate.width &&
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
}

export function shellHitWalls(tankCoordinate, mapCoordinate, tankRotation, wallsRef, shellCoordinate, setShell) {
    if (tankCoordinate.y - mapCoordinate.y < mapCoordinate.height / 2 && (tankRotation === "90deg" || tankRotation === "270deg")) {
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
                    if (x.current[id + 4]) x.current[id + 4].style.visibility = "hidden"
                    if (x.current[id + 8]) x.current[id + 8].style.visibility = "hidden"
                    if (x.current[id + 12]) x.current[id + 12].style.visibility = "hidden"

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
                    setShell(null)
                    y.style.visibility = "hidden"
                    if (x.current[i + 4]) x.current[i + 4].style.visibility = "hidden"
                    if (x.current[i + 8]) x.current[i + 8].style.visibility = "hidden"
                    if (x.current[i + 12]) x.current[i + 12].style.visibility = "hidden"
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
}
