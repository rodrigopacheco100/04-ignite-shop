import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Image from 'next/future/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '~/lib/stripe'
import { HomeContainer, Product } from '~/styles/pages/home'

type Product = {
  id: string
  name: string
  price: string
  image: string
}

type HomeProps = {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => (
        <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
          <Product className="keen-slider__slide">
            <Image src={product.image} alt="" width={520} height={480} />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products: Product[] = data.map(product => ({
    id: product.id,
    name: product.name,
    image: product.images[0],
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format((product.default_price as Stripe.Price).unit_amount / 100)
  }))

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}
