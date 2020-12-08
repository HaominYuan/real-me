import React from 'react'
import CommentInput from './container/CommentInput'
import CommentList from './container/CommentList'
import "./comment.scss"


export default () => {
    return (
        <div className="comment-app">
            <CommentInput />
            <CommentList />
        </div>
    )
}