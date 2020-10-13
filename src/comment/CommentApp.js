import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import "./comment.scss"

class CommentApp extends Component {
    constructor() {
        super()
        this.state = {
            comments: [
            ]
        }
    }

    handleSubmitComment(comment) {
        const comments = this.state.comments.slice()
        comments.push(comment)
        this.setState({
            comments
        })
    }

    render() {
        return (
            <div className="wrapper">
                <CommentInput 
                    onSubmit={this.handleSubmitComment.bind(this)}
                />
                <CommentList comments={this.state.comments}/>
            </div>
        )

    }
}

export default CommentApp