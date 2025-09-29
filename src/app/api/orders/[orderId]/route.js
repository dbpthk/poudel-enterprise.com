import { db } from "../../../../lib/db";
import { orders } from "../../../../lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
  const { orderId } = params;

  try {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, Number(orderId)));

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // parse items before sending
    const parsedOrder = {
      ...order,
      items: JSON.parse(order.items), // ✅ convert string to array
    };

    return new Response(JSON.stringify(parsedOrder), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
