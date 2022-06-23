const playerMoveX = (state = 130, action) => {
    switch(action.type) {
        case 'MOVELEFT':
            if(state === 0) {
                return state
            } else return state - 4
        case 'MOVERIGHT':
            if (state === 470) {
                return state
            } else return state + 4
        case 'PLAYERSPWNLEFT':
            return state = 130
        case 'PLAYERSPWNRIGHT':
            return state = 330
        default:
            return state;
    }
}

export default playerMoveX