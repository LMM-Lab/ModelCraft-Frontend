"use client";
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { DndContext } from "@dnd-kit/core"
import React, { useEffect, useState } from "react"
import Flex from "@/component/common/styles/Flex"
import Sortable from "./Sortable";
import Layer from "./Layer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { paramsProps } from "..";

const DynamicDnD = ({params,setParams}:{params:paramsProps[],setParams:(params:paramsProps[])=>void}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const oldSortable = active.data.current?.sortable;
    const newSortable = over.data.current?.sortable;
    if (!oldSortable || !newSortable) return;

    setParams(arrayMove(params,oldSortable.index, newSortable.index))
  }

  return (
    <div style={{width:'97%', margin:'3rem auto'}}>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={params}>
          <Flex $flex_wrap="wrap">
            {params.map((item, index) => (
              <Flex key={item.id} $flex_direction="column" $marginTop="1rem" >
                <Flex $align_items="center">
                {(index === 0) ?  (
                    <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: '2rem', margin: '0 0.8rem',color:'white'}} />
                  ):(
                    <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: '2rem', margin: '0 0.8rem' }} />
                  )}
                  <Sortable id={item.id}>
                    <Layer name={item.model} input={`${100}×${40}×${100}`} output="245×120×3" />
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