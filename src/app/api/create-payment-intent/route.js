import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { orders } from "../../../lib/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, cartItems, userId } = await request.json();

    // 1️⃣ Create order in DB (status = pending)
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId,
        amount,
        items: JSON.stringify(cartItems),
        status: "pending",
      })
      .returning();

    const orderId = newOrder.id;

    // 2️⃣ Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "AUD",
      automatic_payment_methods: { enabled: true },
      metadata: { orderId: newOrder.id },
    });

    // 3️⃣ Update order with stripeId
    await db
      .update(orders)
      .set({ stripeId: paymentIntent.id })
      .where(eq(orders.id, orderId));

    // 4️⃣ Send clientSecret to frontend
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });
  } catch (error) {
    console.error("❌ Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
