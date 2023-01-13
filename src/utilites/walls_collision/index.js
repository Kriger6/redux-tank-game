export const checkWalls = (wallsRef, operator, axis, tank) => {
    let tankCoordinate = tank.current.getBoundingClientRect()
    let value = false
    wallsRef.current.some((x, index) => {
        return x.current.some((y) => {
            let coordinate = y.getBoundingClientRect()
            if (index < 7) {
                let result = collisionDetection(operator, axis, tankCoordinate, coordinate, y)
                result === true ? value = true : value = false
                return result
            }
            if (index === 7) {
                Array.from(y.children).some(z => {
                    // console.log(z);
                    let rezult = collisionDetection(operator, axis, tankCoordinate, coordinate, z)
                    rezult === true ? value = true : value = false
                    return rezult
                })
            }
        })
    })
    return value
}

function collisionDetection(operator, axis, tankCoordinate, coordinate, y) {
    if (operator === "+" && axis === "x") {
        if (tankCoordinate.x + 2 < coordinate.x + coordinate.width &&
            tankCoordinate.x + 2 + tankCoordinate.width > coordinate.x &&
            tankCoordinate.y < coordinate.y + coordinate.height &&
            tankCoordinate.height + tankCoordinate.y > coordinate.y &&
            y.style.visibility === "visible") {
            return true
        }
    }
    if (operator === "-" && axis === "x") {
        if (tankCoordinate.x - 2 < coordinate.x + coordinate.width &&
            tankCoordinate.x - 2 + tankCoordinate.width > coordinate.x &&
            tankCoordinate.y < coordinate.y + coordinate.height &&
            tankCoordinate.height + tankCoordinate.y > coordinate.y &&
            y.style.visibility === "visible") {
            return true
        }
    }
    if (operator === "+" && axis === "y") {
        if (tankCoordinate.x < coordinate.x + coordinate.width &&
            tankCoordinate.x + tankCoordinate.width > coordinate.x &&
            tankCoordinate.y + 2 < coordinate.y + coordinate.height &&
            tankCoordinate.height + 2 + tankCoordinate.y > coordinate.y &&
            y.style.visibility === "visible") {
            return true
        }
    }
    if (operator === "-" && axis === "y") {
        if (tankCoordinate.x < coordinate.x + coordinate.width &&
            tankCoordinate.x + tankCoordinate.width > coordinate.x &&
            tankCoordinate.y - 2 < coordinate.y + coordinate.height &&
            tankCoordinate.height - 2 + tankCoordinate.y > coordinate.y &&
            y.style.visibility === "visible") {
            return true
        }
    }
}




