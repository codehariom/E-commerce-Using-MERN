import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollection from '../components/products/GenderCollection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'

function Home() {
  return (
    
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrivals/>

        {/* best seller  */}
        <h2 className=' text-3xl text-center font-bold mb-4'>Best Seller</h2>
        <ProductDetails/>
    </div>
  )
}

export default Home