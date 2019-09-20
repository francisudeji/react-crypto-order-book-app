import React, {
  useContext,
  createContext,
  useReducer,
  useMemo,
  useEffect
} from 'react'

const appContext = createContext()

function reducer(state, { type, payload }) {
  switch (type) {
    case 'SET_ORDER_PAIRS': {
      return {
        ...state,
        loadingOrderPairs: false,
        orderPairs: payload
      }
    }
    case 'SET_ORDER_BOOK': {
      return {
        ...state,
        loadingOrderBook: false,
        orderBook: {
          bids: payload.bids,
          asks: payload.asks
        }
      }
    }
    default: {
      return state
    }
  }
}

export function Provider({ children }) {
  const initialState = {
    orderPairs: [],
    orderBook: {
      bids: [],
      asks: []
    },
    loadingOrderPairs: true,
    loadingOrderBook: true
  }

  const memoizedState = useMemo(() => initialState, [initialState])

  const [state, dispatch] = useReducer(reducer, memoizedState)
  const value = [state, dispatch]

  useEffect(() => {
    const url = 'https://www.bitstamp.net/api/v2/trading-pairs-info/'
    const getOrderPairs = async () => {
      const response = await fetch(url)
      const data = await response.text()
      dispatch({
        type: 'SET_ORDER_PAIRS',
        payload: JSON.parse(data)
      })
    }
    getOrderPairs()
  }, [dispatch])

  return <appContext.Provider value={value}>{children}</appContext.Provider>
}

export function useAppContext() {
  const [state, dispatch] = useContext(appContext)
  return [state, dispatch]
}
