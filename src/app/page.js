import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import ProfileForm from "./components/profileForm";
import NavBar from "./components/navbar";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";

export const metadata = {
  title: "landing page",
  discription: "new users create a profile if they do not already have one",
};

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) {
    return (
      <p className="text-center text-3xl">
        {" "}
        Please sign in or sign up if you don&apos;t already have an account{" "}
      </p>
    );
  }
  const result = await db.query(`SELECT * FROM profiles WHERE clerk_id = $1`, [
    user.id,
  ]);
  if (result.rowCount === 0) {
    return (
      <SignedIn>
        <ProfileForm />
      </SignedIn>
    );
  }
  const profile = result.rows[0];

  return (
    <main className="flex flex-col items-center">
      <SignedIn>
        <NavBar />
      </SignedIn>
      <h1 className="text-4xl p-4">Landing Page</h1>
      <Image
        src={profile.btn_image}
        alt="Profile Avitar Image"
        width="200"
        height="200"
        className="rounded-full"
      ></Image>
      <h1 className="mt-4">
        Welcome {profile.username} to your Rip Cord Profile Page
      </h1>
      <div>
        <p>First Name: {profile.firstname}</p>
      </div>
      <div>
        <p>Last Name: {profile.lastname}</p>
      </div>
      <div>
        <p>Age: {profile.age}</p>
      </div>
      <div>
        <p>Location: {profile.location}</p>
      </div>
      <div>
        <p>Bio: {profile.bio}</p>
      </div>
    </main>
  );
}
