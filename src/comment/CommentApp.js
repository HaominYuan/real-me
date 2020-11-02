import React, { Component } from 'react'
import CommentInput from './container/CommentInputContainer'
import CommentList from './container/CommentListContainer'
import "./comment.scss"

export default class CommentApp extends Component {
    render() {
        return (
            <div className="comment-app">
                <CommentInput />
                <CommentList />
            </div>
        )
    }
}