import React from "react";
import ReactDOM from "react-dom";
import Tic from "./tic/Tic";
import "./index.scss";
import CommentApp from "./comment/CommentApp";
import { Provider } from 'react-redux'
import commentReducer from './comment/reducer/comment'
import { createStore } from "redux";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from './Home';
import Article from './Article'
import Decorate from "./decorate/Decorate";

const commentStore = createStore(commentReducer)

function App() {
    return (
        <Provider store={commentStore} >
            <Router className="home-page">
                <header>
                    <div className="center">
                        <nav>
                            <NavLink exact activeClassName="active" className="link" to="/">Home</NavLink>
                            <NavLink exact activeClassName="active" className="link" to="/article">Article</NavLink>
                            <NavLink exact activeClassName="active" className="link" to="/decorate">Decorate</NavLink>
                            <NavLink exact activeClassName="active" className="link" to="/tic-tac-toe">Tic-Tac-Toe</NavLink>
                            <NavLink exact activeClassName="active" className="link" to="/comment-app">CommentApp</NavLink>
                        </nav>
                    </div>
                </header>

                <div className="content">
                    <Route exact path="/" component={Home} />
                    <Route path="/article" component={Article} />
                    <Route path="/decorate" component={Decorate} />
                    <Route path="/tic-tac-toe" component={Tic} />
                    <Route path="/comment-app" component={CommentApp} />
                </div>
            </Router>
        </Provider>
    )
}

ReactDOM.render(
    <Provider store={commentStore} >
        <App />
    </Provider>
    , document.getElementById("root")
);