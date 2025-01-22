"use client";
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { DndContext } from "@dnd-kit/core"
import { useState } from "react"
import Flex from "@/component/common/styles/Flex"
import Sortable from "./Sortable";
import Layer from "../Layer";

const DynamicDnD=()=>{
  const [items,setItems]=useState(
    {
      cards: [
        { id: '1', title: 'Card 1' },
        { id: '2', title: 'Card 2' },
        { id: '3', title: 'Card 3' },
      ],
    },
  )

const handleDragEnd=(event:DragEndEvent)=>{
  const {active,over}=event;
  if(!over) return;
  if(active.id===over.id) return;

  const oldSortable=active.data.current?.sortable;
  const newSortable=over.data.current?.sortable;
  if(!oldSortable||!newSortable) return;

  setItems({
    ...items,
    cards:arrayMove(items.cards,oldSortable.index,newSortable.index)
  })
}

  return(
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items.cards}>
          <Flex $flex_wrap="wrap">
            {items.cards.map((item)=>(
              <Sortable id={item.id} key={item.id}>
                <Layer name="Affine" input="120×120×3" output="245×120×3"></Layer>
              </Sortable>
            ))}
          </Flex>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default DynamicDnD