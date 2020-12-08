import React from 'react'
import CommentInput from './container/CommentInput'
import CommentList from './container/CommentList'
import style from "./comment.module.scss"
import { Provider } from 'react-redux'
import commentReducer from './reducer/comment'
import { createStore } from "redux";

const commentStore = createStore(commentReducer)

export default () => {
    return (
        <Provider store={commentStore}>
            <div className={style.app}>
                <CommentInput />
                <CommentList />
            </div>
        </Provider>
    )
}