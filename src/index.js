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
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

const commentStore = createStore(commentReducer)


const Home = () => <h1>Real Me</h1>


function App() {
    return (
        <Provider store={commentStore} >
            <Router className="home-page">
                <header>

                    <div className="center">
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/clock">Clock</Link>
                            <Link to="/heart">Heart</Link>
                            <Link to="/moon">Moon</Link>
                            <Link to="/tic-tac-toe">Tic-Tac-Toe</Link>
                            <Link to="/comment-app">CommentApp</Link>
                        </nav>
                    </div>
                </header>

                <div className="content">
                    <Route exact path="/" component={Home} />
                    <Route path="/clock" component={Clock} />
                    <Route path="/heart" component={Heart} />
                    <Route path="/moon" component={Moon} />
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