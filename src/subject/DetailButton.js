import React, { useContext } from 'react'
import { SContext } from './Subject'
import { Space, Button } from 'antd'

export default props => {
    const { dispatch } = useContext(SContext)

    return (
        <Space size="middle">
            <Button
                type="link"
                onClick={() => dispatch({ type: 'change-visible', visible: true, content: props.content, width:700 })}
            >{props.content}</Button>
        </Space>
    )
}