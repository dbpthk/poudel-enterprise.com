"use server"; // ensure this runs server-side

import { db } from "../../../../lib/db";
import { orders } from "../../../../lib/schema";
import { eq } from "drizzle-orm";
// import * as React from "react";

export async function GET(req, { params }) {
  // unwrap params correctly
  // const { orderId } = await React.use(params);
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

    // safe parse items
    let items = [];
    if (order.items) {
      try {
        items = JSON.parse(order.items);
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
