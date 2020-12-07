import React from "react";
import Row from './Row'
import style from "./tic.module.scss";

const Board = props => {
    const handleClick = index => {
        if (!props.onClick) return
        props.onClick(index)
    }

    const genHandleClick = begin => {
        return index => handleClick(begin + index)
    }

    const map = Array(props.length)
        .fill(null)
        .map((_, index) => {
            return <Row
                key={index}
                number={props.length}
                squares={props.squares.slice(index * props.length, (index + 1) * props.length)}
                onClick={genHandleClick(index * props.length)}
            />;
        });

    return (
        <div className={style.board}>
            {map}
        </div>
    );
}

const isEqual = (prev, next) => {
    return prev.onClick === next.onClick
}

export default React.memo(Board, isEqual)