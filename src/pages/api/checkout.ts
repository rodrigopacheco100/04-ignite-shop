import { NextApiHandler } from 'next'

import { stripe } from '~/lib/stripe'

const handler: NextApiHandler = async (request, response) => {
  const { priceId } = request.body

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'method not allowed' })
  }

  if (!priceId) {
    return response.status(400).json({ error: 'priceId must be provided' })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_URL}/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_URL}/`,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ]
  })

  return response.status(201).json({ checkoutUrl: checkoutSession.url })
}

export default handler
