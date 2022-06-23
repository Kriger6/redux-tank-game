const playerMoveY = (state = 414, action) => {
    switch (action.type) {
        case 'MOVEUP':
            if (state === 0) {
                return state
            } else return state - 4
        case 'MOVEDOWN':
            if (state === 414) {
                return state
            } else return state + 4
        case 'PLAYERSPWNLEFT':
            return state = 414
        case 'PLAYERSPWNRIGHT':
            return state = 414
        default:
            return state;
    }
}

export default playerMoveY