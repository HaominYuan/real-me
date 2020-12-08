import React, { useCallback, useEffect, useState } from 'react'

export default props => {
    const [timeString, setTimeString] = useState("")


    const updateTimeString = useCallback(() => {
        const duration = (new Date().getTime() - props.comment.createdtime) / 1000;
        setTimeString(
            duration >= 60
                    ? `${Math.round(duration / 60)} 分钟前`
                    : `${Math.round(Math.max(duration, 1))} 秒前`,
        )
    }, [props])

    const handleDeleteComment = () => {
        if (!props.onDeleteComment) return
        props.onDeleteComment(props.index);
    }

    useEffect(() => {
        updateTimeString()
        const timer = setInterval(() => updateTimeString, 3000)
        return () => {
            clearInterval(timer)
        }
    })

    const { comment } = props
    return (
        <div className="comment">
            <div className="comment-username">
                {comment.username}
            </div>
            <span></span>
            <div className="comment-content">
                {comment.content}
            </div>
            <div className="comment-meta">
                <div className="comment-meta-createdtime">
                    {timeString}
                </div>
            </div>
            <span className="comment-delete"
                onClick={handleDeleteComment}>
                删除
                </span>
        </div>
    )
}