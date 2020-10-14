import React from "react";
import Row from './Row'

class Board extends React.Component {
    handleClick(index) {
        if (this.props.onClick) {
            this.props.onClick(index)
        }
    }

    render() {
        const winner = this.props.winner;

        const status = winner.name
            ? winner.name === "Tie"
                ? "Tie"
                : "Winner: " + winner.name
            : "Next player: " + (
                this.props.xIsNext
                    ? "X"
                    : "O"
            );

        const map = Array(3)
            .fill(null)
            .map((value, index) => {
                return <Row
                    key={index}
                    begin={index * 3}
                    number={3}
                    squares={this.props.squares}
                    onClick={this.handleClick.bind(this)}
                    winner={this.props.winner} />;
            });

        return (
            <div>
                <div className="status">{status}</div>
                {map}
            </div>
        );
    }
}

export default Board