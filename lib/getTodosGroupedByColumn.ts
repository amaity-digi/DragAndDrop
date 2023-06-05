import { databases } from "@/appwrite"
import { Board, Column, TypedColumn } from "@/typing";

export const getTodosGroupedByColumn = async () =>{
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    );
    
    const todos = data.documents;
    console.log(todos,'All Documents');

    const columns = todos.reduce((acc,todo)=>{
         if(!acc.get(todo.status)){
            acc.set(todo.status,{
                id:todo.status,
                todos : []
            })
         } 

         acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt : todo.$createdAt,
            title: todo.title,
            status:todo.status,
         });
         return acc;

    },new Map<TypedColumn, Column>())
    console.log(columns,'colllll');

    //if the columns doesn't data add them with empty todos

    const columnsTypes : TypedColumn[] = ['ondeck', 'blocked', 'inprogress', 'inreview', 'ready4validation', 'invalidation','done'];

    for(const columnsType of columnsTypes){
        if(!columns.get(columnsType)){
            columns.set(columnsType,{
                id: columnsType,
                todos: [],
            })
        }
    }
  console.log(columns,'afterthat....');

  //sort columns by columnType

  const sortedColumns = new Map(
  Array.from(columns.entries()).sort(
    (a,b) => columnsTypes.indexOf(a[0]) - columnsTypes.indexOf(b[0])
  )
  );

  const board : Board = {
    column : sortedColumns
  }
  return board;
}