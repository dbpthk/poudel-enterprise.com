"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to fetch orders: ${errText}`);
        }
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("❌ Orders fetch error", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoaded, user]);

  if (!isLoaded) return <p>Loading user...</p>;
  if (!user) return <p>Please sign in to see your orders.</p>;
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {user.publicMetadata.role === "admin" ? "All Orders" : "Your Orders"}
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">
          {user.publicMetadata.role === "admin"
            ? "No orders found."
            : "You have no past orders."}
        </p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => {
            const isExpanded = expanded === order.id;
            return (
              <div
                key={order.id}
                className="border rounded-xl shadow-sm hover:shadow-lg transition p-5 bg-white"
              >
                {/* Order header */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : order.id)}
                >
                  <div>
                    <p className="font-semibold">
                      Order #{order.id}{" "}
                      {user.publicMetadata.role === "admin" &&
                        `(User: ${order.customerName || order.userId})`}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-4 border-t pt-4 space-y-3">
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-right font-bold text-lg">
                      Total: ${(order.amount / 100).toFixed(2)}
                    </div>

                    {/* Admin sees delivery info */}
                    {user.publicMetadata.role === "admin" && order.delivery && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">
                          Delivery Information
                        </h3>
                        <p>
                          <strong>Name:</strong> {order.delivery.name}
                        </p>
                        <p>
                          <strong>Address:</strong> {order.delivery.address}
                        </p>
                        <p>
                          <strong>City/State/ZIP:</strong> {order.delivery.city}
                          , {order.delivery.state} {order.delivery.zip}
                        </p>
                        <p>
                          <strong>Country:</strong> {order.delivery.country}
                        </p>
                        <p>
                          <strong>Phone:</strong> {order.delivery.phone}
                        </p>
                        <p>
                          <strong>Email:</strong> {order.delivery.email}
                        </p>
                      </div>
                    )}

                    <div className="mt-3 flex justify-end gap-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Invoice
                      </Link>
                      <Link
                        href={`/orders/track/${order.id}`}
                        className="text-sm text-gray-600 hover:underline"
                      >
                        Track Order
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
