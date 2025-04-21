import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='h-full text-white font-player flex justify-center items-center'>
       
        <div className='w-[80%] text-center space-y-10'>
            <h1 className='text-4xl'>Math<em className='animate-fade-in-scale'>Fast</em></h1>
            <h2>
                Calculate the 10 generated arithmetic questions as fast as you can!
            </h2>
        
            <Link to="/challenge" className='text-2xl border p-3 text-center bg-white text-black hover:bg-black hover:text-white'>Go!</Link>
        </div>
        
    </div>
  )
}

export default HomePage