import React, { Component } from "react"

class Clock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: new Date(),
            color: this.getRGB()
        }
    }

    _getRandom() {
        return Math.floor(Math.random() * 255)
    }

    getRGB() {
        return `rgb(${this._getRandom()}, ${this._getRandom()}, ${this._getRandom()})`
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                data: new Date(),
                color: this.getRGB()
            })
        }, 1000)
    }
    
    render() {
        return (
            <div>
                <h1 style={{ color: this.state.color }}>
                    <p >现在的时间是</p>
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