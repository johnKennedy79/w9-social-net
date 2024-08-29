import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up",
  description: "create a new account with secure sign up",
};

export default function SignUpPage() {
  return (
    <div className="flex justify-center">
      <SignUp />
    </div>
  );
}
