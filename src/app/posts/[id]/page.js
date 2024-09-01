import { db } from "@/lib/db";
import NewComment from "@/app/components/newComment";
import NavBar from "@/app/components/navbar";
import Link from "next/link";
export default async function AddComment({ params }) {
  const post = await fetchPost(params.id);
  const comments = await fetchComments(params.id);

  async function fetchPost(id) {
    const postResult = await db.query(
      `SELECT 
        rcposts.id, 
        rcposts.post, 
        rcposts.timestamp, 
        profiles.username AS username 
      FROM
        rcposts
      RIGHT JOIN
        profiles ON rcposts.clerk_id = profiles.clerk_id WHERE rcposts.id = $1`,
      [id]
    );
    return postResult.rows[0];
  }
  async function fetchComments(postId) {
    const result = await db.query(
      `SELECT 
        rccomments.id,
        rccomments.timestamp,
        rccomments.comment,
        profiles.username AS username
      FROM 
        rccomments
      RIGHT JOIN
        profiles ON rccomments.clerk_id = profiles.clerk_id
      WHERE
        rccomments.rcposts_id = $1
        `,
      [postId]
    );
    return result.rows;
  }
  return (
    <div className=" text-center w-11/12 flex flex-col items-center">
      <NavBar />
      <div
        key={post.id}
        className="border-solid border-[#cd950c] border-2 p-2 flex items-center justify-between bg-[#002349] w-11/12"
      >
        <h2>{post.username}</h2>
        <p>({new Date(post.timestamp).toLocaleString()})</p>
      </div>
      <div className="w-11/12">
        <p className="p-4 w-full">{post.post}</p>
      </div>
      {comments.map((comment) => {
        return (
          <div
            key={comment.id}
            className=" text-center w-full flex flex-col items-center mt-4"
          >
            <div className="border-solid border-[#cd950c] border-2 p-2 flex items-center justify-between bg-[#002349] w-11/12">
              <Link
                href={`/${comment.clerk_id}`}
                className="hover:text-fuchsia-500 hover:cursor:pointer"
              >
                <h2>{comment.username}</h2>
              </Link>
              <p>({new Date(comment.timestamp).toLocaleString()})</p>
            </div>
            <div className="w-11/12">
              <p className="p-4 bg-[#f8f2bf] w-full">{comment.comment}</p>
            </div>
          </div>
        );
      })}
      <NewComment rcposts_id={post.id} />
    </div>
  );
}
