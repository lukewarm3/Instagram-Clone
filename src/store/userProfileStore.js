import { create } from "zustand";

// this is used to check the information of any user's profile, later we will get the name of that user from the url
const useUserProfileStore = create((set) => ({
  userProfile: null,

  // the functions that manipulate the state
  setUserProfile: (userProfile) => set({ userProfile }),

  // add post
  addPost: (post) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: [post.id, ...state.userProfile.posts],
      },
    })),
  // delete post
  deletePost: (postId) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: state.userProfile.posts.filter((id) => id !== postId),
      },
    })),
}));

export default useUserProfileStore;
