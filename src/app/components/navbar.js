import Link from "next/link";
import ProfileForm from "./profileForm";
import { currentUser } from "@clerk/nextjs/server";
export default async function NavBar() {
  "use server";
  const user = await currentUser();
  return (
    <div className="flex items-center w-screen h-16 mt-20 justify-evenly">
      <Link href={`/${user.id}`}>My Profile</Link>
      <Link href="/posts">All Posts</Link>
    </div>
  );
}
