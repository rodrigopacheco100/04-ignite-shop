import axios from 'axios'
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface CartData {
  addItem(item: Item): void
  removeItem(priceId: string): void
  items: Item[]
  toggleCartShown(forceCartShown?: boolean): void
  cartShown: boolean
  handleCreateCheckout(): void
  isCreatingCheckoutSession: boolean
}

export interface Item {
  priceId: string
  price: string
  name: string
  quantity: number
  image: string
}

const Cart = createContext<CartData>({} as CartData)

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const [items, setItems] = useState<Item[]>([])
  const [cartShown, setCartShown] = useState<boolean>(false)

  const addItem = useCallback(
    (item: Item) => {
      const itemIndex = items.findIndex(i => i.priceId === item.priceId)
      const itemExistsInCart = itemIndex !== -1

      if (itemExistsInCart) {
        const updatedItem: Item = {
          ...item,
          quantity: items[itemIndex].quantity + item.quantity
        }

        setItems(items => [...items.filter((_item, index) => itemIndex !== index), updatedItem])
        return
      }

      setItems(items => [...items, item])
    },
    [items]
  )

  const removeItem = useCallback(
    (priceId: string) => {
      const itemIndex = items.findIndex(item => item.priceId === priceId)
      const itemExistsInCart = itemIndex !== -1

      if (!itemExistsInCart) {
        return
      }

      const updatedArray = items
      const selectedItem = updatedArray[itemIndex]

      if (selectedItem.quantity > 1) {
        selectedItem.quantity -= 1

        setItems([...updatedArray])
        return
      }

      setItems(items => items.filter(item => item.priceId !== priceId))
    },
    [items]
  )

  const toggleCartShown = useCallback(
    (forceCartShown?: boolean) => {
      setCartShown(cartShown => forceCartShown ?? !cartShown)
    },
    [setCartShown]
  )

  const handleCreateCheckout = useCallback(async () => {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        items: items.map(({ priceId, quantity }) => ({
          price: priceId,
          quantity
        }))
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      alert(`Falha ao redirecionar para checkout, error: ${error.response.data.error}`)
    } finally {
      setIsCreatingCheckoutSession(false)
    }
  }, [items])

  return (
    <Cart.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        addItem,
        removeItem,
        items,
        toggleCartShown,
        cartShown,
        handleCreateCheckout,
        isCreatingCheckoutSession
      }}
    >
      {children}
    </Cart.Provider>
  )
}

function useCart(): CartData {
  const context = useContext(Cart)

  if (!context) throw new Error('useCart must be used within a CartProvider')

  return context
}

export { CartProvider, useCart }
