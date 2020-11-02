import React, { Component } from "react";
import ReactDOM from "react-dom";
import Game from "./game/Game";
import Clock from "./clock/Clock";
import Example from './make-redux/Example'
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
    return <div className="index">{this.props.children}</div>;
  }
}

ReactDOM.render(
  <Provider store={commentStore}>
    <Index>
      <Clock />
      <Game length={3} />
      <CommentApp />
      <Example />
      <Heart />
      <Moon />
    </Index>
  </Provider>
  ,
  document.getElementById("root")
);

console.log({ ...null })