import { useState } from "react";
import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";

export default function PostCard({ post }) {
  const [commentCount, setCommentCount] = useState(post?.comments?.length);

  const commentAdd = () => {
    setCommentCount(commentCount + 1);
  };

  return (
    <article className="card mt-6 lg:mt-8">
      {/* post header */}
      <PostHeader post={post} />
      {/* post body */}
      <PostBody poster={post?.image} content={post?.content} />
      {/* post actions */}
      <PostAction post={post} commentCount={commentCount} />
      {/* comment section */}
      <PostComment post={post} commentAdd={commentAdd} />
    </article>
  );
}
