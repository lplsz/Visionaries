import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './QAadd.css'
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

function QAadd() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty()) // ContentState JSON
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        let l = DOMPurify.sanitize(currentContentAsHTML)
        console.log(l)
    }
    return (
        <div style={{}}>
            <div style={{ height: '300px', width: '500px' }}>

                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
            </div>
        </div>

    )
}
export default QAadd;