import { Jacques_Francois } from "next/font/google";
import { Italianno } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const jacFran = Jacques_Francois({ subsets: ["latin"], weight: "400" });
const italio = Italianno({ subsets: ["latin"], weight: "400" });
export const metadata = {
  title: "Social Network App",
  description: "Week 9 Project My Social Network App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={jacFran.className}>
          <header className="fixed top-0 left-0 w-screen h-20 bg-[#002349] flex justify-evenly items-center">
            <h1 className="text-[#cd950c] text-5xl">Rip Cord</h1>
            <SignedOut>
              <SignInButton className="border-double border-[#cd950c] border-8 outline-8 h-16 w-32 bg-[#002349] text-[#cd950c] text-2xl" />
            </SignedOut>
            <SignedIn>
              <UserButton className="border-double border-[#cd950c] border-8 outline-8 h-20 w-32 bg-[#002349] text-[#cd950c] text-2xl" />
            </SignedIn>
          </header>
          <SignedOut>
            <div>You&apos;re Not Worthy</div>
          </SignedOut>
          <SignedIn>{children}</SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
