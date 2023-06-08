
import { ID, databases } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { Board, Column, Todo, TypedColumn } from '@/typing';
import { create } from 'zustand'

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board : Board) => void;
    updateTodoInDB: (todo : Todo, columnId: TypedColumn) => void;
    
    newTaskType:TypedColumn;
    newTaskInput:string;
    serachString : string;
    addTask: (todo:string , columnId : TypedColumn) => void;
    setSearchString:(serachString: string) => void;
    setNewTaskInput: (input: string) => void;
    setNewTaskType: (columnId : TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
    column: new Map<TypedColumn, Column>()
  },

  serachString : '',
  newTaskInput:'',
  setSearchString: (serachString) => set({serachString}),
  newTaskType:'ondeck',

  getBoard: async() =>{
     const board = await getTodosGroupedByColumn();
     set({board})
  },
  setBoardState : (board) => set({board}),

  setNewTaskInput: (input: string) => set({newTaskInput: input}),
  setNewTaskType: (columnId: TypedColumn) => set({newTaskType: columnId }),

  
  updateTodoInDB : async (todo,columnId) => {
    await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
        todo.$id,
        {
            title:todo.title,
            status: columnId
        }

    );
  },
   
  addTask: async (todo :string ,columnId :TypedColumn ) =>{
   await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    ID.unique(),
    {
     title: todo,
     status: columnId
    }
   );
   set({newTaskInput: ''});

   set((state) =>{
    const newColumns = new Map(state.board.column);
    const newTodo : Todo = {
      $id: ID.unique(),
      $createdAt: new Date().toISOString(),
      title: todo,
      status: columnId
    } ;
    const column = newColumns.get(columnId);
    if(!column){
      newColumns.set(columnId,{
        id: columnId, 
        todos: [newTodo],
      });
    }
    else{
      newColumns.get(columnId)?.todos.push(newTodo); 
    }
    return {
      board: {
        column : newColumns
      }
    }
   })
  }

}))
