import React from 'react'
import Downshift from 'downshift'

function Dropdown({ items, onChange }) {
  return (
    <Downshift
      onChange={onChange}
      itemToString={item => (item ? item.name : '')}
      isOpen={true}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex
      }) => (
        <div className='w-full shadow-xl h-96 md:h-128 overflow-y-scroll overflow-x-hidden bg-white rounded-lg py-6 px-2'>
          <input
            className='block w-full rounded text-lg py-3 border-b-2 border-gray-200 outline-none mx-4'
            placeholder='Search trading pairs'
            {...getInputProps()}
          />
          <ul {...getMenuProps()} className='my-3'>
            {isOpen
              ? items
                  .filter(
                    item =>
                      !inputValue.toLowerCase() ||
                      item.name
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ||
                      item.description
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.name,
                        index,
                        item
                      })}
                      className={`flex justify-between items-center py-3 border-b-2 border-gray-100 px-4 ${highlightedIndex ===
                        index && 'bg-gray-100 cursor-pointer'}`}
                    >
                      <div>
                        <span className='block text-indigo-600 text-lg font-semibold'>
                          {item.name}
                        </span>
                        <span className='block text-gray-500 text-base'>
                          {item.description}
                        </span>
                      </div>
                      <div className='text-indigo-600 text-base font-semibold'>
                        {item.minimum_order}
                      </div>
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
