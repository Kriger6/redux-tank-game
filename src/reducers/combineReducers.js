import playerMoveX from "./playerMoveX";
import playerMoveY from "./playerMoveY";
import enemyMoveX from "./enemyMoveX";
import enemyMoveY from "./enemyMoveY";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    playerMoveX,
    playerMoveY,
    enemyMoveX,
    enemyMoveY
})

export default allReducers