import React from "react";
import PropTypes from "prop-types";
import Square from "./Square";

class Row extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        squares: PropTypes.array.isRequired,
    };
        
    handleClick = (index) => {
        if (this.props.onClick) {
            this.props.onClick(index);
        }
    }

    render() {
        const number = this.props.number;
        return (
            <div className="row">
                {Array(number)
                    .fill(null)
                    .map((_, index) => (
                        <Square
                            key={index}
                            index={index}
                            square={this.props.squares[index]}
                            onClick={this.handleClick}
                        />
                    ))}
            </div>
        );
    }
}

export default Row;
