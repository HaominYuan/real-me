import React, { useEffect, useState } from "react";
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
import axios from "axios";

const commentStore = createStore(commentReducer)

const Home = () => {
    const [title, setTitle] = useState("Real Me")

    useEffect(() => {
        (async () => {
          const result = await axios(
            'https://tstxxy.icu/api/hello',
          );
          setTitle(result.data)
        })();
      }, []);

    return <h1>{title}</h1>
}


function App() {
    return (
        <Provider store={commentStore} >
            <Router className="home-page">
                <header>
                    <div className="center">
                        <nav>
                            <NavLink exact activeClassName="active" className="link" to="/">Home</NavLink>
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