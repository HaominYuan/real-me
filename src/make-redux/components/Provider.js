import PropsTypes from 'prop-types'
import React, { Component } from 'react'

export class Provider extends Component {
    static propTypes = {
        children: PropsTypes.any,
    }

    static childContextTypes = {
        store: PropsTypes.object
    }

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}