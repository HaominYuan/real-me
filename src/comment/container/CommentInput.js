import CommentInput from "../component/CommentInput"
import { connect } from 'react-redux'
import React, {useCallback, useState } from 'react'
import { addComment } from "../reducer/comment"

const CommentInputContainer = (props) => {
    const loadUsername = useCallback(() => {
        return localStorage.getItem('username') || ""
    }, [])

    const [username] = useState(loadUsername())

    const saveUsername = useCallback(() => {
        localStorage.setItem("username", username)
    }, [username])

    const onSubmitComment = useCallback(comment => {
        if (!comment) return
        if (!comment.username) return alert("请输入用户名")
        if (!comment.content) return alert("请输入评论内容")

        const { comments } = props
        const newComments = [...comments, comment]
        localStorage.setItem('comments', JSON.stringify(newComments))

        if (props.onSubmitComment) {
            props.onSubmitComment(comment)
        }
    }, [props])

    return (
        <CommentInput
            username={username}
            onUsernameBlur={saveUsername}
            onSubmitComment={onSubmitComment}
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
        onSubmitComment: (comment) => {
            dispatch(addComment(comment))
        }
    }
}

export default connect(mapStateToProps, mapDispToProps)(CommentInputContainer)