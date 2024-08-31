import PostCard from "./PostCard";

export default function PostList({ posts }) {
  // Ensure posts are sorted with newest first
  const sortedPosts = posts
    ? [...posts].sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
    : [];

  return (
    <>
      {sortedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
