import React from 'react'
import Comment from './Comment'

export default (props) => {
    const handleDeleteComment = (commentIndex) => {
        if (!props.onDeleteComment) return
        props.onDeleteComment(commentIndex)
    }

    const list = props.comments.map((comment, index) => {
        return <Comment key={comment.createdtime} index={index} comment={comment} onDeleteComment={handleDeleteComment} />
    })

    return (
        <div className="comment-list">
            {list}
        </div>
    )
}