import CommentList from "../component/CommentList"
import { connect } from 'react-redux'
import React, { useEffect, useRef } from 'react'
import { deleteComment, initComments } from "../reducer/comment"

const CommentListContainer = (props) => {
    const stable = useRef(props.initComments).current

    useEffect(() => {
        stable(JSON.parse(localStorage.getItem('comments')) || [])
    }, [stable])

    const handleDeleteComment = (commentIndex) => {
        const { comments } = props
        const newComments = [
            ...comments.slice(0, commentIndex),
            ...comments.slice(commentIndex + 1)
        ]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (!props.deleteComment) return
        props.deleteComment(commentIndex)
    }
    
    return (
        <CommentList
            comments={props.comments}
            onDeleteComment={handleDeleteComment}
        />
    )
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