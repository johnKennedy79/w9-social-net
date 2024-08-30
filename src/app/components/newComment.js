import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ProfileForm from "./profileForm";

export default async function NewComment({ rcposts_id }) {
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
  async function addCommentAction(formData) {
    "use server";
    const clerk_id = formData.get("clerk_id");
    const rcposts_id = formData.get("rcposts_id");
    const timestamp = formData.get("timestamp");
    const comment = formData.get("comment");
    await db.query(
      `
        INSERT INTO rccomments (clerk_id, rcposts_id, timestamp, comment ) 
        VALUES ($1, $2, $3, $4)
        `,
      [clerk_id, rcposts_id, timestamp, comment]
    );
    revalidatePath(`/posts/${rcposts_id}`); //form data is not clearing
    redirect(`/posts/${rcposts_id}`);
  }
  return (
    <div className="mt-10">
      <form action={addCommentAction} className="p-4">
        <textarea
          name="comment"
          placeholder="Add your comment"
          className="w-full h-20 p-2 border"
          required
        />
        <input type="hidden" name="rcposts_id" value={rcposts_id} />
        <input type="hidden" name="clerk_id" value={profileData.clerk_id} />
        <input type="hidden" name="timestamp" value="now()" />
        <button className="w-30 border-double mt-4 border-[#cd950c] border-4 p-2 outline-4 bg-[#002349] text-[#8b6508]">
          Add Comment
        </button>
      </form>
    </div>
  );
}
