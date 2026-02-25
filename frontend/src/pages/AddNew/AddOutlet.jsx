import React from 'react'
import NavBar from '../../components/NavBar'
import { Outlet } from 'react-router-dom'

function AddOutlet() {
  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}

export default AddOutlet