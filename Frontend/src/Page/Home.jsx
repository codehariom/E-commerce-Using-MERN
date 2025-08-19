import React, { useEffect, useState } from 'react'
import Hero from '../components/layout/Hero'
import GenderCollection from '../components/products/GenderCollection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeatureProduct from '../components/products/FeatureProduct'
import FeatureSection from '../components/products/FeatureSection'
import Faq from '../components/common/Faq'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import { fetchProductByFilter } from '../redux/productSlice'

function Home() {
  const dispatch = useDispatch()

  // ✅ Make sure this matches your productSlice structure
  const { products = [], loading, error } = useSelector((state) => state.products);

  const [bestSeller, setBestSeller] = useState(null)

  useEffect(() => {
    dispatch(
      fetchProductByFilter({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8
      })
    )

    // fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSeller(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBestSeller()
  }, [dispatch])

  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      {/* Best seller section */}
      <div className="p-4">
        <h2 className="text-3xl text-center font-bold mb-3">Best Seller</h2>
        {bestSeller ? (
          Array.isArray(bestSeller) ? (
            <ProductGrid products={bestSeller} loading={false} error={null} />
          ) : (
            <ProductDetails products={bestSeller._id} />
          )
        ) : (
          <p className="text-center">Loading Best Seller Products...</p>
        )}
      </div>

      {/* Top wears */}
      <div className="p-4 font-bold">
        <h2 className="text-4xl text-center font-bold mb-4">
          Top wears for women
        </h2>
        {/* ✅ Corrected products prop */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeatureProduct />
      <FeatureSection />
      <Faq />
    </div>
  )
}

export default Home
