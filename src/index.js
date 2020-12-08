import React from "react";
import ReactDOM from "react-dom";
import Tic from "./tic/Tic";
import style from "./index.module.scss";
import "./antd.scss"
import CommentApp from "./comment/CommentApp";
import { BrowserRouter as Router, Route, Link, withRouter, Redirect, Switch } from "react-router-dom";
import Home from './home/Home';
import Article from './article/Article'
import Decorate from "./decorate/Decorate";
import Login from './login/Login'
import { Layout, Menu } from 'antd';
import Example from "./hook/Hook";
const { Header, Content } = Layout;

const Index = withRouter(({ history }) => {
    return (
        <Layout>
            <Header className={style.header}>
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
                    {/* <Menu.Item key="/example">
                        <Link to="/example">Example</Link>
                    </Menu.Item> */}
                </Menu>
            </Header>
            <Content className={style.content}>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/article" component={Article} />
                    <Route exact path="/decorate" component={Decorate} />
                    <Route exact path="/tic-tac-toe" render={() => <Tic length={3} />} />
                    <Route exact path="/commet-app" component={CommentApp} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/example" component={Example} />
                    <Redirect exact path="/" to="/home" />
                </Switch>

            </Content>
        </Layout>
    )
})


ReactDOM.render(
    <Router>
        <Index />
    </Router>
    , document.getElementById("root")
);