import React, { useCallback, useEffect, useState } from 'react'
import style from '../comment.module.scss'

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
        <div className={style.comment}>
            <div className={style.username}>
                {comment.username}
            </div>
            <span></span>
            <div className={style.content}>
                {comment.content}
            </div>
            <div className={style.meta}>
                <div className={style.createdtime}>
                    {timeString}
                </div>
            </div>
            <span className={style.delete}
                onClick={handleDeleteComment}>
                删除
                </span>
        </div>
    )
}