import { AppProps } from 'next/app'

import Logo from '~/assets/logo'
import { globalStyles } from '~/styles/global'
import { Container, Header } from '~/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Logo />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
