export const checkWalls = (wallsRef, operator, axis, tank) => {
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