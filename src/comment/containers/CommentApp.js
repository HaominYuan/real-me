import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import commentsReducer from '../reducers/comments'
import "../comment.scss"

const store = createStore(commentsReducer)

export default class CommentApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='wrapper'>
          <CommentInput />
          <CommentList />
        </div>
      </Provider>
    )
  }
}