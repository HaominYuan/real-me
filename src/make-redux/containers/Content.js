import React, { Component } from 'react'
import ProTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'
import { connect } from '../react-redux'

class Content extends Component {
    static propTypes = {
        store: ProTypes.string
    }

    render() {
        return (
            <div>
                <p style={{ color: this.props.themeColor }}>React.js 小书内容</p>
                <ThemeSwitch />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

Content = connect(mapStateToProps)(Content)

export default Content
