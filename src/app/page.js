import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import ProfileForm from "./components/profileForm";
import NavBar from "./components/navbar";
export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) {
    return <p> Please sign in or sign up </p>;
  }
  const result = await db.query(`SELECT * FROM profiles WHERE clerk_id = $1`, [
    user.id,
  ]);
  if (result.rowCount === 0) {
    return <ProfileForm />;
  }
  const profile = result.rows[0];

  return (
    <main className="flex flex-col items-center">
      <NavBar />
      <h1> Welcome {profile.username} to your Rip Cord Profile Page</h1>
      <div>
        <p>First Name: {profile.firstname}</p>
      </div>
      <div>
        <p>Last Name: {profile.lastname}</p>
      </div>
      <div>
        <p>Bio: {profile.bio}</p>
      </div>
    </main>
  );
}
