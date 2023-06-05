
'use client'

import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react'
import { DragDropContext , Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';


function Board() {
    const [board, getBoard,setBoardState,updateTodoInDB] = useBoardStore((state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB
    ]);

  useEffect(()=>{
    getBoard();
  },[getBoard]);
   
  console.log(board);
    const handleonDragEnd = (result: DropResult) => {
        const {destination , source , type } = result;
        // Checking if user dragged card outside of board
        if(!destination)
        return;
        //Handle column drag
        if(type === 'column'){
          const entries = Array.from(board.column.entries());
          const [removed] = entries.splice(source.index,1) // removed that specific column
          entries.splice(destination.index, 0,removed);
          const reArrangedColumn = new Map(entries);
          setBoardState({
            ...board, column: reArrangedColumn
          })
        }

        //The indexes are stored as numbers 1,2,3 etc instend of id's with DND library

        const columns = Array.from(board.column);
        const startColumnIndex = columns[Number(source.droppableId)];
        const lastColumnIndex = columns[Number(destination.droppableId)];
        
        const startCol: Column ={
          id: startColumnIndex[0],
          todos: startColumnIndex[1].todos
        }

        const lastCol: Column ={
          id: lastColumnIndex[0],
          todos: lastColumnIndex[1].todos
        }

        console.log(startCol,'ss',lastCol);

        if(!startCol || !lastCol) return;

        if(source.index === destination.index && startCol === lastCol) return;
       
        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index ,1 );
        
        if(startCol.id === lastCol.id){
          // Same column task drag
          newTodos.splice(destination.index,0,todoMoved);
          const newCol={
            id: startCol.id,
            todos: newTodos
          }

          const newColumns = new Map(board.column);
          newColumns.set(startCol.id,newCol);
          setBoardState({...board,column: newColumns})

        }else{
          //dragging to another column
          const lastTodos = Array.from(lastCol.todos);
          lastTodos.splice(destination.index,0,todoMoved);

          const newColumns = new Map(board.column);
          const newCol={
            id: startCol.id,
            todos: newTodos
          };

          newColumns.set(startCol.id,newCol);
          newColumns.set(lastCol.id,
            {
              id: lastCol.id,
              todos: lastTodos,
            });
            //Update in DB
            updateTodoInDB(todoMoved,lastCol.id);
            setBoardState({...board,column: newColumns})

        }


    }

  return (
    <div>
        <DragDropContext onDragEnd={handleonDragEnd}>
           <Droppable droppableId='board' direction='horizontal' type='column'>
             {(provided)=>(
                <div
                //Rendering all the columns
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'

                >
                  {
                    Array.from(board.column.entries()).map(([id,column],index) =>(
                      <Column
                       key={id}
                       id={id}
                       todos = {column.todos}
                       index={index}
                      />
                    ))
                  }
                </div>
             )}
           </Droppable>
        </DragDropContext>
    </div>
  )
}

export default Board