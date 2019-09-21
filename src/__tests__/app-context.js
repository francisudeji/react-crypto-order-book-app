import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from '../app-context'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function ChildComponent() {
  return <div>child component</div>
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' render={() => <div>Home</div>} />
        <Route path='/:currency_pair' render={() => <div>Currency Pair</div>} />
      </Switch>
    </BrowserRouter>
  )
}

test('Provider renders child component', () => {
  const { getByText } = render(
    <Provider>
      <ChildComponent />
    </Provider>
  )
  expect(getByText(/child component/))
})

test('Provider renders router with one component', () => {
  const { container } = render(
    <Provider>
      <Routes />
    </Provider>
  )
  expect(container.children).toHaveLength(1)
})
