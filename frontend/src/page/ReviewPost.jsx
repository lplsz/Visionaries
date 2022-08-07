import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "../component/DraggableElement";
import ExpertHeader from '../component/ExpertHeader';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { apiCall } from '../Main';
import ErrorSnackbar from '../component/ErrorSnackBar';
import SuccessSnackbar from '../component/SuccessSnackBar';

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

const ReviewPost = () => {

  const [elements, setElements] = React.useState({ "Pending Review": [], "All My Post": [] });
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [open2,setOpen2] = React.useState(false);

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

  // delete a QA from all listed QAs.
  const handleDelete = (list, index, rid, prefix) => {
    const listCopy = { ...elements };
    const result = removeFromList(list,index)
    listCopy[prefix] = result[1];
    setElements(listCopy);
    apiCall(`qa/${rid}`, 'DELETE');
  }

  const updateQAReview = async (id, source) => {
    
    for (let key in elements[source]) {
      if (elements[source][key].id === id) {
        const item = elements[source][key];
        const info = {
          body: item.body,
          category_id: item.category.id,
          tag_ids: item.tags,
          title: item.title,
        }
        const id_int = parseInt(item.id)
        const data = await apiCall(`qa/${id_int}`, 'PUT', info);
        if (typeof (data) === 'string' && (! data.startsWith('200') || ! data.startsWith('201'))) {
          setErrorMessage(data.slice(3, data.length));
          setOpen(true);
        } 
        else {
          setOpen2(true);
        }
        break;
      }
    }
    
  }

  const onDragEnd = (result) => {

    if (!result.destination) {
      return;
    }
    // else if (result.destination.droppableId === "Pending Review") {
    //   return;
    // }

    const source = result.source.droppableId;
    const currentDragCardId = result.draggableId;
    updateQAReview(currentDragCardId, source);

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

  console.log("ele",elements);
  return (
    <div style={{ backgroundSize: '100% 100%' }}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <ExpertHeader />
      <ErrorSnackbar open={open} setOpen={setOpen} message={errorMessage}/>
      <SuccessSnackbar open={open2} setOpen={setOpen2} message={'Post has been successfully reviewed !'}></SuccessSnackbar>
      <div style={{ paddingTop: '20px', textAlign: 'center', paddingLeft: '5%', paddingRight: '5%' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <ListGrid spacing={50} alignItems="flex-end">
            <DraggableElement
              elements={elements["Pending Review"]}
              key={"Pending Review"}
              prefix={"Pending Review"}
              handleDelete={handleDelete}
            />
            <DraggableElement
              elements={elements["All My Post"]}
              key={"All My Post"}
              prefix={"All My Post"}
              handleDelete={handleDelete}
            />
          </ListGrid>
        </DragDropContext>
      </div>
    </div>
  );
}

export default ReviewPost;
