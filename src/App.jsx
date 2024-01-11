import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Auth from "./pages/AuthPage/Auth";
import PageLayout from "./Layout/PageLayout/PageLayout";
import Profile from "./pages/ProfilePage/Profile";
import useAuthStore from "./store/authStore";
import { Navigate } from "react-router-dom";

function App() {
  const authUser = useAuthStore((state) => state.user); //the global state
  // const [authUser] = useAuthState(auth); //maybe this is better since it uses firebase's auth state, which can be safer

  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authUser ? <Auth /> : <Navigate to="/" />}
        />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
