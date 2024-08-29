import Link from "next/link";
export default function NavBar() {
  return (
    <div className="flex items-center w-screen h-16 mt-20 justify-evenly">
      <Link href="/">My Profile</Link>
      <Link href="/posts">All Posts</Link>
    </div>
  );
}
