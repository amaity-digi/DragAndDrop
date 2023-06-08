import { Todo, TypedColumn } from '@/typing'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { useBoardStore } from '@/store/BoardStore'
import { useModelStore } from '@/store/ModelStore'

type Props ={
    id: TypedColumn,
    todos: Todo[],
    index : number
}
export type ColumnType = {
  id: TypedColumn;
  todos: Todo[];
};

const idToColumnText :{
    [key in TypedColumn] : string;
} = {
    'ondeck': 'On Deck',
    'blocked': 'Blocked',
    'inprogress': 'In Progress',
    'inreview': 'In Review',
    'ready4validation': 'Ready 4 Validation',
    'invalidation': 'In Validation',
    'done': 'Done'
}

function Column({id,todos,index}: Props) {

  const [searchString] = useBoardStore((state) => [state.searchString]);
  const openModel = useModelStore((state) => state.openModel);
  console.log(openModel);
  const isDoneColumn = id === 'done'; 

  return (
    <Draggable draggableId={id} index={index}  >
        {(provided)=>(
            <div
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref={provided.innerRef }
             className=' flex-shrink-0 w-1/2'
            >
            {/* render droppable todos in the columns */}
            <Droppable droppableId={index.toString()} type="card" >
                {(provided,snapshot) =>(
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-2 rounded-2xl shadow-sm  ${
                        snapshot.isDraggingOver ? 'bg-green-200' : 'bg-gray-400/50'
                      }`}
                    >
                        <h2 className='flex justify-between font-bold text-xl p-2 '>{idToColumnText[id]}
                        <span className='text-gray-500 bg-gray-200 rounded-full   px-2 py-2 text-sm font-normal'>
                          {!searchString ? todos.length : todos.filter(todo => todo.title.toLowerCase().includes(searchString.toLowerCase())).length}
                          </span>
                         </h2>

                     <div className='space-y-2'>
                      {todos.map((todo,index)=>{
                      if(searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase()))
                      return null;

                      return(
                       <Draggable 
                         key={todo.$id}
                         draggableId={todo.$id}
                         index={index}
                         isDragDisabled={isDoneColumn}
                       >
                         {(provided)=>(
                            <TodoCard
                            todo={todo}
                            id={id}
                            index={index}
                            innerref={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                            
                            />

                         )}
                       </Draggable>
                      )})}
                      {provided.placeholder}

                     {id !== 'done' && id === 'ondeck' &&  <div className='flex items-end justify-end p-2'>
                        <button onClick={openModel} className='text-gray-500 hover:text-green-500'>
                            <PlusCircleIcon  className='h-10 w-10'/>
                        </button>
                      </div>
                     }
                     
                     </div>
                    </div>
                )}

            </Droppable>
            </div>
        )}
    </Draggable>
  )
}

export default Column
