"use client";
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { DndContext } from "@dnd-kit/core"
import React from "react"
import Flex from "@/component/common/styles/Flex"
import Sortable from "./Sortable";
import Layer from "./Layer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { paramsProps } from "../types";
import { LayerIOCalculator } from "./IOCalculator";

type DynamicDnDProps={
  params:paramsProps[]
  setParams:React.Dispatch<React.SetStateAction<paramsProps[]>>
  handleParamsUpdate:(params:paramsProps[],prev:paramsProps[])=>paramsProps[]
  inputSize:number[]
  setError:React.Dispatch<React.SetStateAction<string|null>>
}

const DynamicDnD = ({params,setParams,handleParamsUpdate,inputSize,setError}:DynamicDnDProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

      const oldIndex = params.findIndex(p => p.id === active.id);
      const newIndex = params.findIndex(p => p.id === over.id);
      if (oldIndex < 0 || newIndex < 0) return params;
    
      const rearranged = arrayMove(params, oldIndex, newIndex);
      const updatedParams=handleParamsUpdate(rearranged,params)
      setParams(updatedParams);
  }

  const handleDelete = (id: number) => {
    const updated = params.filter(item => item.id !== id);
    try{
      setParams(LayerIOCalculator(updated,inputSize));
    } catch (error:any) {
      setError(error.message)
    }

  };

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
                    <Layer name={item.model} onDelete={() => handleDelete(item.id)} input={`(${item.io.input})`} output={`(${item.io.output})`} />
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