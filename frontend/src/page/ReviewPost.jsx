/*
 * @Author: Echooooo-zhn haonanZHONG17@outlook.com
 * @Date: 2022-07-12 03:48:01
 * @LastEditors: Echooooo-zhn haonanZHONG17@outlook.com
 * @LastEditTime: 2022-07-13 22:58:05
 * @FilePath: \Visionaries\frontend\src\page\DragList.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "../component/DraggableElement";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ExpertHeader from '../component/ExpertHeader';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';


const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};


function ReviewPost () {

  const pending = [
    { id: '0', name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', description: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.' },
    { id: '1', name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', description: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work out what might help. We always work with you as an individual and will always treat you with respect.', video: 'https://youtu.be/wm5nhB0lYL8' },
  ]
  const reviewed = [
    { id: '3', name: 'Sk', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', description: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work out what might help. We always work with you as an individual and will always treat you with respect.', video: 'https://youtu.be/wm5nhB0lYL8' },
  ];

  const [elements, setElements] = React.useState({"Pending Review": pending, "All My Post": reviewed});

  // useEffect(() => {
  //   setElements(generateLists());
  // }, []);
  console.log(elements);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setElements(listCopy);
  };

  return (
    <div style = {{backgroundSize: '100% 100%'}}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <ExpertHeader />
        <div style={{paddingTop: '20px', textAlign:'center', paddingLeft: '5%', paddingRight: '5%'}}>
            <DragDropContext onDragEnd={onDragEnd}>
                <ListGrid spacing={50} alignItems="flex-end">
                    <DraggableElement
                      elements={elements["Pending Review"]}
                      key={"Pending Review"}
                      prefix={"Pending Review"}
                    />
                    <DraggableElement
                      elements={elements["All My Post"]}
                      key={"All My Post"}
                      prefix={"All My Post"}
                    />
                </ListGrid>
            </DragDropContext>
        </div>
    </div>
  );
}

export default ReviewPost;
