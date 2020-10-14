import React from "react";
import Board from './Board'

import "./game.scss"


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    xIsNext: false,
                    winner: {},
                    position: undefined
                }
            ],
            reverse: false
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        let {squares, xIsNext, winner} = current;
        const position = i;

        if (winner.name || squares[i]) 
            return;
        const newSquares = squares.slice();

        newSquares[i] = xIsNext
            ? "X"
            : "O";
        let newWinner = calculateWinner(newSquares);

        this.setState({
            history: history.concat([
                {
                    squares: newSquares,
                    xIsNext: !xIsNext,
                    winner: newWinner,
                    position
                }
            ])
        });
    }

    jumpTo(move) {
        const history = this
            .state
            .history
            .slice(0, move + 1);
        this.setState({history: history});
    }

    reverse() {
        const reverse = this.state.reverse;
        this.setState({
            reverse: !reverse
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        let reverse = this.state.reverse;
        const moves = history.map((step, move) => {
            const y = step.position % 3;
            const x = (step.position - y) / 3;

            const desc = move
                ? `${step.xIsNext
                    ? "O"
                    : "X"} go to move # (${x}, ${y})`
                : `Go to game start`;

            return (
                <div key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </div>
            );
        });

        if (reverse) 
            moves.reverse();
        reverse = reverse
            ? "升序"
            : "降序";

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winner={current.winner}
                        squares={current.squares}
                        xIsNext={current.xIsNext}
                        onClick={this
                            .handleClick
                            .bind(this)}/>
                </div>
                <div className="game-info">
                    <div>
                        <button onClick={() => this.reverse()}>{reverse}</button>
                    </div>
                    <div>{moves}</div>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [
            0, 1, 2
        ],
        [
            3, 4, 5
        ],
        [
            6, 7, 8
        ],
        [
            0, 3, 6
        ],
        [
            1, 4, 7
        ],
        [
            2, 5, 8
        ],
        [
            0, 4, 8
        ],
        [
            2, 4, 6
        ]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                name: squares[a],
                indices: [
                    a, b, c
                ],
                direction: i < 3
                    ? "direction1"
                    : i < 6
                        ? "direction2"
                        : i === 6
                            ? "direction3"
                            : "direction4"
            };
        }
    }

    return squares.some((value) => {
        return !value;
    })
        ? {
            name: undefined,
            indices: undefined,
            direction: undefined
        }
        : {
            name: "Tie",
            indices: undefined,
            direction: undefined
        };
}

export default Game