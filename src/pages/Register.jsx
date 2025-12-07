import { useState } from "react";
import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "../components/ui/color-mode";

  // Registration Form Component
function Register() {
  // Theme-aware colors
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const formBgColor = useColorModeValue("white", "gray.700");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await register(formData.name, formData.username, formData.email, formData.password, formData.phone);
    setLoading(false);
    if (result.success) {
      navigate("/products");
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg={bgColor}>
      <VStack as="form" onSubmit={handleSubmit} gap={4} py={20} px={18} bg={formBgColor} shadow="md" rounded="md">
        <Heading size="5xl">Register</Heading>
        <Input
          name="name"
          placeholder="Full Name"
          w={290}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="username"
          placeholder="Username"
          w={290}
          value={formData.username}
          onChange={handleChange}
          required
        />
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
          name="phone"
          placeholder="Phone Number"
          w={290}
          value={formData.phone}
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
        <Button colorScheme="blue" width="full" type="submit" isLoading={loading}>
          Create Account
        </Button>
      </VStack>
    </Box>
  );
}

export default Register;
