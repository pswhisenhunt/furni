import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from './features/shared/layout'
import Home from './features/home'
import User from './features/user'
import Likes from './features/likes'
import Cart from './features/cart'
import ProductList from './features/shared/productList'
import ProductPage from './features/shared/productPage'
import Login from './features/login'

const App = () => {
  /** Make a searchResults component to render instead of Product List */
  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/bedroom' element={<ProductList title='Bedroom'/>}/>
          <Route path='/living' element={<ProductList title='Living Room'/>}/>
          <Route path='/dining' element={<ProductList title='Dinning Room'/>}/>
          <Route path='/decor' element={<ProductList title='Decorations'/>}/>
          <Route path='/clearance' element={<ProductList title='Clearance'/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/user/likes' element={<Likes/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/search' element={<ProductList title='results'/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Layout>
    </div>
  )
}

export default App