import React from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={2}>
          <Image
            src={"/logo.png"}
            h={20}
            alt="Instagram Logo"
            cursor={"pointer"}
          />

          {isLogin ? <Login /> : <Signup />}

          {/* ---------------------OR--------------------- */}
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            my={4}
            gap={1}
          >
            <Box h={0.5} bg={"gray.400"} flex={2} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box h={0.5} bg={"gray.400"} flex={2} />
          </Flex>

          <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5} my={2}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box fontSize={12}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            mx={2}
            fontSize={12}
            color={"blue.400"}
            cursor={"pointer"}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default AuthForm;
