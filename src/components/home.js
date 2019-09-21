import React from 'react'
import Spinner from './spinner'
import Dropdown from './dropdown'
import { useAppContext } from '../app-context'

function Home({ history }) {
  const [{ orderPairs, loadingOrderPairs }] = useAppContext()

  const handleChange = selection => {
    history.push(`/${selection.url_symbol}`)
  }

  return (
    <div className='home flex flex-col items-center justify-center h-100vh'>
      <h1
        data-testid='title'
        className='text-center text-indigo-500 mx-auto font-bold text-3xl mb-6 tracking-wide'
      >
        {loadingOrderPairs ? 'Loading' : 'Select'} Order Pairs
      </h1>
      {!loadingOrderPairs ? (
        <>
          <Dropdown items={orderPairs} onChange={handleChange} />
          <a
            href='https://github.com/francisudeji/react-crypto-order-book-app'
            className='uppercase text-gray-500 mt-6 text-base tracking-wide text-center font-bold hover:underline my-6'
          >
            GITHUB
          </a>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Home
