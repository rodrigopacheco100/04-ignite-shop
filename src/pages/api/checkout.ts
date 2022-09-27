import { NextApiHandler } from 'next'

import { stripe } from '~/lib/stripe'

const handler: NextApiHandler = async (request, response) => {
  const { items } = request.body

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'method not allowed' })
  }

  if (!Array.isArray(items) || items.length === 0) {
    return response.status(400).json({ error: 'items must be provided' })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_URL}/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_URL}/`,
    mode: 'payment',
    line_items: items
  })

  return response.status(201).json({ checkoutUrl: checkoutSession.url })
}

export default handler
