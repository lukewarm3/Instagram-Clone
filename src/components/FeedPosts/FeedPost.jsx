import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { Flex, Image } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <div>
      <PostHeader post={post} creator={userProfile} />
      <Flex
        borderRadius={4}
        overflow={"hidden"}
        minH={{base:"300px", md:"400px"}}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          mx="auto"
          borderRadius={4}
          src={post.imageURL}
          alt="FEED POST IMG"
          maxW="full"
        />
      </Flex>
      <PostFooter post={post} isProfilePage={false} creator={userProfile} />
    </div>
  );
};

export default FeedPost;
