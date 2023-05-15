import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from './features/shared/layout'
import Home from './features/home'
import Bedroom from './features/bedroom'
import Living from './features/living'
import Dining from './features/dining'
import Decor from './features/decor'
import User from './features/user'
import Likes from './features/likes'
import Cart from './features/cart'

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/bedroom' Component={Bedroom}/>
          <Route path='/living' Component={Living}/>
          <Route path='/dining' Component={Dining}/>
          <Route path='/decor' Component={Decor}/>
          <Route path='/user' Component={User}/>
          <Route path='/user/likes' Component={Likes}/>
          <Route path='/cart' Component={Cart}/>
        </Routes>
      </Layout>
    </div>
  )
}

export default App