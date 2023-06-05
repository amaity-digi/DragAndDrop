'use client'

import { FormEvent, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModelStore } from '@/store/ModelStore'
import { useBoardStore } from '@/store/BoardStore'
import TaskTypeRedioGroup from './TaskTypeRedioGroup'

  const Model = () => {
   const [addTask, newTaskInput, setNewTaskInput,newTaskType] = useBoardStore((state) => [
    state.addTask,
    state.newTaskInput,
    state.setNewTaskInput,
    state.newTaskType
   ])

  const[isOpen,closeModel] = useModelStore((state) =>[
    state.isOpen,
    state.closeModel
  ])

  const handleSubmit =(e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault;
    if(!newTaskInput) return;

    //add Task
     addTask(newTaskInput,newTaskType);

    console.log('closed');
    closeModel();
  }

  return (
    // Use the `Transition` component at the root level
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='form'
      onSubmit={handleSubmit}
      className='relative z-10' onClose={closeModel}> 
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        <div className='fixed inset-0 bg-black bg-opacity-25'/>
        </Transition.Child>

       <div className='fixed inset-0 overflow-y-auto'>
        <div className=' flex min-h-full items-center justify-center p-4 text-center'>
     
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left 
           align-middle shadow-xl transition-all'>
            <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 pb-2'>Add a Task</Dialog.Title>

           <div className='mt-2'>
            <input 
            type='text'
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            placeholder='Enter the text here...'
            className='w-full border border-gray-300 rounded-md outline-none p-5'
            
            />
            
            {/* <TaskTypeRedioGroup /> */}
             
             <div className='mt-4'>
              <button
              type='submit'
              disabled={!newTaskInput}
              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2
              text-sm font-medium text-blue-900 hover:bg-blue-200'
              >Add Task</button>
             </div>
           
           </div>
            
          </Dialog.Panel>
        </Transition.Child>
               
        </div>
       </div>
      </Dialog>
    </Transition>
  )
}

export default Model;