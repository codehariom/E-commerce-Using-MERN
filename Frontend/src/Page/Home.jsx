import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollection from '../components/products/GenderCollection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeatureProduct from '../components/products/FeatureProduct'
import FeatureSection from '../components/products/FeatureSection'

const placeholderProduct=[
    {
        id:1,
        name:"T-shirt",
        price:250,
        img:[{
            url:"https://picsum.photos/200?random=12"
        }]
    },
    {
        id:2,
        name:"Shirt",
        price:150,
        img:[{
            url:"https://picsum.photos/200?random=13"
        }]
    },
    {
        id:3,
        name:"Top",
        price:350,
        img:[{
            url:"https://picsum.photos/200?random=14"
        }]
    },
    {
        id:4,
        name:"Saree",
        price:550,
        img:[{
            url:"https://picsum.photos/200?random=15"
        }]
    },
    {
        id:6,
        name:"T-shirt",
        price:250,
        img:[{
            url:"https://picsum.photos/200?random=16"
        }]
    },
    {
        id:7,
        name:"Shirt",
        price:150,
        img:[{
            url:"https://picsum.photos/200?random=17"
        }]
    },
    {
        id:8,
        name:"Top",
        price:350,
        img:[{
            url:"https://picsum.photos/200?random=18"
        }]
    },
    {
        id:9,
        name:"Saree",
        price:550,
        img:[{
            url:"https://picsum.photos/200?random=19"
        }]
    },
]


function Home() {

  return (
    
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrivals/>

        {/* best seller  */}
        <h2 className=' text-3xl text-center font-bold mb-3'>Best Seller</h2>
        <ProductDetails/>
        <div className=' p-4 font-bold '>
            <h2 className=' text-4xl text-center font-bold mb-4'>
                Top wears for women
            </h2>
            <ProductGrid product={placeholderProduct}/>
        </div>
        <FeatureProduct/>
        <FeatureSection/>
    </div>
  )
}

export default Home