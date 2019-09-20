import React from 'react'

function OrderBookList({ list, index, orderName }) {
  return (
    <li
      className='p-3 text-xl flex flex-col border-b-2 border-gray-200'
      style={{ fontFamily: 'monospace' }}
    >
      <div className='flex'>
        <span className='text-indigo-500 font-bold'>
          {orderName !== null && orderName[0]}
        </span>{' '}
        <span className='pl-2'>{list[1]}</span>
      </div>

      <div className='flex'>
        <span className='order-2 pl-2'>{list[0]}</span>{' '}
        <span className='order-1 text-indigo-500 font-bold'>
          {orderName !== null && orderName[1]}
        </span>
      </div>
    </li>
  )
}

export default OrderBookList
