import {auth} from '../firebase/firebase';
import { useSignOut } from "react-firebase-hooks/auth";
import useAuthStore from '../store/authStore';

const useLogout = () => {
  const [signOut, isLoggedOut, error] = useSignOut(auth);
  //const showToast = useShowToast();
  const logoutUser = useAuthStore(state => state.logout)

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser(); //when clicking log out, the page will automatically navigate to the auth page since the global state is now null

    } catch (error) {
      console.log(error);
    }
  }

  return { handleLogout, isLoggedOut, error };
}

export default useLogout;
