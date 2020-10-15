// eslint-disable-next-line
import React, { Component } from "react";
import ReactDOM from "react-dom";
import CommentApp from "./comment/CommentApp";
import Game from "./game/Game"
import Clock from "./clock/Clock"
import "./index.scss"

// eslint-disable-next-line
class Index extends Component {
    render() {
        return (
            <div className='index'>
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render(<Index>
    <Clock />
    <Game length={3}/>
    <CommentApp />
</Index>, document.getElementById("root"))