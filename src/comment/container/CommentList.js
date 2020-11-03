import CommentList from "../component/CommentList"
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { deleteComment, initComments } from "../reducer/comment"


class CommentListContainer extends Component {
    componentDidMount() {
        this.props.initComments(this._loadComments())
    }

    _loadComments() {
        return JSON.parse(localStorage.getItem('comments')) || []
    }

    handleDeleteComment(commentIndex) {
        const { comments } = this.props 
        const newComments = [
            ...comments.slice(0, commentIndex),
            ...comments.slice(commentIndex + 1)
        ]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (!this.props.deleteComment) return
        this.props.deleteComment(commentIndex)
    }

    render() {
        return (
            <CommentList 
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)}
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
        initComments: (comments) => {
            dispatch(initComments(comments))
        },
        deleteComment: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        }
    }
}

export default connect(mapStateToProps, mapDispToProps)(CommentListContainer)