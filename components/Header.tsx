
'use client';

import Image from 'next/image'
import React from 'react'
import {MagnifyingGlassIcon, PlusCircleIcon} from '@heroicons/react/24/solid';
import Avatar from 'react-avatar';
import { useBoardStore } from '@/store/BoardStore';
import { useModelStore } from '@/store/ModelStore';

function Header() {
  const openModel = useModelStore((state) => state.openModel);
  const [searchString,setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ])
  return (
    <header>
        <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/20 rounded-b-2xl'>

            <div 
              className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1]
              rounded-md filter blur-3xl opacity-50 -z-50'
            />
              
        <Image
          src='https://www.digisprint.com/wp-content/uploads/2021/04/DigiSprint-Logo.png'
          alt='DigiSprint-logo'
          height={100}
          width={250}
          className='w-44 md:w-56 pb-10 md:pb-0 object-contain '
        />

         {/* <div className='flex items-end justify-end p-2'>
                        <button onClick={openModel} className='text-gray-500 hover:text-green-500 items-center'>
                            <PlusCircleIcon  className='h-10 w-10'/>
                        </button>
          </div> */}
                      
        <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
          <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
            <MagnifyingGlassIcon className='h-6 w-6 text-gray-400'/>
            <input 
             type='text'
              placeholder='Search' 
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className='flex-1 outline-none p-2'/>
            <button type='submit' hidden>Search</button>
           </form>
        </div>
        <Avatar name='Ashis Maity' round color='#0055D1' size='50'/>
        </div>
    </header>
  )
}

export default Header
