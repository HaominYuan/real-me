import React, { Component } from 'react'
import Comment from './Comment'

export default class CommentList extends Component {
    handleDeleteComment(commentIndex) {
        if (!this.props.onDeleteComment) return
        this.props.onDeleteComment(commentIndex)
    }

    render() {
        const list = this.props.comments.map((comment, index) => {
            return <Comment key={index} index={index} comment={comment} onDeleteComment={this.handleDeleteComment.bind(this)}/>
        })

        return (
            <div>
                {list}
            </div>
        )
    }
}