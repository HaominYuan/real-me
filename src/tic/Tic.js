import React, { useCallback, useState } from "react";
import Board from "./Board";
import style from "./tic.module.scss";
import Info from "./Info";

let index = 0;

const getBest = (squares, turn, level) => {
    let result = getWinner(squares)

    if (result) return result

    if (squares.every((value) => {
        return value
    })) return 0

    let value = turn ? 1 : -1
    for (let i = 0; i < squares.length; i++) {
        if (squares[i]) continue
        squares[i] = turn ? 'O' : 'X'
        let number = getBest(squares, !turn, level + 1)
        squares[i] = undefined;

        value = turn ? Math.min(value, number) : Math.max(value, number)
        if (level === 0 && value === number) index = i
    }
    return value
}

const getWinner = (squares) => {
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

    for (let [a, b, c] of lines) {
        if (!(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])) continue
        return squares[a] === 'X' ? 1 : -1
    }

    return 0
}


export default props => {
    const [history, setHistory] = useState([{
        squares: Array(Math.pow(props.length, 2)).fill({}),
        xIsNext: false,
        winner: null,
        position: null,
    }])

    const handleClick = useCallback(position => {
        const current = history[history.length - 1]
        let { squares, xIsNext, winner } = current;
        
        if (winner || squares[position].value) return;

        const newSquares = JSON.parse(JSON.stringify(squares));
        newSquares[position] = xIsNext ? { value: "X" } : { value: "O" };

        let newWinner = calculateWinner(newSquares);

        if (!newWinner) {
            const real = newSquares.map(square => square.value);
            getBest(real, false, 0)
            newSquares[index] = { value: 'X' }
            newWinner = calculateWinner(newSquares)
            xIsNext = !xIsNext
        }



        setHistory(prev => {
            return prev.concat([{
                squares: newSquares,
                xIsNext: !xIsNext,
                winner: newWinner,
                position,
            }])
        })
    }, [history])

    const jumpTo = move => {
        setHistory(history.slice(0, move + 1))
    }

    const current = history[history.length - 1];

    return (
        <div className={style.game}>
            <Board
                squares={current.squares}
                length={props.length}
                onClick={handleClick}
            />

            <Info winner={current.winner} history={history} onJumpTo={jumpTo} />
        </div>

    );
}

// 有副作用，会修改squares中的值
const calculateWinner = squares => {
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
    const real = squares.map(square => square.value);
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