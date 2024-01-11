import React from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { doc, arrayUnion } from "firebase/firestore";
import usePostStore from "../store/postStore";

const usePostComments = () => {
  const [isCommenting, setIsCommenting] = React.useState(false);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const addComment = usePostStore((state) => state.addComment);

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser)
      return showToast("Error", "Please login to comment", "error");
    if (comment.trim() === "")
      return showToast("Error", "Comment cannot be empty", "error");
    setIsCommenting(true);

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };

    try {
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion(newComment),
      });

      addComment(postId, newComment);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handlePostComment };
};

export default usePostComments;
