import { Provider } from "./components/Provider";
import React, { Component } from "react";
import Header from "./containers//Header"
import Content from "./containers/Content"

function createStore(reducer) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    dispatch({})
    return { getState, dispatch, subscribe }
}

const themeReducer = (state, action) => {
    if (!state) return {
        themeColor: 'green'
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, themeColor: action.themeColor }
        default:
            return state
    }
}

const store = createStore(themeReducer)

class Example extends Component {
    render() {
        return (
            <Provider store={store}>
                <Header />
                <Content />
            </Provider>
        )
    }
}

export default Example;