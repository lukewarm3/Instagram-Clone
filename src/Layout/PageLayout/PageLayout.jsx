import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth); // alternatively, we can also use the global state method
  const canRenderSidebar = pathname !== "/auth" && user
  const canRenderNavbar = pathname !== "/auth" && !user && !loading

  return (
    <Flex direction={canRenderNavbar ? "column" : "row"}>
      {/* sidebar */}
      {canRenderSidebar ? (
        <Box w={{base:"70px", md:"240px"}}>
          {/* Left Side */}
          <Sidebar />
        </Box>
      ) : null}

      {/* navbar */}
      {canRenderNavbar ? <Navbar /> : null}

      {/* page content */}
      <Box flex={1} w={{base:"calc(100% - 70px)", md:"calc(100% - 240px)"}} mx="auto">
        {/* Right Side */}
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
