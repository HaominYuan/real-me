import React, { Component } from 'react'
import Comment from './Comment'
import "./comment.scss"

class CommentList extends Component {
    static defaultProps = {
        comments: []
    }

    render() {
        return (
            <div>
                {this.props.comments.map((comment, i) => 
                    <Comment comment={comment} key={i} />
                )}
            </div>
        )
    }
}

export default CommentList