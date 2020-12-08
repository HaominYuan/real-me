import React, { useState } from 'react'
import { Table, Tag, Space, Button } from 'antd'
import style from './subject.module.scss'
import Detail from './Detail'

const trans = (text) => {
    return (
        <span style={{ display: 'table', margin: '0 auto' }}>{text}</span>
    )
}

const columns = [
    {
        title: trans('Name'),
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: trans('Subject'),
        dataIndex: 'subject',
        key: 'subject',
        render: text => <Button type="link">{text}</Button>
    },
    {
        title: trans('Email'),
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: trans('Tags'),
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: trans('Action'),
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button type="link">Apply</Button>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        email: 'tstxxy@gmail.com',
        subject: 'Lorem ipsum dolor',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        email: 'tstxxy@gmail.com',
        subject: 'consectetur adipiscing elit',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        email: 'tstxxy@gmail.com',
        subject: 'sed eiusmod tempor incididunt',
        tags: ['cool', 'teacher'],
    },
];

export default props => {

    const [visible] = useState(false)

    return (
        <>
            <Table columns={columns} dataSource={data} className={style.subject} />
            <Detail visible={visible}/>
        </>

    )
}