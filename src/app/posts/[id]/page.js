import { db } from "@/lib/db";
import NewComment from "@/app/components/newComment";
import NavBar from "@/app/components/navbar";
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
    <div className="mt-20">
      <NavBar />
      <div key={post.id}>
        <h2>{post.username}</h2>
        <p>({new Date(post.timestamp).toLocaleString()})</p>
      </div>
      <div>
        <p>{post.post}</p>
      </div>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <div>
              <h2>{comment.username}</h2>
              <p>({new Date(comment.timestamp).toLocaleString()})</p>
            </div>
            <div>
              <p>{comment.comment}</p>
            </div>
          </div>
        );
      })}
      <NewComment rcposts_id={post.id} />
    </div>
  );
}
