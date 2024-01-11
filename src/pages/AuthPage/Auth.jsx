import React from "react";
import { Flex, Container, Box, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const Auth = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={5}>
          {/* Left Side */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src={"/auth.png"} h={600} alt="Auth Photo" />
          </Box>
          {/* // Right Side */}
          {/* fill the horizontal space of Container's max width */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"} fontSize={12}>Get the app.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src={"/google-play.png"} h={8} alt="Google Play Logo" />
              <Image src={"/microsoft.png"} h={8} alt="Microsoft Logo" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Auth;
