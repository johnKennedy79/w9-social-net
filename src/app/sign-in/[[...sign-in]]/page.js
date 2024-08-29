import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In ",
  description: "Sign In to your account with secure sign in",
};

export default function SignInPage() {
  return (
    <div className="flex justify-center">
      <SignIn />
    </div>
  );
}
