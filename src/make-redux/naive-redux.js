// 这份练习需要在 ./public/index.html 文件中修改<body>标签。
// 需要在<body> 标签下添加如下两行代码
// <div id='title'></div>
// <div id='content'></div>

function createStore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    dispatch({})
    return { getState, dispatch, subscribe }
}

function reducer(state, action) {
    if (!state) return {
        title: {
            text: 'naive react-redux',
            color: 'red'
        },
        content: {
            text: 'Go Go Go',
            color: 'blue'
        }
    }
    
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state
    }
}

function renderApp(newAppState, oldAppState = {}) {
    if (newAppState === oldAppState) return
    console.log('render app...')
    renderTitle(newAppState.title, oldAppState.title)
    renderContent(newAppState.content, oldAppState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
    if (newTitle === oldTitle) return
    console.log('render title...')
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent = {}) {
    if (newContent === oldContent) return
    console.log('render content...')
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
}

const store = createStore(reducer)
let oldState = store.getState()
store.subscribe(() => {
    const newState = store.getState()
    renderApp(store.getState(), oldState)
    oldState = newState
})


export default function () {
    renderApp(store.getState())
    store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' })
    store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'green' })
}