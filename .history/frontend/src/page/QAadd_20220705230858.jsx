import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './QAadd.css'
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

function QAadd() {
    const [qaList, setQaList] = React.useState([
        { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', discription: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.', new: 1, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Riri', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Riri', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
        { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', discription: 'All information we gather is completely confidential. Your personal information will not be shared with anyo ', new: 2, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Riri', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Riri', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
        { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', discription: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work', new: 0, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Riri', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Riri', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
        { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', discription: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.', new: 0, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Riri', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Riri', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
        { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', discription: 'All information we gather is completely confidential. Your personal information will not be shared with anyo ', new: 2, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Riri', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Riri', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
        { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', discription: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work', new: 2 },
        { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', discription: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.', new: 2 },
        { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', discription: 'All information we gather is completely confidential. Your personal information will not be shared with anyo ', new: 2 },
        { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', discription: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work', new: 0 },
        { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', discription: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.', new: 2 },
        { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', discription: 'All information we gather is completely confidential. Your personal information will not be shared with anyo ', new: 1 },
        { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', discription: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work', new: 1 },
    ])
    const [editorState, setEditorState] = useState(EditorState.createEmpty()) // ContentState JSON
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const [convertedContent, setConvertedContent] = useState(null);
    const convertContentToHTML = () => {
        console.log(editorState);
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
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