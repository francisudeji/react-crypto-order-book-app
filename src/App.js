import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home'

function App() {
  return (
    <div className='App'>
      <div className='container px-6'>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            {/* <Route path='/:currency_pair' component={OrderBook} /> */}
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App
