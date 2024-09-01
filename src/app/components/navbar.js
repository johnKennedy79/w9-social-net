import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function NavBar() {
  "use server";
  const user = await currentUser();
  return (
    <div className="flex items-center w-11/12 h-16 mt-20 justify-evenly">
      <Link
        href={`/${user.id}`}
        className="hover:text-[#002349] hover:cursor:pointer"
      >
        My Profile
      </Link>
      <Link href="/posts" className="hover:text-[#002349] hover:cursor:pointer">
        All Posts
      </Link>
    </div>
  );
}
