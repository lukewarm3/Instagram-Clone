import { create } from "zustand";

const useAuthStore = create((set) => ({
  // this is the state : initially the user is not authenticated
  //user:null, this will always be null when you refresh the page.
  // To fix this, use localStorage
  user: JSON.parse(localStorage.getItem("user-info")) || null,

  // the functions that manipulate the state
  login: (user) => set({ user }), //set the user when the user logs in (update the state when sign up)
  logout: () => set({ user: null }), //set the user to null when the user logs out
  setUser: (user) => set({ user }), //more readable than login later
}));

export default useAuthStore;
