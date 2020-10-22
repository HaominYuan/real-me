# 构建 redux

## 画面渲染

有两个标签，两个标签分别拥有两个 id。 id 的作用是方便渲染时将标签取出。

```html
  <body>
    <div id='title'></div>
    <div id='content'></div>
  </body>
```

有一个用于渲染标签的数据结构 state。state 中存的是标签的内容以及标签的颜色。

```javascript
const appState = {
    title: {
        text: 'I am the text of title',
        color: 'red'
    },
    content: {
        text: 'I am the text of content',
        color: 'blue'
    }
}
```

有三个用于渲染的函数 render。

```javascript
function renderApp(appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle(title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent(content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}
```

现在我们可以通过 render 函数和 state 渲染页面。

```javascript
renderApp(appState)
```

## 修改状态

改变数据可以简单的直接修改 state，然后再 render，但这不是一个好方法。一方面我们可以在**多个不同的模块随意**写一个函数就可以修改 state，当代码量多的时候，很难发觉最后改了什么。另一方面是 debug 的时候非常困难，因为我们无法知道哪里修改了。

一个好的解决方法是，我们先**约定**好怎么修改 state，并且只能通过特定的函数 stateChanger 修改。约定好怎么修改意味着修改后的结果是可控的。通过特定的函数修改意味着当出现意外的时候我们可以通过在函数 stateChanger 中打断点即可快速的找到问题所在。

```javascript
// stateChanger 中的 appState 是全局变量。
function stateChanger(action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break
    default:
      break
  }
}
```

action 变量是包含两个参数，一个是 type 参数，另一个是修改 appState 所需要的数据。type 参数是事先约定好的，规定了我们怎么修改 appState。

以下是通过 stateChanger 函数修改 appstate 并渲染。

```javascript
stateChanger({ type: 'UPDATE_TITLE_TEXT', text: 'I am the another title' }) 
stateChanger({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })
renderApp(appState)
```

## 隐藏 state

现在我们通过 stateChanger(state, action) 函数修改了状态。我们发现每次调用 stateChanger 都需要传入 state，并且 state 对于一般用户而言，我们希望按照约定修改 appState。为了解决这个问题我们引入了闭包操作，并暴露 getState 接口。这样用户可以通过 getState 接口获得 state。

```javascript
function createStore (state, stateChanger) {
  const getState = () => state
  const wrappedStateChanger = (action) => stateChanger(state, action)
  return { getState, wrappedStateChanger }
}
```

现在我们可以以下代码修改状态

```javascript
const store = createStore(appState, stateChanger)

renderApp(store.getState())
store.wrappedStateChanger({ type: 'UPDATE_TITLE_TEXT', text: 'I am the another title' }) 
store.wrappedStateChanger({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })
renderApp(store.getState())
```

## 自动渲染

我们发现我们通过 wrappedStateChanger 函数修改完以后都需要手动 render 才可以渲染整个画面。现在我们引入观察者模式来解决上述问题。并且我们不直接将 wrappedStateChanger 换一个名字，新的名字是 dispatch，中文含义是分发。因为每次调用 dispatch，在修改了状态的同时，它将执行一系列已经订阅的函数。同时我们还暴露 subscribe 接口给用户注册新的订阅函数。

```javascript
function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}
```

现在我们通过一下代码修改状态时，页面将被自动渲染。

```javascript
const store = createStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState()))

renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' })
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }
```

## 渲染性能优化

我们通过观察上述的代码可以发现，每次不管修改了多少东西，我们在 subscribe 中订阅的函数都是会直接重新刷新整个页面，这样的性能是很差的。

一种方法是，我们先缓存旧的 state（若没有旧的 state，直接与 {} 作比较)，随后从将新的 state 与旧的 state 做比较，找出不一样的地方重新渲染。这种方法需要比对整个 state，实际上的性能也是比较差的。

另一种方法是，类似于线段树，当有元素的子节点被更新时，我们返回新的元素对象，其他未发生变化的子节点还是用的原来的引用。

在 render 函数中，我们首先比较新旧两个 state 是否相同，相同直接返回，不相同则调用子 render 函数进行渲染。子 render 函数的操作和父 render 函数相同。并且我们发现现在的 stateChanger 是一个纯函数。

```javascript
function renderApp (newAppState, oldAppState = {}) { 
  if (newAppState === oldAppState) return
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

function stateChanger (state, action) {
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

function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}
```

现在我们可以通过一下代码进行页面的修改和自动渲染

```javascript
const store = createStore(appState, stateChanger)
let oldState = store.getState()
store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
})

renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' })
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })
```

## 结构优化

我们观察上面的 createStore 函数可以发现 createStore 函数中的 state 可以通过 stateChanger  来提供。我们可以通过设置 stateChanger 当传入空的 state 时，返回一个初始化变量来实现。

```javascript
function stateChanger (state, action) {
  if (!state) {
    return {
      title: {
        text: 'React.js 小书',
        color: 'red',
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
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

function createStore (stateChanger) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}
```

最后我们把 stateChanger 改名为 reducer。因为 stateChanger 和数组中 reduce 函数中的 reducer 函数非常类似。通过拿到之前的状态，以及现在的参数，然后做一系列操作，并返回。

# 结合 React 使用 Redux

## 页面结构

我们现在假设需要实现点击按钮改变网页颜色的需求，以及假设我们现在有一个这样结构的网页。

```html
<div class='index'>
    <h1 style='color: green;'>标题</h1>
    <div>
        <p style='color: green;'>content</p>
        <div>
            <button style="color: green;">Red</button>
            <button style="color: green;">Blue</button>
        </div>
    </div>
</div>
```

我们可以粗略的把他们分为三个组件，分别是 Header、Content、ThemeSwitch 组件。Content 组件包括 ThemeSwitch 组件。

```javascript
class Header {
    render() {
        return (
            <h1 style={{color: this.state.themeColor}}>标题</h1>
        )
    }
}


class Content {
    render() {
        return (
            <div>
            	<p style={{color: this.state.themeColor }}>content</p>
				<ThemeSwitch />
            </div>
        )
    }
}

class ThemeSwitch  {
    render() {
        return (
            <div>
            	<button style={{color: this.state.themeColor }}>Red</button>
            	<button style={{color: this.state.themeColor }}>Blue</button>
            </div>
        )
    }
}

class Index {
    render() {
    	<div>
         	<Header />
            <Content />
        </div>
    }
}
```

## 编写 reducer

现在我们已经写好了基本的组件了。现在我们来编写我们的 reducer，并通过 createStore 函数获得 store。

```javascript
const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}
```

## 获取 store 

为了所有的组件都可以获得 store，我们将 store 塞进最近共同父节点的 context 中。其次所有的子组件都通过 context 获得 store，具体代码如下所示。

```javascript
class Index {
    static childContextTypes = {
        store: PropTypes.object
    }
	
	getChildContext () {
        return { store }
    }
}

class Header {
    static contextTypes = {
        store: PropTypes.object
    }
}
```

## 渲染并添加订阅

并在 componentWillMount 函数中从 state 中需要的东西拿出来，并通过 setState 函数设置属性。并最后订阅

```javascript
componentWillMount () {
    const { store } = this.context
    this._updateThemeColor()
    store.subscribe(() => this._updateThemeColor())
}

_updateThemeColor () {
   	const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
}
```

## 添加发布

现在我们可以从 state 中获取属性，并订阅。现在我们需要添加发布。发布函数就是直接在handle函数中写入 dispatch 函数。

```javascript
handleSwitchColor (color) {
    const { store } = this.context
    store.dispatch({
        type: 'CHANGE_COLOR',
        themeColor: color
    })
}
```

## connect 优化

我们发现所有的组件都需要从 context 获取 store，我们可以通过高阶组件的方式帮他获取。

```javascript
export connect = (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    // TODO: 如何从 store 取数据？

    render () {
      return <WrappedComponent />
    }
  }

  return Connect
}
```

我们发现单单获取获取 store 是没用的。我们还需要让 connect 组件帮忙获取组件所需要的属性，怎么获取呢。我们实现告诉用户 state，然后用户自己编写从 state 中获取数据的代码。具体的来说就是让用户传入一个参数为 state 返回值为一个对象，对象中包含组件所需要的数据。

```javascript
componentWillMount () {
    const { store } = this.context
    this._updateProps()
    store.subscribe(() => this._updateProps())
}

_updateProps () {
    const { store } = this.context
    let stateProps = mapStateToProps(store.getState(), this.props) // 额外传入 props，让获取数据更加灵活方便
    this.setState({
        allProps: { // 整合普通的 props 和从 state 生成的 props
            ...stateProps,
            ...this.props
        }
    })
}
```

单单传输状态是不够的，我们现在还需要传输方法，怎么获取状态呢。具体的来说我们给用户提供 dispatch 函数，用户通过 dispatch 函数自行组合出需要的方法。为什么不需要状态呢。因为我们已经约定好了，用户不可以随意更改状态，只能通过 action 告诉 reducer 如何修改。

## 通过 provider 提供 store

我们发现 index 中存在 store，我们可以通过容器组件来实现这一过程

```javascript
export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
  }

  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}
```

