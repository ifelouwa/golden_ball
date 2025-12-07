import { useState } from "react";
import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "../components/ui/color-mode";

// Login page component

function Login() {
  // Theme-aware colors
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const formBgColor = useColorModeValue("white", "gray.700");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // Handle input changes
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      navigate("/products");
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg={bgColor}>
      <VStack as="form" onSubmit={handleSubmit} gap={4} py={20} px={8} bg={formBgColor} shadow="md" rounded="md">
        <Heading size="5xl">Login</Heading>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          w={290}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          w={290}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button colorScheme="teal" width="full" type="submit" isLoading={loading}>
          Login
        </Button>
      </VStack>
    </Box>
  );
}

export default Login;
