import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

const Home = () => { return <h2>Home</h2> }
const About = () => <h2>About</h2>
const Topic = ({ topicId }) => <h3>{topicId}</h3>

// match 中有两个属性一个是 path 另一个是 url，其中 path 用于创建正则表达式 url 用于被正则表达式匹配的项。
// 具体流程如下，我们在 Link 中填写具体的转向地址，Route 则中的正则表达式来匹配转向的地址。如果匹配则显示组件。

const Topics = ({ match }) => {
    const items = [
        { name: 'Rendering width React', slug: 'rendering' },
        { name: 'Component', slug: 'components' },
        { name: 'Props v. State', slug: 'props-v-state' }
    ]

    return (
        <div className="topics">
            <ul>
                {items.map(({ name, slug }) => {
                    return (
                        <li key={name}>
                            <Link to={`${match.url}/${slug}`}>{name}</Link>
                        </li>
                    )
                })}
            </ul>

            {items.map(({ name, slug }) => {
                return (
                    <Route key={name} path={`${match.path}/${slug}`} render={() => <Topic topicId={name} />} />
                )
            })}

            <Route exact path={match.url} render={() => <p>Please select a topic.</p>} />
        </div>
    )
}


export default function App() {
    return (
        <Router>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />

        </Router>
    )
}