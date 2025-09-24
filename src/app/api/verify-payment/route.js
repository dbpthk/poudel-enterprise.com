import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { payment_intent } = await req.json();
    if (!payment_intent) {
      return new Response(
        JSON.stringify({
          status: "requires_payment_method",
          error: "No PI provided",
        }),
        { status: 400 }
      );
    }

    const intent = await stripe.paymentIntents.retrieve(payment_intent);

    // Just return Stripe status as-is
    return new Response(JSON.stringify({ status: intent.status }));
  } catch (err) {
    console.error("❌ Verify error:", err);
    return new Response(
      JSON.stringify({ status: "failed", error: err.message }),
      {
        status: 500,
      }
    );
  }
}
