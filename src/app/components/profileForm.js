import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function ProfileForm() {
  const user = await currentUser();
  async function handleAddProfile(formData) {
    "use server";
    const userId = formData.get("userId");
    const btn_image = formData.get("btn_image");
    const username = formData.get("username");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const age = formData.get("age");
    const location = formData.get("location");
    const bio = formData.get("bio");
    await db.query(
      `INSERT INTO profiles (clerk_id, btn_image, username, firstName, lastName, age, location, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userId, btn_image, username, firstName, lastName, age, location, bio]
    );
    revalidatePath("/");
  }
  return (
    <div className="flex flex-col items-center h-screen mt-20 bg-slate-400">
      <h1>Add your personal details to your profile</h1>
      <form
        className="flex flex-col items-center border-double border-[#cd950c] h-4/5 w-80 border-8 outline-8"
        action={handleAddProfile}
      >
        <input type="hidden" name="userId" value={user.id} required />
        <input type="hidden" name="btn_image" value={user.imageUrl} />
        <label className="mt-4">Your prefered user name</label>
        <input
          className="w-60 border-solid border-[#cd950c] border-2 p-2"
          type="text"
          name="username"
          placeholder="Add your user name here..."
          required
        ></input>
        <label className="mt-4">First Name</label>
        <input
          className="w-60 border-solid border-[#cd950c] border-2 p-2"
          type="text"
          name="firstName"
          placeholder="Add your first name here..."
        ></input>
        <label className="mt-4">Last Name</label>
        <input
          className="w-60 border-solid border-[#cd950c] border-2 p-2"
          type="text"
          name="lastName"
          placeholder="Add your last name here..."
        ></input>
        <label className="mt-4">Age</label>
        <input
          className="w-60 border-solid border-[#cd950c] border-2 p-2"
          type="number"
          name="age"
          placeholder="18"
        ></input>
        <label className="mt-4">Location</label>
        <input
          className="w-60 border-solid border-[#cd950c] border-2 p-2"
          type="text"
          name="location"
          placeholder="Somewhere..."
        ></input>
        <label className="mt-4">Tell us a little bit about yourself</label>
        <textarea
          className="w-60 border-solid border-[#cd950c] border-2 h-60 p-2"
          name="bio"
          placeholder="write a few words about yourself or your interests here..."
          required
        ></textarea>
        <button className="w-30 border-double border-[#cd950c] border-4 p-2 outline-4 mt-4">
          submit
        </button>
      </form>
    </div>
  );
}
