export function shellHitBase(wallsRef, shellCoordinate, setShell, kd, setMessage) {
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
