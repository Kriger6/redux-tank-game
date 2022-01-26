const enemyMoveY = (state = 0, action) => {
    switch (action.type) {
        case 'ENEMYUP':
            if (state === 0) {
                return state
            } else return state - 2
        case 'ENEMYDOWN':
            if (state === 414) {
                return state
            } else return state + 2
        default:
            return state;
    }
}

export default enemyMoveY