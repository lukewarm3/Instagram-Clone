import React from "react";
import { Container, Flex, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams(); // the username from the url
  // when I am at the page other than profile page, the username is undefined,
  // so userProfile will be set to null due to useGetUserProfileByUsername(username)
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);

  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;

  return (
    <Container maxW="container.lg" py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w="full"
        mx="auto"
        direction={"column"}
      >
        {userProfile && <ProfileHeader />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW="full"
        mx="auto"
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default Profile;

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go home
      </Link>
    </Flex>
  );
};
