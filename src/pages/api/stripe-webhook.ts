import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'
import { useAppwrite } from '@/lib/appwrite'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    const { databases } = useAppwrite()

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        // Update order status in Appwrite
        await databases.updateDocument('orders', paymentIntent.metadata.orderId, {
          status: 'paid',
        })
        break
      case 'payment_intent.payment_failed':
        // Handle failed payment
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}