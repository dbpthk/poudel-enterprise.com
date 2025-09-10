"use client";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex w-full justify-center bg-amber-100">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
