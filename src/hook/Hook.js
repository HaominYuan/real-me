import React, { useEffect, useReducer, useContext } from 'react'


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

function Example() {
    const [state, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
        document.title = state.color
    }, [state.color])

    return (
        <EDispatch.Provider value={dispatch}>
            <Button color={state.color} name="blue"/>
            <Button color={state.color} name="yellow"/>
        </EDispatch.Provider>
    )
}

export default Example