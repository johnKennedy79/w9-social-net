import { db } from "@/lib/db";
import NavBar from "@/app/components/navbar";
import Image from "next/image";
export default async function MyPage({ params }) {
  const profile = await fetchProfile(params.userId);
  const posts = await fetchPosts(params.userId);

  async function fetchProfile(userId) {
    const profileRes = await db.query(
      `
          SELECT * FROM profiles 
          WHERE profiles.clerk_id = $1`,
      [userId]
    );
    return profileRes.rows[0];
  }
  console.log(profile);

  async function fetchPosts(userId) {
    const postsRes = await db.query(
      `
          SELECT
          rcposts.id,
          rcposts.post,
          rcposts.timestamp,
          profiles.username AS username
        FROM
          rcposts
        LEFT JOIN
          profiles ON rcposts.clerk_id = profiles.clerk_id
          WHERE rcposts.clerk_id = $1`,
      [userId]
    );
    return postsRes.rows;
  }
  console.log(posts);
  return (
    <main className="flex flex-col items-center">
      <NavBar />
      <Image src={profile.btn_image} alt="Profile Image"></Image>
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
