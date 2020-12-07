import React from "react";

const Square = props => {
    const handleClick = () => {
        if (!props.onClick) return
        props.onClick(props.index);
    }

    const { direction, value } = props.square;

    return (
        <button
            className={`square${direction ? ` ${direction}` : ''}`}
            onClick={handleClick}
        >
            {value ? value : "\u00a0"}
        </button>
    );
}

// const isEqual = ({square: psquare}, {square: nsquare} ) => {
//     const {value: pvalue, direction: pdirection} = psquare
//     const {value: nvalue, direction: ndirection} = nsquare
//     return pvalue === nvalue && pdirection === ndirection
// }

export default React.memo(Square);