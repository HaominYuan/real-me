import React, { Component } from "react";
import PropTypes from 'prop-types'

class Square extends Component {
    static proTypes = {
        square: PropTypes.object,
        onClick: PropTypes.func
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.index)
        }
        console.log(this.props.index)
    }

    render() {
        // const {direction, value} = this.props.square

        return (
            <button
                className={`square ${this.props.direction
                    ? `winner ${this.props.direction}`
                    : null}`}
                onClick={this.handleClick.bind(this)}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;