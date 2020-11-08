import React, { Component } from "react";
import ReactDOM from "react-dom";
import Game from "./game/Game";
import Clock from "./decorate/Clock";
import "./index.scss";
import Heart from "./decorate/Heart";
import Moon from "./decorate/Moon";
import CommentApp from "./comment/CommentApp";
import { Provider } from 'react-redux'
import commentReducer from './comment/reducer/comment'
import { createStore } from "redux";

const commentStore = createStore(commentReducer)

class Index extends Component {
    render() {
        const left = this.props.children.slice(1)
        const right = this.props.children[0]
        return (
            <div className="index">
                <div className='left'>
                    {left}
                </div>
                <div className='right'>
                    {right}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={commentStore}>
        <Index>
            <CommentApp />
            <Clock />
            <Heart />
            <Moon />
            <Clock />
            <Heart />
            <Moon />
            <Clock />
            <Heart />
            <Moon />
            <Clock />
            <Heart />
            <Moon />
            <Game length={3} />
        </Index>
    </Provider>
    , document.getElementById("root")
);