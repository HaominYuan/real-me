import React from "react";
import ReactDOM from "react-dom";
import Tic from "./tic/Tic";
import "./index.scss";
import CommentApp from "./comment/CommentApp";
import { Provider } from 'react-redux'
import commentReducer from './comment/reducer/comment'
import { createStore } from "redux";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Home from './home/Home';
import Article from './article/Article'
import Decorate from "./decorate/Decorate";
import Login from './login/Login'
import { Layout, Menu } from 'antd';
const { Header, Content } = Layout;
const commentStore = createStore(commentReducer)

const Index = withRouter(({ history }) => {
    return (
        <Layout>
            <Header className="header">
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/home']} selectedKeys={[history.location.pathname]}>
                    <Menu.Item key="/home">
                        <Link to="/home">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="/article">
                        <Link to="/article">Article</Link>
                    </Menu.Item>
                    <Menu.Item key="/decorate">
                        <Link to="/decorate">Decorate</Link>
                    </Menu.Item>
                    <Menu.Item key="/tic-tac-toe">
                        <Link to="/tic-tac-toe">Tic-Tac-Toe</Link>
                    </Menu.Item>
                    <Menu.Item key="/commet-app">
                        <Link to="/commet-app">CommentApp</Link>
                    </Menu.Item>
                    <Menu.Item key="/login">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content className="content">
                <Route exact path="/home" component={Home} />
                <Route exact path="/article" component={Article} />
                <Route exact path="/decorate" component={Decorate} />
                <Route exact path="/tic-tac-toe" render={() => <Tic length={3} />} />
                <Route exact path="/commet-app" component={CommentApp} />
                <Route exact path="/login" component={Login} />
            </Content>
        </Layout>
    )
})


ReactDOM.render(
    <Provider store={commentStore} >
        <Router>
            <Index />
        </Router>
    </Provider>
    , document.getElementById("root")
);