import React from "react";
import Board from "./Board";
import PropTypes from "prop-types";
import "./tic.scss";
import Info from "./Info";

class Tic extends React.Component {
    static propTypes = {
        length: PropTypes.number.isRequired,
    };

    static defaultProps = {
        length: 3,
    };

    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(Math.pow(this.props.length, 2)).fill({}),
                    xIsNext: false,
                    winner: null,
                    position: null,
                },
            ],
            reverse: false,
        };
    }

    handleClick = (i) => {
        const history = this.state.history;
        const current = history[history.length - 1];
        let { squares, xIsNext, winner } = current;
        const position = i;

        if (winner || squares[i].value) return;

        let tmp = JSON.stringify(squares);
        const newSquares = JSON.parse(tmp);

        newSquares[i] = xIsNext ? { value: "X" } : { value: "O" };
        newSquares[i].direction = null;

        let newWinner = calculateWinner(newSquares);

        this.setState({
            history: history.concat([
                {
                    squares: newSquares,
                    xIsNext: !xIsNext,
                    winner: newWinner,
                    position,
                },
            ]),
        });
    }

    jumpTo = (move) => {
        const history = this.state.history.slice(0, move + 1);
        this.setState({ history: history });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];

        return (

            <div className="game">
                <Board
                    squares={current.squares}
                    length={this.props.length}
                    onClick={this.handleClick}
                />

                <Info winner={this.state.winner} history={history} onJumpTo={this.jumpTo} />
            </div>

        );
    }
}

// 有副作用，会修改squares中的值
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const real = squares.map((square) => square.value);
    let winner = null;

    let isSome = lines.some(([a, b, c], index) => {
        if (real[a] && real[a] === real[b] && real[a] === real[c]) {
            squares[a].direction = squares[b].direction = squares[c].direction =
                index < 3
                    ? "direction1"
                    : index < 6
                        ? "direction2"
                        : index === 6
                            ? "direction3"
                            : "direction4";
            winner = real[a];
            return true;
        }
        return false;
    });

    if (isSome) return winner;
    if (real.every((value) => value != null)) return "Tie";
    return null;
}

export default Tic;
