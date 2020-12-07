import React, { useEffect, useState } from "react"
import style from "./decorate.module.scss"

const useColor = () => {
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


export default () => {
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
        <span style={{ color: color }} className={style.clock}>
            {date.toLocaleTimeString()}
        </span>
    )
}