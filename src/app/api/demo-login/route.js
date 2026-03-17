import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Server-side demo login. Creates a sign-in token for the demo user.
 * Credentials stay on server (DEMO_EMAIL in .env). No password needed.
 * Add DEMO_EMAIL to .env (e.g. Demo@enterprise.com)
 */
export async function POST() {
  try {
    const demoEmail = process.env.DEMO_EMAIL?.trim();
    if (!demoEmail) {
      return NextResponse.json(
        { error: "Demo login not configured" },
        { status: 503 }
      );
    }

    const client = await clerkClient();

    const { data: users } = await client.users.getUserList({
      emailAddress: [demoEmail],
    });

    if (!users?.length) {
      return NextResponse.json(
        { error: "Demo user not found" },
        { status: 404 }
      );
    }

    const signInToken = await client.signInTokens.createSignInToken({
      userId: users[0].id,
      expiresInSeconds: 60,
    });

    return NextResponse.json({ token: signInToken.token });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Demo login error:", err);
    }
    return NextResponse.json(
      { error: "Demo login failed" },
      { status: 500 }
    );
  }
}
