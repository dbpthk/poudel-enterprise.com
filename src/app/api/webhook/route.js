import Stripe from "stripe";
import { buffer } from "micro";
import { db } from "../../../lib/db";
import { orders } from "../../../lib/schema";
import { eq } from "drizzle-orm";

// disable default body parsing in next.config or here
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const buf = await req.arrayBuffer(); // raw body
  const rawBody = Buffer.from(buf);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // handle events
  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object;
      const orderId = pi.metadata.orderId;

      if (orderId) {
        await db
          .update(orders)
          .set({ status: "paid" })
          .where(eq(orders.id, parseInt(orderId)));
        console.log(`✅ Order ${orderId} marked as paid`);
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object;
      const orderId = pi.metadata.orderId;

      if (orderId) {
        await db
          .update(orders)
          .set({ status: "failed" })
          .where(eq(orders.id, parseInt(orderId)));
        console.log(`❌ Order ${orderId} marked as failed`);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
