import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { orders } from "../../../lib/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, cartItems, userId, deliveryInfo } = await request.json();

    // construct customerName
    const customerName = `${deliveryInfo.fname || ""} ${
      deliveryInfo.lname || ""
    }`.trim();

    // 1️⃣ Create order in DB (status = pending) with delivery info
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId,
        amount,
        items: JSON.stringify(cartItems),
        status: "pending",
        customerName,
        deliveryInfo, // store as JSON
      })
      .returning();

    const orderId = newOrder.id;

    // 2️⃣ Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "AUD",
      automatic_payment_methods: { enabled: true },
      metadata: { orderId },
    });

    // 3️⃣ Update order with stripeId
    await db
      .update(orders)
      .set({ stripeId: paymentIntent.id })
      .where(eq(orders.id, orderId));

    // 4️⃣ Return clientSecret and orderId to frontend
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
