import React from "react";
import { useEffect } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const showToast = useShowToast();
  const [userProfile, setUserProfile] = React.useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          return setUserProfile(null);
        }

        setUserProfile(userDoc.data());
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [setUserProfile, userId, showToast]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
