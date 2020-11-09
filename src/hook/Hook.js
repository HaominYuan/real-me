import React, { useState, useEffect, useReducer, useContext } from 'react'
import Clock from '../decorate/Clock'


const EDispatch = React.createContext(null)
const initialState = {color: 'red'}

function reducer(state, action) {
    switch(action.type) {
        case 'change-color':
            return {color: action.color}
        default:
            return state
    }
}

function Button(props) {
    const dispatch = useContext(EDispatch)

    return (
        <button onClick={() => dispatch({type: 'change-color', color: props.name})} style={{'color': props.color}}>
            {props.name}
        </button>
    )
}

// function Example() {
//     const [state, dispatch] = useReducer(reducer, initialState)


//     useEffect(() => {
//         document.title = state.color
//     })


//     return (
//         <EDispatch.Provider value={dispatch}>
//             <Button color={state.color} name="blue"/>
//             <Button color={state.color} name="yellow"/>
//         </EDispatch.Provider>
//     )
// }


class Example extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: true
        }
    }

    render() {
        return (
            <div>
                {this.state.isShow ? <Clock /> : null}
                <button onClick={() => this.setState({isShow: !this.state.isShow})}>
                    click
                </button>
            </div>
        )
    }
}



export default Example