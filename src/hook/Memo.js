import React, { useMemo, useState } from 'react'

export default () => {
    const [step, setStep] = useState(0)
    const [count, setCount] = useState(0)

    const handleSetStep = () => {
        setStep(step + 1)
    }

    const handleSetCount = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <button onClick={handleSetStep}>step: {step}</button>
            <button onClick={handleSetCount}>count: {count}</button>
            <hr />
            <Child step={step} count={count} />
            <hr />
            <ChildMemo step={step} count={count} />
            <hr />
            <ChildUseMemo step={step} count={count} />
        </div>
    )
}

const Child = (props = {}) => {
    console.log("none memo")
    return (
        <div>
            {props.count}
        </div>
    )
}

const isEqual = (prev, next) => {
    return prev.count === next.count
}

const ChildMemo = React.memo((props = {}) => {
    console.log("memo")
    return (
        <div>
            {props.count}
        </div>
    )
}, isEqual)

const ChildUseMemo = (props) => {
    console.log("usememo component render")
    return useMemo(() => {
        console.log("usememo re-render")
        return (
            <div>
                {props.count}
            </div>  
        )
    }, [props.count])
}