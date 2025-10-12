"use client";

import { useEffect, useState, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchId, setSearchId] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"

  // Fetch orders
  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    setLoading(true);
    let isMounted = true;
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        if (isMounted) setOrders(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, [isLoaded, user?.id]);

  // Filter orders for customer
  const visibleOrders = useMemo(() => {
    if (!orders) return [];
    let filtered = [...orders];

    // Customer sees only paid orders
    if (user?.publicMetadata.role !== "admin") {
      filtered = filtered.filter((o) => o.status === "paid");
    }

    // Search by order ID
    if (searchId) {
      filtered = filtered.filter((o) =>
        o.id.toString().includes(searchId.trim())
      );
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [orders, searchId, sortOrder, user]);

  if (!isLoaded) return <p className="min-h-[150px]">Loading user...</p>;
  if (!user)
    return <p className="min-h-[150px]">Please sign in to see your orders.</p>;
  if (loading) return <p className="min-h-[150px]">Loading orders...</p>;
  if (error) return <p className="text-red-500 min-h-[150px]">{error}</p>;

  return (
    <div className="max-w-6xl  mx-auto p-10 overflow-y-hidden">
      <h1 className="text-3xl font-bold mb-6">
        {user.publicMetadata.role === "admin" ? "All Orders" : "Your Orders"}
      </h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border p-2 rounded-md"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {visibleOrders.length === 0 ? (
        <p className="text-gray-500">
          {user.publicMetadata.role === "admin"
            ? "No orders found."
            : "You have no past orders."}
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {visibleOrders.map((order) => {
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
                    <p className="text-sm sm:text-lg font-semibold">
                      Order #{order.id}{" "}
                      {user.publicMetadata.role === "admin" &&
                        `(User: ${order.customerName || order.userId})`}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status badge */}
                  {user.publicMetadata.role === "admin" ? (
                    <div className="flex items-center ">
                      <span
                        className={` px-3 py-1 rounded-full text-[12px] font-medium ${
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
                  ) : order.status === "paid" ? (
                    <div className="flex items-center ">
                      <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-green-100 text-green-800">
                        {order.status.toUpperCase()}
                      </span>
                      {isExpanded ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  ) : null}
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-4 border-t pt-4 space-y-3">
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li
                          key={`${item.id}-${item.size}`}
                          className="flex justify-between text-sm sm:text-md"
                        >
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
                    {user.publicMetadata.role === "admin" &&
                      order.deliveryInfo && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-semibold mb-2">
                            Delivery Information
                          </h3>
                          <p>
                            <strong>Name:</strong> {order.customerName}
                          </p>
                          <p>
                            <strong>Address:</strong>{" "}
                            {order.deliveryInfo.address}
                          </p>
                          <p>
                            <strong>City/State/ZIP:</strong>{" "}
                            {order.deliveryInfo.city},{" "}
                            {order.deliveryInfo.state} {order.deliveryInfo.zip}
                          </p>
                          <p>
                            <strong>Country:</strong>{" "}
                            {order.deliveryInfo.country}
                          </p>
                          <p>
                            <strong>Phone:</strong> {order.deliveryInfo.phone}
                          </p>
                          <p>
                            <strong>Email:</strong> {order.deliveryInfo.email}
                          </p>
                        </div>
                      )}
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
