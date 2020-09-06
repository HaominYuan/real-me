import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={props.winner ? "square square-winner" : "square"} onClick={props.onClick}>
            {props.value}
        </button>
    ); 
}

class Row extends React.Component {
    renderSquare(i, winner) {
        return <Square key={i} value={this.props.current.squares[i]} onClick={() => this.props.onClick(i)} winner={winner}/>
    }

    equal(number) {
        return number === this
    }
    
    render() {
        const result = []
        const columnNum = Math.sqrt(this.props.current.squares.length)

        for (let i = 0; i < columnNum; i++) {
            result.push(this.renderSquare(this.props.begin + i, this.props.line.some(this.equal, this.props.begin + i)))
        }

        return ( 
            <div className="board-row">
                {result}
            </div>
        )
    }
}

class Board extends React.Component {
    renderRow(begin) {
        return <Row key={begin} begin={begin} current={this.props.current} onClick={this.props.onClick} line={this.props.line}/>
    }

    render() {
        const result = []
        const rowNum = Math.sqrt(this.props.current.squares.length)
        for(let i = 0; i < rowNum; i++) {
            result.push(this.renderRow(i * rowNum))            
        }
        return (
            <div className="board">
                {result}
            </div>
        )
    }
}

function Reverse(props) {
    return (
        <button className="reverse" onClick={props.onClick}>
            reverse
        </button>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    coordinate: {x: undefined, y: undefined},
                    status: true,
                    winner: undefined,
                }
            ],
            reverse: false,
            line: []
        }
    }

    handleClick(i) {
        const history = this.state.history
        const last = history[history.length - 1]
        const squares = last.squares.slice()
        let status = last.status
        if (last.winner || squares[i]) return
        squares[i] = status ? 'X' : 'O'
        const {winner, line} = calculateWinner(squares)
        this.setState({
            history: history.concat({
                squares, 
                status: !status, 
                winner,
                coordinate: {x: Math.floor(i / 3), y : i % 3},
            }),
            line
        })
    }

    handleReverse() {
        const reverse = !this.state.reverse
        this.setState({
            reverse
        })
    }

    jump(index) {
        const history = this.state.history
        this.setState({
            history: history.slice(0, index + 1),
            line: index + 1 === this.state.history.length ? this.state.line : []
        })
    }

    render() {
        const history = this.state.history
        const current = history[history.length - 1]
        let status = 'Next player: ' + (current.status ? 'X' : 'O');
        if (current.winner === "D") {
            status = "Two players draw"
        } else if (current.winner) {
            status = "Winner: " + current.winner
        }
        
        const moves = history.map((cV, index) => {
            const desc = index ?
                "" +  (!cV.status ? 'X' : 'O') + ` (${cV.coordinate.x}, ${cV.coordinate.y})`:
                "Game start"
            return (
                <li key={index}>
                    <button className={index === history.length - 1 ? "moves-bold" : ""} onClick={() => this.jump(index)}>{desc}</button>
                </li>
            )
        })

        if (this.state.reverse) {
            moves.reverse()     
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board current={current} onClick={(i) => this.handleClick(i)} line={this.state.line}/>
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <Reverse onClick={() => this.handleReverse()}/>
                    <ol> { moves } </ol>
                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function calculateWinner(squares) {
    let lines = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ]

    for (let i = 0; i < lines.length; i++) {
        let [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a], line: lines[i] 
            }
        }
    }

    return { 
        winner: squares.some(element => !element) ?  null : "D",
        line: []
    }
}