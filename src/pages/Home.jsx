import React from "react";
import { Box, Button, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdPublic } from "react-icons/md";
import { useColorModeValue } from "../components/ui/color-mode";

// Home page component
const Home = () => {
  // Theme-aware colors for text
  const textColor = useColorModeValue("black", "white");
  const iconColor = useColorModeValue("black", "white");
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, teal.400, blue.500)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      px={6}
    >
      <VStack spacing={6} textAlign="center">
        <HStack justify="center" pb={8}>
          <Heading size="5xl" fontWeight="bold" color={textColor}>
            Welcome to The Golden Ball
          </Heading>
          <MdPublic size={48} color={iconColor} />
        </HStack>

        <Text fontSize="lg" maxW="lg" color={textColor} pb={9}>
          Buy and sell items in real-time auctions. Join thousands of users placing bids and winning amazing deals every day!
        </Text>

        <HStack gap={20}>
          <Link to="/login">
            <Button colorScheme="teal" size="lg">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button colorScheme="whiteAlpha" size="lg" variant="outline">
              Register
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Home;
