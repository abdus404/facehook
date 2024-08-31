import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import PostList from "../posts/PostList";

export default function MyPost() {
  const { state } = usePost(); // Assuming posts are fetched here
  const { state: profile } = useProfile();

  // Get the logged-in user's ID
  const userId = profile?.user?.id;

  // Filter posts to include only those by the logged-in user
  const userPosts =
    state?.posts?.filter((post) => post.author.id === userId) || [];

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <PostList posts={userPosts} />
    </>
  );
}
