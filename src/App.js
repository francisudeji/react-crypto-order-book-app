import React, { useState, useEffect } from 'react'
import Dropdown from './components/dropdown'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [tradingPairs, setTradingPairs] = useState([])

  useEffect(() => {
    const url = 'https://www.bitstamp.net/api/v2/trading-pairs-info/'
    const getTradingPairs = async () => {
      const response = await fetch(url)
      const data = await response.text()
      setTradingPairs(data)
      console.log(data)
    }
    getTradingPairs()
  }, [])

  return (
    <div className='App'>
      <div className='container'>
        <button
          className='bg-white text-gray-500 font-semibold uppercase text-lg w-full px-6 py-3 border border-gray-200 flex justify-between items-center mt-10 outline-none hover:border-gray-400 focus:border-gray-400'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Select Currency Pair</span>
          {isOpen ? <span>&uarr;</span> : <span>&darr;</span>}
        </button>
        <div>
          {isOpen && tradingPairs.length > 0 && (
            <Dropdown items={tradingPairs} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
