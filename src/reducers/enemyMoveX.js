const enemyMoveX = (state = 340, action) => {
    switch (action.type) {
        case 'ENEMYLEFT':
            if (state === 0) {
                return state
            } else return state - 2
        case 'ENEMYRIGHT':
            if (state === 470) {
                return state
            } else return state + 2
        case 'ENEMYSPWNLEFT':
            return state = 130
        case 'ENEMYSPWNRIGHT':
            return state = 340
        default:
            return state;
    }
}

export default enemyMoveX