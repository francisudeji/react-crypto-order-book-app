import React from 'react'
import Downshift from 'downshift'

function Dropdown({ items }) {
  console.log(items)
  return (
    <Downshift
      // onChange={onChange}
      itemToString={item => (item ? item.name : '')}
      isOpen={true}
      // initialHighlightedIndex={initialHighlightedIndex}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex
      }) => (
        <div className='relative'>
          {/* <FaSearch className='text-gray-400 z-10 ml-4 mt-5 absolute left-0 top-0 text-lg' /> */}
          <input
            autoFocus
            className='block w-full pl-6 text-lg py-3 border-b-2 border-gray-200 mx-4 outline-none'
            placeholder='Search trading pairs'
            {...getInputProps()}
          />
          <ul {...getMenuProps()} className='my-3'>
            {isOpen
              ? items
                  // .filter(
                  //   tradingPair =>
                  //     !inputValue.toLowerCase() ||
                  //     tradingPair.name
                  //       .toLowerCase()
                  //       .includes(inputValue.toLowerCase()) ||
                  //     tradingPair.description
                  //       .toLowerCase()
                  //       .includes(inputValue.toLowerCase())
                  // )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.name,
                        index,
                        item
                      })}
                      className='flex justify-between items-center'
                    >
                      <div>
                        <span className='block'>{item.name}</span>
                        <span className='block'>{item.description}</span>
                      </div>
                      <div>{item.minimum_order}</div>
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}

export default Dropdown
