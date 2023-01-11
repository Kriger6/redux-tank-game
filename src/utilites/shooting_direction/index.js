export const shootDirection = (tank, rotation, currentShellPositionRef) => {
    if (rotation.current === "0deg") {
        return {
            marginLeft: currentShellPositionRef.current[tank + "MoveX"] + 11,
            marginTop: currentShellPositionRef.current[tank + "MoveY"] - 490,
        }

    } else if (rotation.current === "180deg") {
        return {
            marginLeft: currentShellPositionRef.current[tank + "MoveX"] + 11,
            marginTop: currentShellPositionRef.current[tank + "MoveY"] + 442,
            transform: `rotate(180deg)`
        }

    } else if (rotation.current === "90deg") {
        return {
            marginLeft: currentShellPositionRef.current[tank + "MoveX"] + 490,
            marginTop: currentShellPositionRef.current[tank + "MoveY"] + 7,
            transform: `rotate(90deg)`
        }
    } else if (rotation.current === "270deg") {
        return {
            marginLeft: currentShellPositionRef.current[tank + "MoveX"] - 490,
            marginTop: currentShellPositionRef.current[tank + "MoveY"] + 7,
            transform: `rotate(270deg)`
        }
    }
}