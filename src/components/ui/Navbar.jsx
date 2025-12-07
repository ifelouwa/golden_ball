import { Container, Flex, HStack, Button, Heading, Text, IconButton } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth.Context'
import { MdPublic } from 'react-icons/md'
import { MdLogout } from "react-icons/md";
import { ColorModeButton, useColorModeValue } from './color-mode'

// Main navigation component
function Navbar() {
    // Get user and logout from auth context
    const { user, logout } = useContext(AuthContext);

    // Theme-aware colors
    const iconColor = useColorModeValue("black", "white");
    const profileButtonColor = useColorModeValue("black", "white");

    return (
        <Container maxW="container.xl" px={4} py={4}>
            <Flex justify="space-between" align="center" wrap="wrap">
                {/* Logo and title */}
                <HStack>
                    <Heading as="h1" size="lg">
                        <Link to="/">The Golden Ball</Link>
                    </Heading>
                    <MdPublic size={24} color={iconColor} />
                </HStack>

                {/* Navigation links */}
                <HStack spacing={4} alignItems="center">
                    <Link to="/">
                        <Button variant="ghost">Home</Button>
                    </Link>
                    <Link to="/products">
                        <Button variant="ghost">Products</Button>
                    </Link>
                    {/* Show profile button if logged in, else login/register */}
                    {user ? (
                        <IconButton
                            icon={<MdLogout />}
                            variant="outline"
                            onClick={logout}
                            aria-label="Profile"
                            borderColor={profileButtonColor}
                            color={profileButtonColor}
                            _icon={{ color: profileButtonColor }}
                        />
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="ghost">Register</Button>
                            </Link>
                        </>
                    )}
                    {/* Color mode toggle button */}
                    <ColorModeButton />
                </HStack>
            </Flex>
        </Container>
    );
}

export default Navbar