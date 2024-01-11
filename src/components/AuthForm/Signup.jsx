import React from "react";
import {
  Box,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Input
        name="email"
        placeholder="Email"
        fontSize={12}
        type="email"
        size={"sm"}
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="username"
        placeholder="Username"
        fontSize={12}
        type="text"
        size={"sm"}
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        name="fullName"
        placeholder="Full Name"
        fontSize={12}
        type="text"
        size={"sm"}
        value={formData.fullName}
        onChange={handleChange}
      />
      <InputGroup>
        <Input
          name="password"
          placeholder="Password"
          fontSize={12}
          type={showPassword ? "text" : "password"}
          value={formData.password}
          size={"sm"}
          onChange={handleChange}
        />
        <InputRightElement h="full">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status="error" fontSize={8} p={1} borderRadius={2}>
          <AlertIcon fontSize={8} />
          {error.message}
        </Alert>
      )}

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={12}
        isLoading={loading}
        onClick={() => signup(formData)}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
