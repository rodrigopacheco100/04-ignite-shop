import axios from 'axios'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import { useState } from 'react'
import Stripe from 'stripe'

import { stripe } from '~/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '~/styles/pages/product'

type Product = {
  id: string
  name: string
  price: string
  priceId: string
  image: string
  description: string
}

type ProductProps = {
  product: Product
}

type ProductParams = {
  id: string
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.priceId
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      alert('Falha ao redirecionar para checkout')
    } finally {
      setIsCreatingCheckoutSession(false)
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.image} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isCreatingCheckoutSession} type="button" onClick={handleBuyProduct}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths<ProductParams> = async () => {
  return {
    paths: [{ params: { id: 'prod_MUjIrtwK5YndQ6' } }],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<ProductProps, ProductParams> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        image: product.images[0],
        description: product.description,
        priceId: price.id,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100)
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}
