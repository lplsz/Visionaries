import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ContentState, convertToRaw } from 'draft-js';
import styles from './QAadd.css'

function QAadd() {
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [contentState, setContentState] = useState(raw) // ContentState JSON
    return (
        <div style={{}}>
            <div style={{ height: '300px', width: '500px' }}>

                <Editor
                    defaultContentState={contentState}
                    onContentStateChange={setContentState}
                    wrapperClassName={styles.wrapper - class}
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
            </div>
        </div>

    )
}
export default QAadd;