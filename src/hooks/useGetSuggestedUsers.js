import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true);
            try {
                // get all users who are not the current user
                // const q = query(
                //     collection(db, "users"),
                //     where("uid", "not-in", [authUser.uid, ...authUser.following]),
                //     limit(3),
                //     orderBy("uid")
                // );
                // const querySnapshot = await getDocs(q);
                // const users = [];
                // querySnapshot.forEach((doc) => {
                //     users.push({...doc.data(), id: doc.id});
                // });

                // get all users from the database
                const allUsers = [];
                const q = query(collection(db, "users"));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    allUsers.push({...doc.data(), id: doc.id});
                });

                // filter out the current user and the users the current user is following
                const users = allUsers.filter((user) => {
                    return user.uid !== authUser.uid && !authUser.following.includes(user.uid);
                });

                const luke = await getDoc(
                  doc(db, "users", "Xy5dx57dRBfVKhzogUun5AqN4bj2")
                );

                if (authUser.uid === luke.id || authUser.following.includes(luke.id)) {
                    setSuggestedUsers(users.slice(0, 3));
                }
                else {
                    users.unshift({...luke.data(), id: luke.id});
                    setSuggestedUsers(users.slice(0, 3));
                }
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        }
        if (authUser) getSuggestedUsers();
    }, [authUser, showToast])
    return {isLoading, suggestedUsers}
};

export default useGetSuggestedUsers;
