import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from './features/shared/layout'
import Home from './features/home'
import Bedroom from './features/bedroom'
import Living from './features/living'
import Dining from './features/dining'
import Decor from './features/decor'

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
        </Routes>
      </Layout>
    </div>
  )
}

export default App