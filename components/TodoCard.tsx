'use client'

import { Todo, TypedColumn } from '@/typing';
import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

type Props ={
    todo: Todo;
    index:number;
    id:TypedColumn;
    innerref:(element : HTMLElement | null ) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;

}

function TodoCard({
    todo,index,id,innerref,draggableProps,dragHandleProps
}:Props) {
  return (
    <div
    className='bg-white rounded-md space-y-2 drop-shadow-md'
    {...draggableProps} {...dragHandleProps} ref={innerref}
    >
        <div className='flex justify-between items-center p-5'>
        <p>{todo.title}</p>
        </div>
      
    </div>
  )
}

export default TodoCard