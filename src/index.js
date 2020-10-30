import React, { Component } from "react";
import ReactDOM from "react-dom";
import CommentApp from "./comment/containers/CommentApp";
import Game from "./game/Game";
import Clock from "./clock/Clock";
import Example from './make-redux/Example'
import "./index.scss";
import Heart from "./decorate/Heart";
import Moon from "./decorate/Moon";

class Index extends Component {
  render() {
    return <div className="index">{this.props.children}</div>;
  }
}

ReactDOM.render(
  <Index>
    <Clock />
    <Game length={3} />
    <CommentApp />
    <Example />
    <Heart />
    <Moon />
  </Index>,
  document.getElementById("root")
);

console.log({...null})