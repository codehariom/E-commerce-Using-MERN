import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollection from '../components/products/GenderCollection'
import NewArrivals from '../components/products/NewArrivals'

function Home() {
  return (
    
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrivals/>
    </div>
  )
}

export default Home