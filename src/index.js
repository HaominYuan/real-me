import React from "react";
import ReactDOM from "react-dom";
import Tic from "./tic/Tic";
import Clock from "./decorate/Clock";
import "./index.scss";
import Heart from "./decorate/Heart";
import Moon from "./decorate/Moon";
import CommentApp from "./comment/CommentApp";
import { Provider } from 'react-redux'
import commentReducer from './comment/reducer/comment'
import { createStore } from "redux";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from './Home';
import Article from './Article'

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
                            <NavLink exact activeClassName="active" className="link" to="/clock">Clock</NavLink>
                            <NavLink exact activeClassName="active" className="link" to="/heart">Heart</NavLink>
                            <NavLink exact activeClassName="active" className="link" to="/moon">Moon</NavLink>
                            <NavLink exact activeClassName="active" className="link" to="/tic-tac-toe">Tic-Tac-Toe</NavLink>
                            <NavLink exact activeClassName="active" className="link" to="/comment-app">CommentApp</NavLink>
                        </nav>
                    </div>
                </header>

                <div className="content">
                    <Route exact path="/" component={Home} />
                    <Route path="/clock" component={Clock} />
                    <Route path="/heart" component={Heart} />
                    <Route path="/moon" component={Moon} />
                    <Route path="/tic-tac-toe" component={Tic} />
                    <Route path="/article" component={Article} />
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