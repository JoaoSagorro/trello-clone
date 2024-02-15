'use client';

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
};

function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const ListContainer = ({
  data,
  boardId,
}: ListContainerProps) => {

  const [ orderedData, setOrderedData ] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    };

    // if dropped in the same position we don't have to do anything

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    };

    // if a user moves a list

    if (type === "list") {
      const items = reOrder(
        orderedData,
        source.index,
        destination.index,
      ).map((item, index) => ({...item, order: index}));

      setOrderedData(items);

      //TODO: trigger server action
    }

    // user moves a card

    if (type === "card") {
      let newOrderedData = [...orderedData];

      // source and destination list

      const sourceList = newOrderedData.find(list => list.id === source.droppableId);

      const destList = newOrderedData.find(list => list.id === destination.droppableId);


      if (!sourceList || !destList) {
        return;
      };

      // check if cards exist on the sourceList

      if (!sourceList.cards) {
        sourceList.cards = [];
      };

      // check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      };

      // moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reOrder(
          sourceList.cards,
          source.index,
          destination.index,
        );
        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        // TODO: Trigger the server action
        // User moves the card to another list
      } else {
        // remove card from the source list
        const [ moveCard ] = sourceList.cards.splice(source.index, 1);

        // Assign the new listId to the moved card
        moveCard.listId = destination.droppableId;

        // Add card to the destination list
        destList.cards.splice(destination.index, 0, moveCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // Update the order for each card on the destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);

        // TODO: trigger server action
      }
    }
  };

  return(
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol {...provided.droppableProps} ref={provided.innerRef} className="flex gap-x-3 h-full">
            {orderedData.map((list, index) => {
              return(
                <ListItem
                  key={list.id}
                  index={index}
                  data={list}
                />
              );
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1"/>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
