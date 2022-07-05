import React from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

function QAadd() {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    return (<div style={{ height: '400px', width: '400px' }}>
        <Editor editorState={editorState} onChange={setEditorState} />
    </div>
    );
}
export default QAadd;