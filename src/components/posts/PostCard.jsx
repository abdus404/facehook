import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";

export default function PostCard({ post }) {
  return (
    <article className="card mt-6 lg:mt-8">
      {/* post header */}
      <PostHeader post={post} />
      {/* post body */}
      <PostBody poster={post?.image} content={post?.content} />
      {/* post actions */}
      <PostAction postID={post?.id} commentCount={post?.comments?.length} />
      {/* comment section */}
      <PostComment post={post} />
    </article>
  );
}
