import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Text, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { Node } from 'slate'
import './article.scss'

// eslint-disable-next-line
const serialize = value => {
    return (
        value.map(n => Node.string(n)).join('\n')
    )
}

// eslint-disable-next-line
const deserialize = string => {
    return String.split('\n').map(line => {
        return {
            children: [{ text: line }]
        }
    })
}

const CustomEditor = {
    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.bold === true,
            universal: true
        })

        // object => true or false
        return !!match
    },

    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code'
        })

        return !!match
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor)
        Transforms.setNodes(
            editor,
            { type: isActive ? null : 'code' },
            { match: n => Editor.isBlock(editor, n) }
        )
    }
}


export default () => {
    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem('content')) ||
        [{
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }]
        }
        ])
    const [isBold, setBold] = useState(false)
    const [isCode, setCode] = useState(false)

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    const hanldeBoldClick = event => {
        event.preventDefault()
        CustomEditor.toggleBoldMark(editor)
        setBold(!isBold)
    }

    const handleCodeClick = event => {
        event.preventDefault()
        CustomEditor.toggleCodeBlock(editor)
        setCode(!isCode)
    }

    return (
        <div className='article'>
            <div className='header'>
                <i onClick={hanldeBoldClick} className={"material-icons icon " + (isBold ? "icon-on" : null)}>format_bold</i>
                <i onClick={handleCodeClick} className={"material-icons icon " + (isCode ? "icon-on" : null)}>code</i>
            </div>

            <Slate editor={editor} value={value}
                onChange={value => {
                    setValue(value)

                    // Save the value to the Local Storage
                    const content = JSON.stringify(value)
                    localStorage.setItem('content', content)
                }}>

                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        if (!event.ctrlKey) return

                        event.preventDefault()
                        switch (event.key) {
                            case '`': {
                                CustomEditor.toggleCodeBlock(editor)
                                break
                            }

                            case 'b': {
                                CustomEditor.toggleBoldMark(editor)
                                break
                            }

                            default:
                                return
                        }
                    }}
                />
            </Slate>
        </div>

    )
}


const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <strong>{props.children}</strong>
        </pre>
    )
}

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

const Leaf = props => {
    return (
        <span {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}>
            {props.children}
        </span>
    )
}