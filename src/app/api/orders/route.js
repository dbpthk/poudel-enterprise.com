// src/app/api/orders/route.js
import { db } from "../../../lib/db";
import { orders } from "../../../lib/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const user = await currentUser(); // ✅ get current logged-in user
    console.log("backend user:", user);

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isAdmin = user?.publicMetadata?.role === "admin";
    let data;

    if (isAdmin) {
      // Admin: fetch all orders
      data = await db.select().from(orders).orderBy(orders.id);
    } else {
      // Customer: fetch only their orders
      data = await db
        .select()
        .from(orders)
        .where(eq(orders.userId, user.id))
        .orderBy(orders.id);
    }

    // ✅ since Drizzle returns proper JSON, no need to parse
    data = data.map((d) => ({
      ...d,
      items: d.items || [], // keep safe fallback
    }));

    console.log("✅ Fetched orders:", data.length);
    console.log("🧠 Sample order:", data[0]);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
