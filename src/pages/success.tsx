import { GetServerSideProps } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '~/lib/stripe'
import { ImageContainer, SuccessContainer } from '~/styles/pages/success'

type SuccessProps = {
  customer: {
    name: string
  }
  product: {
    name: string
    image: string
  }
}

type SuccessParams = {
  sessionId?: string
}

export default function Success({ customer, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image src={product.image} alt="" width={120} height={110} />
        </ImageContainer>

        <p>
          Uhuul <strong>{customer.name}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<SuccessProps> = async ({ query }) => {
  const { sessionId } = query as SuccessParams

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customer: {
        name: session.customer_details.name
      },
      product: {
        name: product.name,
        image: product.images[0]
      }
    }
  }
}
