import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],

  // the functions that manipulate the state
  createPost: (post) => set((state) => ({ post: [post, ...state.posts] })),

  //deletePost
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),

  //setPost
  setPosts: (posts) => set({ posts }),

  //addComment
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ),
    })),

  //addLike
  addLike: (postId, uid) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, likes: [...post.likes, uid] } : post
      ),
    })),
}));

export default usePostStore;
