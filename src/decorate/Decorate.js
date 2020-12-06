import React from 'react'
import Clock from "./Clock"
import Heart from "./Heart"
import Moon from "./Moon"
import { Button } from 'antd'


export default () => {
    return (
        <>
            <Moon />
            <Heart />
            <Clock />
        </>
    )
}