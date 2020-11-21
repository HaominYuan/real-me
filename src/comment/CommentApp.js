import React from 'react'
import CommentInput from './container/CommentInput'
import CommentList from './container/CommentList'
import "./comment.scss"


const CommentApp = () => {
    return (
        <div className="comment-app">
            <CommentInput />
            <CommentList />
        </div>
    )
}

export default  CommentApp