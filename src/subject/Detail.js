import React, { useContext } from 'react'
import { Modal} from 'antd'
import {SContext} from './Subject'

export default props => {
    const { state, dispatch } = useContext(SContext)

    const handleOk = () => {
        dispatch({ type: 'change-visible', visible: false })
    };

    const handleCancel = () => {
        dispatch({ type: 'change-visible', visible: false })
    };

    return (
        <>
            <Modal
                title="Basic Modal"
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={state.width}
            >
                <p>{state.content}</p>
            </Modal>
        </>
    );
}