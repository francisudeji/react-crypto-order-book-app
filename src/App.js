import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home'
import OrderBook from './components/order-book'
import { Provider } from './hooks/app-context'

function App() {
  return (
    <div className='App'>
      <div className='container px-6'>
        <Provider>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/:currency_pair' component={OrderBook} />
            </Switch>
          </Router>
        </Provider>
      </div>
    </div>
  )
}

export default App
