import React, { Component } from "react";
import PropTypes from 'prop-types';

class Square extends Component {
    static propTypes = {
        square: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.index)
        }
    }

    render() {
        const {direction, value} = this.props.square

        return (
            <button
                className={`square ${direction
                    ? `winner ${direction}`
                    : null}`}
                onClick={this.handleClick.bind(this)}>
                {value}
            </button>
        );
    }
}

export default Square;