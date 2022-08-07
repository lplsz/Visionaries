import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "../component/DraggableElement";
import ExpertHeader from '../component/ExpertHeader';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { apiCall } from '../Main';

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

// generate string id for recipes
const makeid = (list) => {
  let i = 0;
  for (const key of Object.keys(list)) {
    for (const e of list[key]) {
      e.rid = e.id
      e.id = (i).toString()
      i += 1
    }
  }
  return list;
}


function ReviewPost() {

  const [elements, setElements] = React.useState({ "Pending Review": [], "All My Post": [] });

  const getInfo = async () => {
    const data1 = await apiCall('qa_not_reviewed', 'GET');
    const data2 = await apiCall('qa_reviewed', 'GET');

    Promise.all([data1, data2]).then(
      function(results) {
        const newElements = { "Pending Review": results[0].qas, "All My Post": results[1].qas };
        setElements(makeid(newElements));
    })
  }

  useEffect(() =>{
    getInfo();
  },[]);

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
    <div style={{ backgroundSize: '100% 100%' }}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <ExpertHeader />
      <div style={{ paddingTop: '20px', textAlign: 'center', paddingLeft: '5%', paddingRight: '5%' }}>
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
