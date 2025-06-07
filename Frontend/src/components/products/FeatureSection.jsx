import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

function FeatureSection() {
  return (
    <section className=' py-15 px-10 bg-white '>
            <div className=' container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center'>
                <div className=' flex flex-col text-left'>
                    <div className=' p-4 space-y-2  rounded-full mb-2'>
                        <HiShoppingBag className='text-3xl '/>
                        <h4 className=' mb-2 text-2xl text-gray-600'>Free International Shipping</h4>
                    </div>
                </div>
                <div className=' flex flex-col text-left'>
                    <div className=' p-4 space-y-2  rounded-full mb-2'>
                        <HiArrowPathRoundedSquare className='text-3xl '/>
                        <h4 className=' mb-2 text-2xl text-gray-600'>45 Days Return</h4>
                    </div>
                </div>
                <div className=' flex flex-col  text-left'>
                    <div className=' p-4 space-y-2  rounded-full mb-2'>
                        <HiOutlineCreditCard className='text-3xl '/>
                        <h4 className=' mb-2 text-2xl text-gray-600 '> 100% Secure Checkout</h4>
                    </div>
                </div>
            </div>
    </section>
  )
}

export default FeatureSection