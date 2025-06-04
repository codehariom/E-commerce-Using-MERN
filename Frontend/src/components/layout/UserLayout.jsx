import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Home from '../../Page/Home'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <>
    
    {/* Header  */}
    <Header/>
    {/* Main Contenet  */}
    <main><Outlet/></main>
    {/* Footer  */}
    <Footer/>

    </>
  )
}

export default UserLayout