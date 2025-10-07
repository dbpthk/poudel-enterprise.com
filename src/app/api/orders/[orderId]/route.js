"use server"; // ensure this runs server-side

import { db } from "../../../../lib/db";
import { orders } from "../../../../lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req, context) {
  const { orderId } = await context.params; // fix: await params

  try {
    // Fetch the order by ID
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

    // Safely parse items (in case stored as JSON string)
    let items = [];
    if (order.items) {
      try {
        items =
          typeof order.items === "string"
            ? JSON.parse(order.items)
            : order.items;
      } catch (e) {
        console.warn(`⚠️ Failed to parse items for order ${order.id}:`, e);
      }
    }

    const parsedOrder = {
      ...order,
      items,
    };

    return new Response(JSON.stringify(parsedOrder), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ GET /api/orders/[orderId] error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
