"use client";
import { useUser } from "@clerk/nextjs";

export default function AdminCheck() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  console.log("User Metadata:", user?.publicMetadata);
  console.log("Role Value:", user?.publicMetadata?.role);

  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <div>
      {isAdmin ? (
        <p>✅ Welcome Admin {user?.firstName}</p>
      ) : (
        <p>❌ You are not authorized</p>
      )}
    </div>
  );
}
