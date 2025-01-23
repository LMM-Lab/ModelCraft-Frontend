"use client";
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { DndContext } from "@dnd-kit/core"
import React, { useState } from "react"
import Flex from "@/component/common/styles/Flex"
import Sortable from "./Sortable";
import Layer from "../Layer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const DynamicDnD = () => {
  const [items, setItems] = useState(
    {
      cards: [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
        { id: '9' },
        { id: '10' },
        { id: '11' },
        { id: '12' },
        { id: '13' },
        { id: '14' },
        { id: '15' },
        { id: '16' },
      ],
    },
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const oldSortable = active.data.current?.sortable;
    const newSortable = over.data.current?.sortable;
    if (!oldSortable || !newSortable) return;

    setItems({
      ...items,
      cards: arrayMove(items.cards, oldSortable.index, newSortable.index)
    })
  }

  return (
    <div style={{margin:'3rem 0 3rem 0'}}>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items.cards}>
          <Flex $flex_wrap="wrap">
            {items.cards.map((item, index) => (
              <Flex key={item.id} $flex_direction="column" $marginTop="1rem" >
                <Flex $align_items="center">
                {(index === 0) ?  (
                    <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: '2rem', margin: '0 0.8rem',color:'white'}} />
                  ):(
                    <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: '2rem', margin: '0 0.8rem' }} />
                  )}
                  <Sortable id={item.id}>
                    <Layer name="Affine" input="120×120×3" output="245×120×3" />
                  </Sortable>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default DynamicDnD