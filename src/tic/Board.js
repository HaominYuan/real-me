import React from "react";
import PropTypes from "prop-types"
import Row from './Row'

class Board extends React.Component {
    static propTypes = {
        length: PropTypes.number.isRequired,
        squares: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    }

    handleClick(index) {
        if (this.props.onClick) {
            this.props.onClick(index)
        }
    }

    genHandleClick(begin) {
        return index => this.handleClick(begin + index)
    }

    render() {
        const map = Array(this.props.length)
            .fill(null)
            .map((_, index) => {
                return <Row
                    key={index}
                    number={this.props.length}
                    squares={this.props.squares.slice(index * this.props.length, (index + 1) * this.props.length)}
                    onClick={this.genHandleClick(index * this.props.length).bind(this)}
                />;
            });

        return (
            <div className="board">
                {map}
            </div>
        );
    }
}

export default Board