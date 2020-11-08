import React, { Component } from "react";
import PropTypes from "prop-types";

class Square extends Component {
    static propTypes = {
        square: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired,
    }

    handleClick = () => {
        if (!this.props.onClick) return
        this.props.onClick(this.props.index);
    }

    render() {
        const { direction, value } = this.props.square;

        return (
            <button
                className={`square${direction ? ` ${direction}` : ''}`}
                onClick={this.handleClick}
            >
                {value ? value : "\u00a0"}
            </button>
        );
    }
}

export default Square;
