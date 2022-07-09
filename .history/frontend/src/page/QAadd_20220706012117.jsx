import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './QAadd.css'
import { convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';

function QAadd() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty()) // ContentState JSON

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const [convertedContent, setConvertedContent] = useState(null);
    const convertContentToHTML = () => {
        console.log(editorState);
        let currentContentAsHTML = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(
            currentContentAsHTML,
        );
        setConvertedContent(markup);
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
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
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: { alt: { present: true, mandatory: true } },
                    }}
                />
            </div>
            <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
        </div>

    )
}
export default QAadd;