import React, { useEffect } from "react";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        // get user profile by username
        const q = query(
          collection(db, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);
        // if user profile doesn't exist, set user profile to null
        if (querySnapshot.empty) {
          return setUserProfile(null);

        }

        // if user profile exists, set it to the user profile
        querySnapshot.forEach((doc) => {
          setUserProfile(doc.data());
        });
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
