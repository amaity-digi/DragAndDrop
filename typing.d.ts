import { type } from "os"

interface Board {
    column:Map<TypedColumn,Column>
}

type TypedColumn = 'ondeck' | 'blocked' | 'inprogress' | 'inreview' | 'ready4validation' | 'invalidation' | 'done'
 
interface Column {
    id: TypedColumn,
    todos:Todo[]
}

interface Todo {
    $id:string,
     $createdAt: string;
    title:string,
    status:TypedColumn,

}

