import React, { Component } from "react";

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reverse: false,
        };
    }

    reverse = () => {
        const reverse = this.state.reverse;
        this.setState({
            reverse: !reverse,
        });
    }

    handleJumpTo = (index) => {
        if (!this.props.onJumpTo) return
        this.props.onJumpTo(index)
    }
    

    render() {
        const history = this.props.history;
        const current = history[history.length - 1];

        const moves = this.props.history.map((step, move) => {
            const y = step.position % 3;
            const x = (step.position - y) / 3;
            const desc = move
                ? `${step.xIsNext ? "O" : "X"} go to move # (${x}, ${y})`
                : `Go to game start`;

            return (
                <li key={move}>
                    <button onClick={() => this.handleJumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });

        const status = current.winner
            ? current.winner === "Tie"
                ? "Tie"
                : "Winner: " + current.winner
            : "Next player: " + (this.props.xIsNext ? "X" : "O");

        return (
            <div className="info">
                <div className="game-status">{status}</div>
                <button onClick={this.reverse}>{this.state.reverse ? "降序" : "升序"}</button>
                <ol>{moves}</ol>
            </div>
        )

    }
}

export default Info
