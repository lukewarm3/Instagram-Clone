import React from "react";
import { Flex, Box, Button, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFolloweUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../util/timeAgo";

const PostHeader = ({ post, creator }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFolloweUser(
    post.createdBy
  );
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      my={2}
    >
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${creator?.username}`}>
          <Avatar
            src={creator?.profilePicURL}
            size={"sm"}
            alt="user profile pic"
          />
        </Link>
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          <Link to={`/${creator?.username}`}>{creator?.username}</Link>
          <Box color="gray.500">• {timeAgo(post.createdAt)}</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          size="xs"
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          bg="transparent"
          isLoading={isUpdating}
          onClick={handleFollowUser}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
