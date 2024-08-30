import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import ProfileForm from "./profileForm";
export default async function NewPost() {
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
  const profileData = result.rows[0];
  async function createPost(formData) {
    "use server";
    const clerk_id = formData.get("clerk_id");
    const timestamp = formData.get("timestamp");
    const post = formData.get("post");

    await db.query(
      `
    INSERT INTO rcposts (clerk_id, timestamp, post) 
    VALUES ($1, $2, $3)`,
      [clerk_id, timestamp, post]
    );
    revalidatePath(`/posts`);
  }

  return (
    <div className="border-double border-[#cd950c] h-3/5 w-screen border-8 outline-8 flex items-center">
      <form
        action={createPost}
        className="flex items-center justify-between w-screen"
      >
        <input type="hidden" name="clerk_id" value={profileData.clerk_id} />
        <input type="hidden" name="timestamp" value="Now()" />
        <label>What do you want to say?</label>
        <textarea
          className="border-solid border-[#cd950c] border-2 p-2 w-80 min-h-4"
          name="post"
        ></textarea>
        <button className="w-30 border-double border-[#cd950c] border-4 p-2 outline-4">
          Add New Post
        </button>
      </form>
    </div>
  );
}
