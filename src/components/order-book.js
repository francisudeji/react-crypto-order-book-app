import React, { useEffect, useState } from 'react'
import { useAppContext } from '../hooks/app-context'
import Spinner from './spinner'
import OrderBookList from './order-book-list'

function OrderBook({
  match: {
    params: { currency_pair }
  }
}) {
  const [count, setCount] = useState(10)
  const [orderName, setOrderName] = useState(null)
  const [
    { orderBook, loadingOrderBook, orderPairs },
    dispatch
  ] = useAppContext()
  useEffect(() => {
    const subscribeMessage = {
      event: 'bts:subscribe',
      data: {
        channel: `order_book_${currency_pair}`
      }
    }

    const unsubscribeMessage = {
      event: 'bts:unsubscribe',
      data: {
        channel: `order_book_${currency_pair}`
      }
    }

    const pair = orderPairs.find(p => p.url_symbol === currency_pair)
    if (pair) {
      setOrderName(pair.name.split('/'))
    }

    const webSocket = new WebSocket('wss://ws.bitstamp.net')

    webSocket.onopen = () => webSocket.send(JSON.stringify(subscribeMessage))

    webSocket.onmessage = evt => {
      const { data: payload } = JSON.parse(evt.data)

      dispatch({
        type: 'SET_ORDER_BOOK',
        payload
      })
    }

    return () => {
      if (webSocket.OPEN && !webSocket.CONNECTING) {
        webSocket.send(JSON.stringify(unsubscribeMessage))
        webSocket.close()
      }
    }
  }, [currency_pair, dispatch, orderPairs])

  return (
    <div className='home flex flex-col items-center justify-center'>
      {!loadingOrderBook ? (
        <div>
          <div className='w-full flex justify-between my-10'>
            <div className='w-1/2 mr-1'>
              <h1 className='text-indigo-500 mx-auto font-bold text-3xl mb-6 tracking-wide pl-3'>
                Bids
              </h1>
              <ul className='mt-10'>
                {orderBook.bids !== undefined &&
                  orderBook.bids
                    .slice(0, count)
                    .map((bid, i) => (
                      <OrderBookList
                        list={bid}
                        key={i}
                        index={i}
                        orderName={orderName}
                      />
                    ))}
              </ul>
            </div>
            <div className='w-1/2'>
              <h1 className='text-indigo-500 mx-auto font-bold text-3xl mb-6 tracking-wide pl-3'>
                Asks
              </h1>
              <ul className='mt-10'>
                {orderBook.asks !== undefined &&
                  orderBook.asks
                    .slice(0, count)
                    .map((ask, i) => (
                      <OrderBookList
                        list={ask}
                        key={i}
                        index={i}
                        orderName={orderName}
                      />
                    ))}
              </ul>
            </div>
          </div>
          <div className='w-full flex items-center justify-between my-4 px-2'>
            <p className='text-base text-gray-500 font-bold'>{count}/100</p>
            {console.log('rendering count')}

            <button
              className='bg-indigo-500 text-white px-6 py-2 text-center text-base rounded focus:bg-indigo-600 focus:shadow-lg hover:shadow-lg hover:bg-indigo-600'
              onClick={() => setCount(c => c + 10)}
              disabled={count === 100 ? 'disabled' : ''}
            >
              +10
            </button>
          </div>
        </div>
      ) : (
        <div
          className='flex items-center flex-col'
          style={{ marginTop: '50vh' }}
        >
          <h1 className='text-indigo-500 mx-auto font-bold text-3xl mb-6 tracking-wide'>
            Loading Bids and Asks
          </h1>
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default OrderBook
