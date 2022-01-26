const playerMoveX = (state = 130, action) => {
    switch(action.type) {
        case 'MOVELEFT':
            if(state === 0) {
                return state
            } else return state - 2
        case 'MOVERIGHT':
            if (state === 470) {
                return state
            } else return state + 2
        default:
            return state;
    }
}

export default playerMoveX