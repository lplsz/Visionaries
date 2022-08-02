import { Draggable } from "react-beautiful-dnd";
import { generateFromString } from "generate-avatar";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border: 3px solid white;
  border-radius: 50%;
`;

const CardHeader = styled.div`
  font-weight: 500;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;


const ListItem = (props) => {
  console.log(props);
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardHeader>{props.item.question}</CardHeader>
            <span>{props.item.description}</span>
            <CardFooter>
              <Author>
                <Chip label={props.item.category} />
                {props.item.image === null
                  ? <Avatar
                    src={props.item.image}
                  />
                  : <></>
                }
                <Button>Review</Button>
              </Author>
            </CardFooter>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
