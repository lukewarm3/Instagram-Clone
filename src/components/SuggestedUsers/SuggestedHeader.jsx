import React from "react";
import { Flex } from "@chakra-ui/react";
import { Avatar, Text, Button} from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import {Link} from "react-router-dom";

const SuggestedHeader = () => {
  const {handleLogout, isLoggingOut} = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if(!authUser) return null;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w="full">
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.username}`}>
          <Avatar
            src={authUser.profilePicURL}
            size={"sm"}
            alt={authUser.profilePicURL}
            name={authUser.username}
          />
        </Link>
        <Link to={`${authUser.username}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser.username}
          </Text>
        </Link>
      </Flex>
      <Button
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        style={{ textDecoration: "none" }}
        cursor={"pointer"}
        onClick={handleLogout}
        isLoading={isLoggingOut}
        variant={"ghost"}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
