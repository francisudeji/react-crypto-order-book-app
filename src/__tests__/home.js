import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import { createBrowserHistory } from 'history'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from '../components/home'
import { Provider } from '../app-context'

function HomeComponent() {
  return (
    <Provider>
      <BrowserRouter>
        <Route path='/' component={Home} />
      </BrowserRouter>
    </Provider>
  )
}

test('Home component consumes context', async () => {
  const { findByTestId } = render(<HomeComponent />)
  expect(await findByTestId(/title/)).toHaveTextContent('Loading Order Pairs')
})

test('Pathname matches location.pathname', () => {
  const history = createBrowserHistory()
  render(<HomeComponent />)
  expect(history.location.pathname).toEqual(window.location.pathname)
})
