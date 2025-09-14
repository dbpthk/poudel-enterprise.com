import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-white">
      <div className="p-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h1>
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
