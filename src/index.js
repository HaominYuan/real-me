// eslint-disable-next-line
import React, { Component } from "react";
import ReactDOM from "react-dom";
import CommentApp from "./comment/CommentApp";
// eslint-disable-next-line
import Game from "./game/Game"
import "./index.scss"

// eslint-disable-next-line
class Index extends Component {
    render() {
        return (
            <div className='index'>
                <Game />
                <CommentApp />
            </div>
        )
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
// ReactDOM.render(<CommentApp />, document.getElementById("root"));

// ReactDOM.render(<Index />, document.getElementById("root"))