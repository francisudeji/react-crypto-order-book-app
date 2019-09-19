import React, { useState, useEffect } from 'react'
// import Dropdown from './dropdown'
import Spinner from './spinner'
import Dropdown from './dropdown'

function Home() {
  const [tradingPairs, setTradingPairs] = useState([])

  useEffect(() => {
    const url = 'https://www.bitstamp.net/api/v2/trading-pairs-info/'
    const getTradingPairs = async () => {
      const response = await fetch(url)
      const data = await response.text()
      setTradingPairs(JSON.parse(data))

      // const response2 = await fetch(
      //   'https://www.bitstamp.net/api/order_book/ltcusd'
      // )
      // const data2 = await response2.json()
      // console.log({ data2 })

      // const message = {
      //   event: 'bts:subscribe',
      //   data: {
      //     channel: 'order_book_ltcusd'
      //   }
      // }
      // const webSocket = new WebSocket('wss://ws.bitstamp.net')
      // webSocket.onopen = () => {
      //   webSocket.send(JSON.stringify(message))
      // }

      // webSocket.onmessage = evt => {
      //   console.log(JSON.parse(evt.data))
      // }
    }
    getTradingPairs()
  }, [])

  return (
    <div className='home flex flex-col items-center justify-center h-100vh'>
      <h1 className='text-center text-indigo-500 mx-auto font-bold text-3xl mb-6 tracking-wide'>
        Trading Pairs
      </h1>
      {tradingPairs.length > 0 ? (
        <>
          <Dropdown items={tradingPairs} />
          <a
            href='https://github.com/francisudeji/react-crypto-order-book-app'
            className='uppercase text-gray-500 mt-6 text-base tracking-wide text-center font-bold hover:underline'
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
