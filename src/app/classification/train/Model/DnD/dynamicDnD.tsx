"use client";
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { DndContext } from "@dnd-kit/core"
import React, { useEffect } from "react"
import Flex from "@/component/common/styles/Flex"
import Sortable from "./Sortable";
import Layer from "./Layer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { paramsProps,TypeIO } from "../types";
import { LayerIOCalculator } from "./IOCalculator";

type DynamicDnDProps={
  layerIO:TypeIO[]
  setLayerIO:React.Dispatch<React.SetStateAction<TypeIO[]>>
  setParams:React.Dispatch<React.SetStateAction<paramsProps[]>>
}

const DynamicDnD = ({
  layerIO,
  setLayerIO,
  setParams
}:DynamicDnDProps
) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const oldSortable = active.data.current?.sortable;
    const newSortable = over.data.current?.sortable;
    if (!oldSortable || !newSortable) return;
    const newLayerIO = arrayMove(layerIO, oldSortable.index, newSortable.index);

    setParams((prevParams) => {
      const newParams = arrayMove(prevParams, oldSortable.index, newSortable.index);

      try {
        // 新しい順番のparamsを使ってLayerIOを再計算
        const recalculatedLayerIO = LayerIOCalculator(newLayerIO, [28]);
        setLayerIO(recalculatedLayerIO); // 再計算後のLayerIOで更新
        console.log('DynamicDnDsuccess')
      } catch (error) {
        console.log('DynamicDnDerror')
        console.log(error);
      }

      return newParams;
    });
  }

  useEffect(() => {
    console.log('layerIO:',layerIO)
  }, [layerIO]);

  return (
    <div style={{width:'97%', margin:'3rem auto'}}>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={layerIO}>
          <Flex $flex_wrap="wrap">
            {layerIO.map((item, index) => (
              <Flex key={item.id} $flex_direction="column" $marginTop="1rem" >
                <Flex $align_items="center">
                {(index === 0) ?  (
                    <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: '2rem', margin: '0 0.8rem',color:'white'}} />
                  ):(
                    <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: '2rem', margin: '0 0.8rem' }} />
                  )}
                  <Sortable id={item.id}>
                    <Layer name={item.model} input={`${item.input}`} output={`${item.output}`} />
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