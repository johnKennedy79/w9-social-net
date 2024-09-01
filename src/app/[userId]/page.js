import { db } from "@/lib/db";
import NavBar from "@/app/components/navbar";
import CollapsibleDemo from "../components/userAside";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import NewPost from "../components/newPost";
import ProfileError from "../components/error";

export default async function MyPage({ params, searchParams }) {
  const sort = searchParams.sort === "desc" ? "DESC" : "ASC";
  const user = await currentUser();
  if (!user) {
    return <p>Please sign in or sign up.</p>;
  }

  const profileRes = await db.query(
    `
        SELECT * FROM profiles 
        WHERE profiles.clerk_id = $1`,
    [user.id]
  );
  if (profileRes.rowCount === 0) {
    return (
      <>
        <NavBar />;
        <ProfileError />
      </>
    );
  }
  const profile = profileRes.rows[0];

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
        WHERE rcposts.clerk_id = $1
        ORDER BY rcposts.timestamp ${sort}
        `,
    [user.id]
  );
  const posts = postsRes.rows;

  const result = await db.query(`SELECT * FROM profiles`);
  const allUsers = result.rows;

  return (
    <div>
      <NavBar />
      <NewPost />
      <div className="flex mt-4 ml-4 mr-4 w-11/12">
        <CollapsibleDemo myProfile={profile} allUsers={allUsers} />
        <main className="flex flex-col items-center w-2/3  text-center z-10 border-solid border-[#cd950c] border-2 p-2 ml-4">
          <Image
            src={profile.btn_image}
            alt="Profile Avitar Image"
            width="200"
            height="200"
            className="rounded-full"
          ></Image>
          <h1> Welcome {profile.username} to your Rip Cord Profile Page</h1>
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
          <div className="mb-4">
            <Link
              href={`/${user.id}?sort=asc`}
              className="mr-4 hover:text-[#002349] hover:cursor:pointer"
            >
              Sort ascending
            </Link>
            <Link
              href={`/${user.id}?sort=desc`}
              className="ml-4 hover:text-[#002349] hover:cursor:pointer"
            >
              Sort descending
            </Link>
          </div>
          {posts.map((post) => {
            const jsonDate = new Date(post.timestamp);
            const formattedDate = jsonDate.toLocaleDateString();
            const formattedTime = jsonDate.toLocaleTimeString();
            return (
              <>
                <div key={post.id} className="w-11/12 mt-4">
                  <div className="border-solid border-[#cd950c] border-2 p-2 flex items-center justify-between bg-[#002349] w-11/12">
                    <h2>{post.username}</h2>
                    <p>
                      {formattedDate}
                      {formattedTime}
                    </p>
                  </div>
                  <div className="w-11/12">
                    <p className="p-4 w-full">{post.post}</p>
                  </div>
                  <div>
                    <Link
                      href={`posts/${post.id}`}
                      className="hover:text-[#002349] hover:cursor:pointer"
                    >
                      comments
                    </Link>{" "}
                  </div>
                </div>
              </>
            );
          })}
        </main>
      </div>
    </div>
  );
}
