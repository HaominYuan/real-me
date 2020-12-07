import React from 'react'

export default React.memo((props) => {
    let moves = props.history.map((step, move) => {
        const y = step.position % 3;
        const x = (step.position - y) / 3;
        const desc = move
            ? `${step.xIsNext ? "O" : "X"} go to move # (${x}, ${y})`
            : `Go to game start`;

        return (
            <li key={move}>
                <button onClick={() => props.handleJumpTo(move)}>
                    {desc}
                </button>
            </li>
        );
    })
    moves = props.reverse ? moves.reverse() : moves

    return (
        <ol>{moves}</ol>
    )
})