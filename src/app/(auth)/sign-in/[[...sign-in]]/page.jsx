"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SignIn, useSignIn, useAuth } from "@clerk/nextjs";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { signIn, setActive, isLoaded: isSignInLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const [demoStatus, setDemoStatus] = useState("idle"); // idle | loading | success | error

  const isDemoUser = searchParams?.get("demo") === "user";

  useEffect(() => {
    const shouldAttemptDemo =
      isDemoUser &&
      isSignInLoaded &&
      demoStatus === "idle" &&
      !isSignedIn &&
      signIn &&
      setActive;

    if (!shouldAttemptDemo) {
      if (isDemoUser && isSignedIn) router.replace("/");
      return;
    }

    const performDemoLogin = async () => {
      setDemoStatus("loading");

      try {
        const res = await fetch("/api/demo-login", { method: "POST" });
        const data = await res.json();

        if (!res.ok) {
          setDemoStatus("error");
          return;
        }

        const result = await signIn.create({
          strategy: "ticket",
          ticket: data.token,
        });

        const isComplete =
          result.status === "complete" && result.createdSessionId;
        if (isComplete) {
          await setActive({ session: result.createdSessionId });
          setDemoStatus("success");
          router.replace("/");
        } else {
          setDemoStatus("error");
        }
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("Demo login failed:", err);
        }
        setDemoStatus("error");
      }
    };

    performDemoLogin();
  }, [
    isDemoUser,
    isSignInLoaded,
    signIn,
    setActive,
    router,
    demoStatus,
    isSignedIn,
  ]);

  const showLoading = isDemoUser && demoStatus === "loading";
  const showDemoError = isDemoUser && demoStatus === "error";

  if (showLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-white">
        <div className="p-8 text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-orange-600 border-t-transparent" />
          <p className="text-gray-600">Signing you in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-white">
      <div className="p-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h1>
        {showDemoError && (
          <p className="mb-4 text-sm text-red-600 text-center">
            Demo login failed. Please sign in manually below.
          </p>
        )}
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg",
            },
          }}
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/"
          redirectUrl="/"
        />
      </div>
    </div>
  );
}
