import React from "react";
import { Flex, Avatar, Box, Button, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = () => {
    handleFollowUser();
    //the value of isFollowing is not updated due to handleFollowUser
    // since I am accessing the value of isFollowing at the time when onFollowUser was defined
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower !== authUser.uid)
        : [...user.followers, authUser.uid],
    });
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w="full">
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${user.username}`}>
          <Avatar src={user.profilePicURL} name={user.username} size={"sm"} />
        </Link>
        <VStack spacing={2}>
          <Link to={`${user.username}`}>
            <Box fontSize={12} fontWeight={"bold"} alignSelf={"start"}>
              {user.fullName}
            </Box>
          </Link>
          <Box
            fontSize={11}
            fontWeight={"bold"}
            color={"gray.500"}
            alignSelf={"start"}
          >
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {authUser.uid !== user.uid && (
        <Button
          fontSize={13}
          bg={"transparent"}
          p={0}
          h="max-content"
          fontWeight={"medium"}
          color={"blue.400"}
          cursor={"pointer"}
          _hover={{ color: "white" }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;
