import React from "react";
import ReactDOM from "react-dom";
import Tic from "./tic/Tic";
import "./index.scss";
import CommentApp from "./comment/CommentApp";
import { Provider } from 'react-redux'
import commentReducer from './comment/reducer/comment'
import { createStore } from "redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Article from './article/Article'
import Decorate from "./decorate/Decorate";
import Login from './login/Login'
import { Layout, Menu } from 'antd';
const { Header, Content } = Layout;


const commentStore = createStore(commentReducer)

ReactDOM.render(
    <Provider store={commentStore} >
        <Router>
            <Layout>
                <Header className="header">
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/article">Article</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/decorate">Decorate</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/tic-tac-toe">Tic-Tac-Toe</Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/commet-app">CommentApp</Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/login">Login</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className="content">
                    <Route exact path="/" component={Home} />
                    <Route path="/article" component={Article} />
                    <Route path="/decorate" component={Decorate} />
                    <Route path="/tic-tac-toe" component={Tic} />
                    <Route path="/commet-app" component={CommentApp} />
                    <Route path="/login" component={Login} />
                </Content>
            </Layout>
        </Router>
    </Provider>
    , document.getElementById("root")
);