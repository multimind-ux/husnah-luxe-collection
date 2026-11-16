import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { CART_KEY } from '../lib/store'

const CartContext = createContext(null)

export function itemKey(item) {
  return `${item.id}__${item.size || 'default'}__${item.colour || 'default'}__${item.variant || 'default'}`
}

function readCart() {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CART_KEY) || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item) => item && item.id && Number(item.qty) > 0)
      .map((item) => ({
        ...item,
        qty: Math.max(1, Math.min(Number(item.qty) || 1, Number(item.stock) || 99)),
        key: item.key || itemKey(item),
      }))
  } catch (error) {
    return []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const key = itemKey(action.item)
      const existing = state.find((item) => item.key === key)
      const stock = Math.max(1, Number(action.item.stock) || 99)
      if (existing) {
        return state.map((item) =>
          item.key === key
            ? { ...item, qty: Math.min(item.qty + action.item.qty, stock) }
            : item,
        )
      }
      return [
        ...state,
        {
          ...action.item,
          key,
          qty: Math.min(Math.max(1, action.item.qty), stock),
        },
      ]
    }
    case 'update': {
      if (action.qty <= 0) return state.filter((item) => item.key !== action.key)
      return state.map((item) =>
        item.key === action.key
          ? {
              ...item,
              qty: Math.min(Math.max(1, action.qty), Number(item.stock) || 99),
            }
          : item,
      )
    }
    case 'remove':
      return state.filter((item) => item.key !== action.key)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, readCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items))
    } catch (error) {
      /* storage may be unavailable */
    }
  }, [items])

  const addItem = useCallback((product, options = {}) => {
    if (!product || Number(product.stock) <= 0) return false
    const qty = Math.max(1, Number(options.qty) || 1)
    const size = options.size || product.sizes?.[0] || ''
    const colour = options.colour || product.colours?.[0]?.name || ''
    const variant = options.variant || product.variants?.[0] || ''
    dispatch({
      type: 'add',
      item: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: Number(product.price),
        image: product.images?.[0] || '',
        size,
        colour,
        variant,
        stock: Number(product.stock) || 0,
        qty,
      },
    })
    return true
  }, [])

  const updateQty = useCallback((key, qty) => {
    dispatch({ type: 'update', key, qty })
  }, [])

  const removeItem = useCallback((key) => {
    dispatch({ type: 'remove', key })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((open) => !open), [])

  const count = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.qty || 0), 0),
    [items],
  )
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      total: subtotal,
      isOpen,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      items,
      count,
      subtotal,
      isOpen,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
