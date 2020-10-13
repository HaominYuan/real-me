import React, { Component } from "react"

class Clock extends Component {
    constructor() {
        super()
        this.state = {
            data: new Date()
        }
    }

    componentWillMount() {
        this.timer = setInterval(() => {
            this.setState({ data: new Date() })
        })
    }

    render() {
        return (
            <div>
                <h1>
                    <p>现在的时间是</p>
                    {this.state.data.toLocaleTimeString()}
                </h1>
            </div>
        )
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }
}

export default Clock;