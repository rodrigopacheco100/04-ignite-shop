import { AppProps } from 'next/app'

import { Cart } from '~/components/Cart'
import { Header } from '~/components/Header'
import { CartProvider } from '~/hooks/cart'
import { globalStyles } from '~/styles/global'
import { Container } from '~/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartProvider>
        <Header />

        <Cart />
        <Component {...pageProps} />
      </CartProvider>
    </Container>
  )
}
