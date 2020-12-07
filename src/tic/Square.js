import React from "react";
import style from "./tic.module.scss";

const Square = props => {
    const handleClick = () => {
        if (!props.onClick) return
        props.onClick(props.index);
    }

    const { direction, value } = props.square;

    return (
        <button
            // className={`${style.square}${direction ? ` ${style[direction]}` : ''}`}
            className={`${style.square} ${style[direction]}`}
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