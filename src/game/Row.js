import React from "react";
import Square from "./Square";

class Row extends React.Component {
    handleClick(index) {
        if (this.props.onClick) {
            this.props.onClick(index)
        }
    }

    renderSquare(i) {
        let direction = null
        if (this.props.winner.indices && this.props.winner.indices.some((x) => x === i)) {
            direction = this.props.winner.direction
        }

        return (
            <Square
                key={i}
                index={i}
                value={this
                    .props
                    .squares[i]}
                onClick={this.handleClick.bind(this)}
                direction={direction}/>
        );
    }

    render() {
        const begin = this.props.begin;
        const number = this.props.number;
        const row = Array(number)
            .fill(null)
            .map((value, index) => this.renderSquare(begin + index));

        return (<div className="board-row">
            {row}
        </div>);
    }
}

export default Row
