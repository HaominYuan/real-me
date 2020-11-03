import React, { Component } from 'react'
import CommentInput from './container/CommentInput'
import CommentList from './container/CommentList'
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