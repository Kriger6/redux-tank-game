export const checkPlayerX = (operator, myStateRef) => {
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

export const checkPlayerY = (operator, myStateRef) => {
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

export const checkEnemyX = (operator, myStateRef) => {
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

export const checkEnemyY = (operator, myStateRef) => {
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