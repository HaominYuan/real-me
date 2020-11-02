import React, { Component } from 'react'

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeString: ""
        }
    }

    _updateTimeString() {
        const duration = (new Date().getTime() - this.props.comment.createdtime) / 1000;
        this.setState({
            timeString:
                duration >= 60
                    ? `${Math.round(duration / 60)} 分钟前`
                    : `${Math.round(Math.max(duration, 1))} 秒前`,
        })
    }

    handleDeleteComment() {
        if (!this.props.onDeleteComment) return
        this.props.onDeleteComment(this.props.index);
    }

    componentDidMount() {
        this._updateTimeString();
        this._timer = setInterval(() => this._updateTimeString.bind(this), 3000)
    }

    componentWillUnmount() {
        clearInterval(this._timer)
    }

    render() {
        const { comment } = this.props
        return (
            <div className="comment">
                <div className="comment-username">
                    {comment.username}
                </div>
                <span></span>
                <div className="comment-content">
                    {comment.content}
                </div>
                <div className="comment-meta">
                    <div className="comment-meta-createdtime">
                        {this.state.timeString}
                    </div>
                </div>
                <span className="comment-delete"
                    onClick={this.handleDeleteComment.bind(this)}>
                    删除
                </span>
            </div>
        )
    }
}