import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CommentInput extends Component {
    static propTypes = {
        username: PropTypes.string,
        onUsernameBlur: PropTypes.func,
        onSubmitComment: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            username: props.username,
            content: ""
        }
    }

    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleUsernameBlur(event) {
        if (!this.props.onUsernameBlur) return
        this.props.onUsernameBlur(event.target.value)
    }

    handleSubmitComment() {
        if (!this.props.onSubmitComment) return
        this.props.onSubmitComment({
            username: this.state.username,
            content: this.state.content,
            createdtime: new Date().getTime()
        })
    }

    render() {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className='comment-field-name'>用户名：</span>
                    <div className="comment-field-input">
                        <input
                            type="text" value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}
                            onBlur={this.handleUsernameBlur.bind(this)}
                        />
                    </div>
                </div>
                <div className="comment-field">
                    <span className='comment-field-name'>评论内容：</span>
                    <div className="comment-field-input">
                        <textarea
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}
                        ></textarea>
                    </div>
                </div>
                <div className="comment-field-button">
                    <button type='button' onClick={this.handleSubmitComment.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}