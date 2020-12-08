import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from '../comment.module.scss'


export default props => {
    const [username, setUsername] = useState(props.username)
    const [content, setContent] = useState("")

    const textareaRef = useRef()

    useEffect(() => {
        textareaRef.current.focus()
    }, [])

    const handleContentChange = useCallback(event => {
        setContent(event.target.value)
    }, [])

    const handleUsernameChange = useCallback(event => {
        setUsername(event.target.value)
    }, [])

    const handleUsernameBlur = useCallback(event => {
        if (!props.onUsernameBlur) return
        props.onUsernameBlur(event.target.value)
    }, [props])

    const handleSubmitComment = () => {
        if (!props.onSubmitComment) return
        props.onSubmitComment({
            username: username,
            content: content,
            createdtime: new Date().getTime()
        })
        setContent("")
    }

    return (
        <div className={style.input}>
            <div className={style.field}>
                <span className={style.name}>用户名：</span>
                <div className={style.fieldInput}>
                    <input
                        type="text" value={username}
                        onChange={handleUsernameChange}
                        onBlur={handleUsernameBlur}
                    />
                </div>
            </div>
            <div className={style.field}>
                <span className={style.name}>评论内容：</span>
                <div className={style.fieldInput}>
                    <textarea
                        value={content}
                        onChange={handleContentChange}
                        ref={textareaRef}
                    ></textarea>
                </div>
            </div>
            <div className={style.button}>
                <button type='button' onClick={handleSubmitComment}>发布</button>
            </div>
        </div>
    )
}