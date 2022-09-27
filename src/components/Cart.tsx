import Image from 'next/future/image'
import { IoCloseOutline } from 'react-icons/io5'

import { useCart } from '~/hooks/cart'
import {
  CartContainer,
  CartFooter,
  CartItem,
  CartItemDetails,
  CartItems,
  CartItemsPrice,
  CartItemsQuantity,
  ImageContainer
} from '~/styles/components/cart'

export const Cart: React.FC = () => {
  const { items, cartShown, toggleCartShown, removeItem, isCreatingCheckoutSession, handleCreateCheckout } = useCart()

  const totalItemsQuantity = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalItemsPrice = items.reduce((acc, item) => {
    const priceWithoutCharacters = Number(item.price.replace('R$ ', '').replace(',', '.'))

    return acc + priceWithoutCharacters * item.quantity
  }, 0)

  return (
    <CartContainer showCart={cartShown ? 'true' : 'false'}>
      <IoCloseOutline size={24} cursor="pointer" onClick={() => toggleCartShown(false)} />

      <p>Sacola de compras</p>
      <CartItems>
        {items.map(item => (
          <CartItem key={item.priceId}>
            <ImageContainer>
              <Image src={item.image} alt="" width={102} height={93} />
            </ImageContainer>
            <CartItemDetails>
              <p>
                {item.name} - {item.quantity} unidade{item.quantity > 1 && 's'}
              </p>
              <span>{item.price}</span>
              <button type="button" disabled={isCreatingCheckoutSession} onClick={() => removeItem(item.priceId)}>
                Remover
              </button>
            </CartItemDetails>
          </CartItem>
        ))}
      </CartItems>

      <CartFooter>
        <CartItemsQuantity>
          <span>Quantidade</span>
          <span>{`${totalItemsQuantity} itens`}</span>
        </CartItemsQuantity>

        <CartItemsPrice>
          <span>Valor total</span>
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalItemsPrice)}
          </span>
        </CartItemsPrice>

        <button type="button" disabled={isCreatingCheckoutSession || items.length === 0} onClick={handleCreateCheckout}>
          Finalizar compra
        </button>
      </CartFooter>
    </CartContainer>
  )
}
