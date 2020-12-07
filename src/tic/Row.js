import React from "react";
import Square from "./Square";

const Row = props => {
    const handleClick = (index) => {
        if (props.onClick) {
            props.onClick(index);
        }
    }
    
    const number = props.number;

    return (
        <div className="row">
            {Array(number)
                .fill(null)
                .map((_, index) => (
                    <Square
                        key={index}
                        index={index}
                        square={props.squares[index]}
                        onClick={handleClick}
                    />
                ))}
        </div>
    );
}

export default React.memo(Row)
