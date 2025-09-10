import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-white">
      <div className="p-8 flex flex-col gap-4 justify-center ">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg",
            },
          }}
        />
      </div>
    </div>
  );
}
