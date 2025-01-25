"use client";
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { DndContext } from "@dnd-kit/core"
import React, { use, useEffect, useState } from "react"
import Flex from "@/component/common/styles/Flex"
import Sortable from "./Sortable";
import Layer from "./Layer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { paramsProps,TypeIO } from "../types";
import { LayerIOCalculator } from "./IOCalculator";
import { useGlobalState } from "../../page";

type DynamicDnDProps={
  params:paramsProps[]
  setParams:React.Dispatch<React.SetStateAction<paramsProps[]>>
}

const DynamicDnD = ({
  params,
  setParams
}:DynamicDnDProps
) => {
  const {state,setState}=useGlobalState()
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    setParams((prev) => {
      const oldIndex = prev.findIndex(p => p.id === active.id);
      const newIndex = prev.findIndex(p => p.id === over.id);
      if (oldIndex < 0 || newIndex < 0) return prev;
    
      const rearranged = arrayMove(prev, oldIndex, newIndex);
    
      try {
        const recalculated = LayerIOCalculator(rearranged, state);
        return recalculated;
      } catch(error) {
        console.log(error);
        return prev;
      }
    });
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
                    <Layer name={item.model} input={`${item.io.input}`} output={`${item.io.output}`} />
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