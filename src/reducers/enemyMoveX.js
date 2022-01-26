const enemyMoveX = (state = 330, action) => {
    switch (action.type) {
        case 'ENEMYLEFT':
            if (state === 0) {
                return state
            } else return state - 2
        case 'ENEMYRIGHT':
            if (state === 470) {
                return state
            } else return state + 2
        default:
            return state;
    }
}

export default enemyMoveX