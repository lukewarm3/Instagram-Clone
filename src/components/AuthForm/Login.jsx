import React from "react";
import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { Alert, AlertIcon } from "@chakra-ui/react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error, login } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Input
        name="email"
        placeholder="Email"
        type="email"
        fontSize={12}
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        fontSize={12}
        value={formData.password}
        onChange={handleChange}
      />

      {error && (
        <Alert status="error" fontSize={8} p={1} borderRadius={2}>
          <AlertIcon fontSize={8} />
          {error.message}
        </Alert>
      )}    

      <Button
        colorScheme={"blue"}
        w={"100%"}
        fontSize={12}
        isLoading={loading}
        onClick={() => login(formData)}
      >
        Log in
      </Button>
    </>
  );
};

export default Login;
