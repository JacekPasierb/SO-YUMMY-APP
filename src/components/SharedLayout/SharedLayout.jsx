import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router'

const SharedLayout = () => {
  return (
      <>
      <Header />
      <Outlet/>
          {/* <Footer/> */}
      </>
  )
}

export default SharedLayout