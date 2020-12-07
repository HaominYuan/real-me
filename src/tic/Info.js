import React, { useCallback, useState } from "react";
import Moves from "./Moves";

const Info = props => {
    const [reverse, setReverse] = useState(false)

    const handleClick = useCallback(() => {
        setReverse(reverse => !reverse)
    }, [setReverse])

    const handleJumpTo = useCallback((index) => {
        if (!props.onJumpTo) return
        props.onJumpTo(index)
    }, [props])

    const { history } = props;
    const current = history[history.length - 1];

    const status = current.winner
        ? current.winner === "Tie"
            ? "Tie"
            : "Winner: " + current.winner
        : "Next player: " + (current.xIsNext ? "X" : "O");

    return (
        <div className="info">
            <div className="game-status">{status}</div>
            <button onClick={handleClick}>{reverse ? "降序" : "升序"}</button>
            <Moves reverse={reverse} history={props.history} handleJumpTo={handleJumpTo}/>
        </div>
    )

}

export default Info
