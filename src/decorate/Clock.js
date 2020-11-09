import React, { useEffect, useState } from "react"

function useColor() {
    const _getRandom = () => {
        return Math.floor(Math.random() * 255)
    }

    const getRGB = () => {
        return `rgb(${_getRandom()}, ${_getRandom()}, ${_getRandom()})`
    }

    const [color, setColor] = useState(getRGB())

    const _setColor = () => {
        setColor(getRGB())
    }

    return [color, _setColor]
}


function Clock() {
    const [date, setDate] = useState(new Date())
    const [color, setColor] = useColor()

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
            setColor()
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    })

    return (
        <div>
            <h1 style={{ color: color }}>
                <p >现在的时间是</p>
                {date.toLocaleTimeString()}
            </h1>
        </div>
    )
}

export default Clock;