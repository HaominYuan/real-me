import CommentInput from "../component/CommentInput"
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { addComment } from "../reducer/comment"

class CommentInputContainer extends Component {
    constructor(props) {
        super(props)
        const username = this._loadUsername()
        this.state = {
            username
        }
    }

    _loadUsername() {
        return localStorage.getItem('username') || ""
    }

    _saveUsername(username) {
        localStorage.setItem("username", username)
    }

    onUsernameBlur(username) {
        this._saveUsername(username)
    }

    onSubmitComment(comment) {
        if (!comment) return
        if (!comment.username) alert("请输入用户名")
        if (!comment.content) alert("请输入评论内容")

        const { comments } = this.props
        const newComments = [...comments, comment]
        localStorage.setItem('comments', JSON.stringify(newComments))

        if (this.props.onSubmitComment) {
            this.props.onSubmitComment(comment)
        }
    }

    render() {
        return (
            <CommentInput
                username={this.state.username}
                onUsernameBlur={this.onUsernameBlur.bind(this)}
                onSubmitComment={this.onSubmitComment.bind(this)}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispToProps = (dispatch) => {
    return {
        onSubmitComment: (comment) => {
            dispatch(addComment(comment))
        }
    }
}

export default connect(mapStateToProps, mapDispToProps)(CommentInputContainer)