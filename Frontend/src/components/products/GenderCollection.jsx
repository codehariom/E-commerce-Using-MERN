import React from 'react'
import Men from "/src/assets/Men Fashion.jpg"
import Women from "/src/assets/women Fashion.jpg"
import { Link } from 'react-router-dom'

function GenderCollection() {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className=' container mx-auto flex flex-col md:flex-row gap-10'>
            {/* men collection  */}
            <div className='relative flex-1'>
                <img src={Men} alt="Men Fashion" className='rounded-lg' />
                <div className='absolute bottom-8  p-3 left-8 rounded-lg bg-white '>
                    <h2 className=' text-2xl font-bold text-gray-900 mb-3'>
                        Men Collection 
                    </h2>
                    <Link to="/collection/all?gender=Men" className=' text-orange-500'>Shop Now</Link>
                </div>
            </div>
                {/* women collection  */}
                <div className=' relative flex-1'>
                <img src={Women} alt="Men Fashion" className='rounded-lg' />
                <div className='absolute bottom-8  p-3 left-8 rounded-lg bg-white '>
                    <h2 className=' text-2xl font-bold text-gray-900 mb-3'>
                        Women Collection 
                    </h2>
                    <Link to="/collection/all?gender=Women" className=' text-orange-500'>Shop Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}
export default GenderCollection